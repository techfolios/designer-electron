import FS from 'fs';
import OS from 'os';
import Path from 'path';
import Git from 'nodegit';
import fse from 'fs-extra';
import FrontMatter from 'front-matter';

import FileCrawler from './utilities/file-crawler';
import YamlParser from './utilities/yaml-parser';

class IO {
  constructor(username) {
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(OS.homedir(), '.techfolios');
    this.remoteURL = `https://github.com/${username}/${username}.github.io`;
    this.bioURL = Path.resolve(this.localURL, '_data/bio.json');
    this.projectsURL = Path.resolve(this.localURL, 'projects');
    this.essaysURL = Path.resolve(this.localURL, 'essays');
    this.imagesURL = Path.resolve(this.localURL, 'images');
  }

  init() {
    return new Promise((res, rej) => {
      this.hasLocal()
        .then((hasLocal) => {
          if (hasLocal) {
            // has local, good to go.
            res('Local techfolio found.');
          } else {
            // clone template
            this.cloneTechfoliosTemplate()
              .then(() => res('Cloned remote techfolio template.'),
              err => rej(err));
          }
        }, (err) => {
          // error checking for local repo.
          rej(err);
        });
    });
  }

  hasLocal() {
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
    return new Promise((res) => {
      res(false);
      console.log(this.res);
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
    return new Promise((res, rej) => {
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

  loadImages() {
    return new Promise((res, rej) => {
      FS.readdir(this.imagesURL, (err, data) => {
        if (err) {
          rej(err);
        } else {
          const result = data.map(image => Path.resolve(this.imagesURL, image));
          res(result);
        }
      });
    });
  }

  saveImage(name, data) {
    return new Promise((res) => {
      console.log(this);
      console.log([name, data]);
      res(true);
    });
  }

  removeImage(name) {
    return new Promise((res, rej) => {
      const imagePath = Path.resolve(this.imagesURL, name);
      FS.unlink(imagePath, (err) => {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      });
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
