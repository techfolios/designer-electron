import FS from 'fs';
import OS from 'os';
import Path from 'path';
import Git from 'nodegit';
import fse from 'fs-extra';
import request from 'superagent';

import FileCrawler from './utilities/file-crawler';
import values from './containers/values';

class IO {
  constructor() {
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(OS.homedir(), '.techfolios');
    values.dir = this.localURL;

    this.bioURL = Path.resolve(this.localURL, '_data/bio.json');
    this.projectsURL = Path.resolve(this.localURL, 'projects');
    this.essaysURL = Path.resolve(this.localURL, 'essays');
    this.imagesURL = Path.resolve(this.localURL, 'images');
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
    return new Promise((res) => {
      this.getUsername().then(() => {
        this.remoteURL = `https://github.com/${this.username}/${this.username}.github.io`;
        this.hasLocal()
          .then((hasLocal) => {
            if (hasLocal) {
              res('Local techfolio found');
            } else {
              this.hasRemote()
                .then((hasRemote) => {
                  if (hasRemote) {
                    this.cloneUserRemote().then(() => {
                      res('Cloned remote techfolio');
                    });
                  } else {
                    this.cloneTechfoliosTemplate().then(() => {
                      res('Cloned techfolios template');
                    });
                  }
                });
            }
          });
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

  // Helper function used to get the string of the user's techfolio remote repo name
  getRemoteRepoString() {
    let remoteRepoString;
    return new Promise((res) => {
      this.getUsername()
        .then((username) => {
          remoteRepoString = `${username}.github.io`;
          res(remoteRepoString);
        });
    });
  }

  /*
  added "this." in front of res to placate ESLint - is this a correct fix?
   */
  hasRemote() {
    // return request('GET', `https://api.github.com/user/repos?sort=updated&access_token=${this.accessToken}`)
    return request('GET', `https://api.github.com/users/${this.username}/repos?access_token=${this.accessToken}`)
      .then((res) => {
        let result = false;
        const repos = res.body;

        for (let i = 0; i < res.body.length; i += 1) {
          if (repos[i].name === `${this.username}.github.io`) {
            result = true;
          }
        }
        return result;
      }, (err) => {
        console.err(err);
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

  push() {
    let repo;
    let index;
    let oid;
    let remote;

    return new Promise((res, rej) => {
      // Open the repository.
      Git.Repository.open(this.localURL)
        // Get the index.
        .then((repoResult) => {
          repo = repoResult;
          return repoResult.refreshIndex();
        })
        // Assign the index to indexResult.
        .then((indexResult) => {
          index = indexResult;
        })
        // Add all files to the index.
        .then(() => index.addAll())
        // Write all files to index.
        .then(() => index.write())
        .then(() => index.writeTree())
        .then((oidResult) => {
          oid = oidResult;
          return Git.Reference.nameToId(repo, 'HEAD');
        })
        .then((head) => {
          console.log();
          return repo.getCommit(head);
        })
        // Create a signature and commit
        .then((parent) => {
          const author = Git.Signature.default(repo);
          return repo.createCommit('HEAD', author, author, 'Update from Techfolio Designer', oid, [parent]);
        })
        .then(() => repo.getRemote('origin'))
        .then((remoteResult) => {
          remote = remoteResult;
          console.log('pushing to remote URL');
          console.log(this.remoteURL);
          return remote.push(
            ['refs/heads/master:refs/heads/master'],
            {
              callbacks: {
                certificateCheck: () => 1,
                credentials: () => Git.Cred.userpassPlaintextNew(this.accessToken, 'x-oauth-basic'),
              },
            });
        })
        // Catch any errors.
        .catch((err) => { rej(err); })
        .done(() => {
          res('successfully pushed');
        });
    });
  }

  pull() {
    let repo;

    return new Promise((res, rej) => {
      Git.Repository.open(this.localURL)
        .then((repoResult) => {
          repo = repoResult;

          return repo.fetchAll({
            callbacks: {
              certificateCheck: () => 1,
              credentials: () => Git.Cred.userpassPlaintextNew(this.accessToken, 'x-oauth-basic'),
            },
          });
        })
        .then(() => repo.mergeBranches('master', 'origin/master'))
        .catch((err) => { rej(err); })
        .done(() => {
          res('successfully merged');
        });
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
    return new Promise((res) => {
      const list = {};
      const crawler = new FileCrawler(this.projectsURL);
      list.projects = crawler.getYAML();
      list.crawler = crawler;
      res(list);
    });
  }

  loadEssays() {
    return new Promise((res) => {
      const list = {};
      const crawler = new FileCrawler(this.essaysURL);
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

  importImage(url) {
    return new Promise((res) => {
      const imageName = Path.basename(url);
      console.log(this.imagesURL);
      const newImagePath = Path.resolve(this.imagesURL, imageName);
      const image = FS.readFileSync(url);
      FS.writeFileSync(newImagePath, image);
      res(newImagePath);
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

export default IO;
