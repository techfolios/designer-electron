import FS from 'fs';
import OS from 'os';
import Path from 'path';
import Git from 'nodegit';
import fse from 'fs-extra';
import path from 'path';

class IO {
  constructor(username) {
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(__dirname, '../.techfolios'); //OS.homedir() + "/.techfolios,
    this.remoteURL = `https://github.com/${username}/${username}.github.io`;
  }

  init() {
    return new Promise((res, rej) => {
      this.hasLocal()
        .then(hasLocal => {
          if (hasLocal) {
            //has local, good to go.
            res('Local techfolio found.');
          } else {
            //no local files, clone user remote or template.
            this.hasRemote()
              .then(hasRemote => {
                if (hasRemote) {
                  //has remote, clone remote
                  this.cloneUserRemote()
                    .then(clone => res('Cloned user remote techfolio.'),
                    err => rej(err));
                } else {
                  // no remote, clone template
                  this.cloneTechfoliosTemplate()
                    .then(clone => res('Cloned remote techfolio template.'),
                    err => rej(err));
                }
              }, err => {
                //error checking for user remote
                rej(err);
              })
          }
        }, err => {
          //error checking for local repo.
          rej(err);
        })
    });
  }

  hasLocal() {
    return new Promise((res, rej) => {
      FS.mkdir(this.localURL, (err) => {
        if (!err) {
          res(false);
        } else if (err.code == 'EEXIST') {
          res(true);
        } else {
          rej(err);
        }
      });
    });
  }

  hasRemote() {
    return new Promise((res, rej) => {
      res(false);
    });
    // return new Promise((res, rej) => {
    //   SimpleGit()
    //     .listRemote([this.remoteURL], function (err, data) {
    //       if (!err) {
    //         res(data);
    //       } else {
    //         rej(err);
    //       }
    //     });
    // });
  }

  cloneUserRemote() {
    let options = [];

    return new Promise((res, rej) => {
      Git.Clone(this.remoteURL, this.localURL)
          .then(function (repo) {
            res(repo.mergeBranches("master", "origin/master"));
          })
          .catch(function(err) { rej(err); });
    });
  }

  cloneTechfoliosTemplate() {
    let options = [];

    return new Promise((res, rej) => {
      Git.Clone(this.templateURL, this.localURL)
          .then(function (repo) {
            res(repo.mergeBranches("master", "origin/master"));
          })
          .catch(function(err) { rej(err); });
          //reset remote url and add

      // SimpleGit(this.localURL)
      //   .exec(() => {
      //     console.log(`Cloning ${this.templateURL}...`);
      //   }).clone(this.templateURL, this.localURL, options, (err) => {
      //     if (err) {
      //       console.log(`Could not clone ${this.templateURL}`);
      //       rej(err);
      //     }
      //   }).exec(() => {
      //     console.log(`Removing remote origin => ${this.templateURL} to replace with origin => ${this.remoteURL}`);
      //   })
      //   .removeRemote('origin', (err) => {
      //     if (err) {
      //       console.log('Could not remove remote origin.');
      //       rej(err);
      //     }
      //   })
      //   .exec(() => {
      //     console.log(`Adding remote origin ${this.remoteURL}`);
      //   }).addRemote('origin', this.remoteURL, (err) => {
      //     if (err) {
      //       console.log(`Could not add remote origin ${this.remoteURL}`);
      //       rej(err);
      //     } else {
      //       console.log(`Cloned ${this.remoteURL} to ${this.localURL}`);
      //       res(true);
      //     }
      //   });
    });
  }

  loadBio() {
    return new Promise((res, rej) => {
      let path = Path.resolve(this.localURL, '_data/bio.json');
      FS.readFile(path, (err, data) => {
        if (err) {
          rej(err);
        }
        res(JSON.parse(data));
      })
    });
  }

  writeBio(data) {
    return new Promise((res, rej) => {
      FS.writeFile(Path.resolve(this.localURL, '_data/bio.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
          rej(err);
        }
        // SimpleGit(this.localURL)
        //   .exec(() => {
        //     console.log(`Commiting changes in ${this.localURL}`);
        //   })
        //   .add('.')
        //   .commit(`Saved from machine: ${OS.hostname()}`, (err) => {
        //     if (err) {
        //       rej(err);
        //       // prompt an error to the user that the state could not be saved.
        //     }
        //     res(true);
        //   });
        var repo, index, oid;
        Git.Repository.open(this.localURL)
        .then((repoResult) => {
          repo = repoResult;
          return fse.ensureDir(path.join(repo.workdir(), this.localURL));
        })
        .then(function() {
          return repo.refreshIndex();
        })
        .then(function(indexResult) {
          index = indexResult;
        })
        .then(function() {
          return index.addAll();
        })
        .then(function() {
          return index.write();
        })
        .then(function() {
          return index.writeTree();
        })
        .then(function(oidResult) {
          oid = oidResult;
          return Git.Reference.nameToId(repo, "HEAD");
        })
        .then(function(head) {
          return repo.getCommit(head);
        })
        .then((parent) => {
          var author = Git.Signature.now("Techfolios", "me@techfolios.com");
          var committer = Git.Signature.now("Techfolios", "me@techfolios.com");
          return repo.createCommit("HEAD", author, committer, "Update Techfolio", oid, [parent]);
        })
        .catch(function (error) {
          console.error(`commitBio: ${error}`);
        });
      })
    })
  }

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
}

module.exports = IO;
