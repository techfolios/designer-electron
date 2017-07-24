import FS from 'fs';
import Path from 'path';
import Git from 'nodegit';
import fse from 'fs-extra';

class IO {
  constructor(username) {
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(__dirname, '../.techfolios'); // OS.homedir() + "/.techfolios,
    this.remoteURL = `https://github.com/${username}/${username}.github.io`;
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
      const path = Path.resolve(this.localURL, '_data/bio.json');
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
      FS.writeFile(Path.resolve(this.localURL, '_data/bio.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
          rej(err);
        }
        let repo;
        let index;
        let oid;
        Git.Repository.open(this.localURL)
          .then((repoResult) => {
            repo = repoResult;
            return fse.ensureDir(Path.join(repo.workdir(), this.localURL));
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
