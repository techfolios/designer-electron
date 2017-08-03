import FS from 'fs';
import OS from 'os';
import Path from 'path';
import Git from 'nodegit';
import fse from 'fs-extra';
import FrontMatter from 'front-matter';
import request from 'superagent';

import FileCrawler from './utilities/file-crawler';
import YamlParser from './utilities/yaml-parser';

import Oauth from './utilities/Oauth';

class IO {
  constructor(username) {
    console.log('start');
    // this.accessToken = window.localStorage.getItem('githubtoken');
    this.getUsername();
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(OS.homedir(), '.techfolios');
    this.remoteURL = `https://github.com/${username}/${username}.github.io`;
    this.bioURL = Path.resolve(this.localURL, '_data/bio.json');
    this.projectsURL = Path.resolve(this.localURL, 'projects');
    this.essaysURL = Path.resolve(this.localURL, 'essays');
  }

  getUsername() {
    return request('GET', `https://api.github.com/user?access_token=${this.accessToken}`)
      .then((res) => {
        this.username = JSON.parse(res.text).login;
        return this.username;
      });
  }

  init() {
    this.accessToken = window.localStorage.getItem('githubtoken');
    return new Promise((res, rej) => {
      this.hasLocal()
        .then((hasLocal) => {
          if (hasLocal) {
            console.log('Local techfolio found');
            res('Local techfolio found');
          } else {
            this.hasRemote()
              .then((hasRemote) => {
                if (hasRemote) {
                  console.log('Remote techfolio found');
                } else {
                  console.log('Cloned Default techfolio template');
                }
              });
          }
        });
    });
  }

  hasLocal() {
    console.log('hasLocal called');
    return new Promise((res, rej) => {
      FS.mkdir(this.localURL, (err) => {
        if (!err) {
          res(false);
        } else if (err.code === 'EEXIST') {
          res(true);
        } else {
          rej(err);
        }
      });
    });
  }


  /*
  added "this." in front of res to placate ESLint - is this a correct fix?
   */
  hasRemote() {
    console.log('hasRemote called');
    console.log(`accessToken : ${this.accessToken}`);
    return request('GET', `https://api.github.com/user/repos?sort=updated&access_token=${this.accessToken}`)
       .then((res) => {
         console.log('inside');
         let result = false;
         const repos = JSON.parse(res.text);

         for (let i = 0; i < Object.keys(repos).length; i += 1) {
           if (repos[i].name === `${this.username}.github.io`) {
             result = true;
           }
         }
         console.log(`hasRemote: ${result}`);
         return result;
       }, (err) => {
         console.log(err);
       });
  }

  cloneUserRemote() {
    return new Promise((res, rej) => {
      Git.Clone(this.remoteURL, this.localURL)
        .then((repo) => {
          res(repo.mergeBranches('master', 'origin/master'));
        })
        .catch((err) => { rej(err); });
    });
  }

  cloneTechfoliosTemplate() {
    return new Promise((res, rej) => {
      Git.Clone(this.templateURL, this.localURL)
        .then((repo) => {
          res(repo.mergeBranches('master', 'origin/master'));
        })
        .catch((err) => { rej(err); });
    });
  }

  loadBio() {
    return new Promise((res, rej) => {
      const path = this.bioURL;
      FS.readFile(path, (err, data) => {
        if (err) {
          rej(err);
        }
        res(JSON.parse(data));
      });
    });
  }

  writeBio(data) {
    return new Promise((res, rej) => {
      FS.writeFile(this.bioURL, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          rej(err);
        }
        let repo;
        let index;
        let oid;
        Git.Repository.open(this.localURL)
          .then((repoResult) => {
            repo = repoResult;
            return fse.ensureDir(this.localURL);
          })
          .then(() => repo.refreshIndex())
          .then((indexResult) => {
            index = indexResult;
          })
          .then(() => index.addAll())
          .then(() => index.write())
          .then(() => index.writeTree())
          .then((oidResult) => {
            oid = oidResult;
            return Git.Reference.nameToId(repo, 'HEAD');
          })
          .then(head => repo.getCommit(head))
          .then((parent) => {
            const author = Git.Signature.now('Techfolios', 'me@techfolios.com');
            const committer = Git.Signature.now('Techfolios', 'me@techfolios.com');
            res(true);
            return repo.createCommit('HEAD', author, committer, 'Update Techfolio', oid, [parent]);
          })
          .catch((error) => {
            console.error(`commitBio: ${error}`);
            rej(error);
          });
      });
    });
  }

  loadProjects() {
    return new Promise((res) => { // removed 'rej' as unused parameter
      const list = [];
      const projFiles = FS.readdirSync(this.projectsURL);
      projFiles.forEach((file) => {
        if (file !== 'index.html') {
          const filePath = Path.resolve(this.projectsURL, file);
          const projData = FS.readFileSync(filePath);
          list.push(FrontMatter(projData.toString()));
        }
      });
      res(list);
    });
  }

  writeProject(index, data) {
    return new Promise((res, rej) => {
      const path = Path.resolve(this.projectsURL, `project-${index}.md`);
      const yamlString = YamlParser.write(data);
      FS.writeFile(path, yamlString, (err) => {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      });
    });
  }

  removeProject(index) {
    return new Promise((res) => {
      const path = Path.resolve(this.projectsURL, `project-${index}.md`);
      const projFiles = FS.readdirSync(this.projectsURL).splice(1 + index);
      FS.unlinkSync(path);
      projFiles.splice(index + 1).forEach((file, fIndex) => {
        const newURL = Path.resolve(this.projectsURL, `project-${index + fIndex}.md`);
        const oldURL = Path.resolve(this.projectsURL, file);
        FS.renameSync(oldURL, newURL);
      });
      res(true);
    });
  }

  loadEssays() {
    return new Promise((res) => {
      const list = {};
      const crawler = new FileCrawler(this.essaysURL);
      console.log(list);
      list.essays = crawler.getYAML();
      list.crawler = crawler;
      res(list);
    });
  }

  /* ESLint fix needed
  push() {
    return new Promise((res, rej) => {
      SimpleGit(this.localURL)
        .push('origin', 'master', (err) => {
          if (err) {
            rej(err);
          }
          res(true);
        });
    });
  }
  */


  getLocalFolder() {
    return this.localURL;
  }
}

module.exports = IO;
