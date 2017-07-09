import FS from 'fs';
import OS from 'os';
import Path from 'path';
import SimpleGit from 'simple-git';

class IO {
  constructor(username) {
    this.templateURL = 'https://github.com/techfolios/template';
    this.localURL = Path.resolve(__dirname, '../.techfolios'); //OS.homedir() + "/.techfolios,
    this.remoteURL = `https://github.com/${username}/${username}.github.io`;
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

  hasGithubPage() {
    return new Promise((res, rej) => {
      SimpleGit()
        .listRemote([this.remoteURL], function (err, data) {
          if (!err) {
            res(data);
          } else {
            rej(err);
          }
        });
    });
  }

  cloneUserRemote() {
    let options = [];

    return new Promise((res, rej) => {
      SimpleGit(this.localURL)
        .exec(() => {
          console.log(`Cloning ${this.remoteURL}...`);
        }).clone(this.remoteURL, this.localURL, options, (err) => {
          if (err) {
            rej(err);
          } else {
            console.log(`Cloned ${this.remoteURL} to ${this.localURL}`);
            res(true);
          }
        });
    });
  }

  cloneTechfoliosTemplate() {
    let options = [];

    return new Promise((res, rej) => {
      SimpleGit(this.localURL)
        .exec(() => {
          console.log(`Cloning ${this.remoteURL}...`);
        }).clone(this.remoteURL, this.localURL, options, (err) => {
          if (err) {
            console.log(`Could not clone ${this.remoteURL}`);
            rej(err);
          }
        }).exec(() => {
          console.log(`Adding remote ${this.username} ${this.remoteURL}`);
        }).addRemote(`${this.username}`, this.remoteURL, (err) => {
          if (err) {
            console.log(`Could not add remote ${this.username} ${this.remoteURL}`);
            rej(err);
          } else {
            console.log(`Cloned ${this.remoteURL} to ${this.localURL}`);
            res(true);
          }
        });
    });
  }

  loadBio() {
    return new Promise((res, rej) => {
      let path = Path.resolve(this.localURL, '_data/bio.json');
      FS.readFile(path, (err, data) => {
        if(err) {
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
        SimpleGit(this.localURL).commit(`Saved on machine: ${OS.hostname}`, (err) => {
          if (err) {
            rej(err);
            // prompt an error to the user that the state could not be saved.
          }
          res(true);
        });
      })
    })
  }
}

module.exports = IO;