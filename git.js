const SimpleGit = require("simple-git");
const FS = require('fs');

class Git {
  constructor(gitUserName) {
    this.techfolios = {
      url: "https://github.com/techfolios/techfolios.github.io"
    };

    this.user = {
      name: gitUserName,
      url: {
        github: `https://github.com/${gitUserName}/`,
        githubPage: `https://github.com/${gitUserName}/${gitUserName}.github.io`,
      }
    };

    this.localExists = false;

    FS.mkdir(Git.local, (err) => {
      if(!err) {
        console.log(`Added local directory ${Git.local}`);
      } else if(err.code == 'EEXIST') {
        console.log("Directory exists.");
        this.localExists = true;
      } else {
        console.log(err);
      }
    });
  }

  hasGithubPage() {
    return new Promise((res, rej) => {
      SimpleGit()
        .listRemote([this.user.url.githubPage], function (err, data) {
          if (!err) {
            console.log('Remote url for repository at ' + __dirname + ':');
            res(data);
          } else {
            rej(err);
          }
        });
    });
  }

  cloneGithubPage() {
    let options = [];
    let remote = this.user.url.githubPage;

    return new Promise((res, rej) => {
      SimpleGit(Git.local)
      .exec(() => {
        console.log(`Cloning ${remote}...`);
      }).clone(remote, Git.local, options, (err) => {
        if (err) {
          console.log(`Could not clone ${remote}`);
          rej(err);
        } else {
          console.log(`Cloned ${remote} to ${Git.local}`); 
          res(true);
        }
      });
    });
  }

  cloneTechfoliosTemplate() {
    let options = [];
    let remote = this.techfolios.url;
    let userRemote = this.user.url.githubPage;
    let userAlias = this.user.name;

    return new Promise((res, rej) => {
      SimpleGit(Git.local)
        .exec(() => {
          console.log(`Cloning ${remote}...`);
        }).clone(remote, Git.local, options, (err) => {
          if (err) {
            console.log(`Could not clone ${remote}`);
            rej(err);
          }
        }).exec(() => {
          console.log(`Adding remote ${userAlias} ${userRemote}`);
        }).addRemote(`${userAlias}`, userRemote, (err) => {
          if (err) {
            console.log(`Could not add remote ${userAlias} ${userRemote}`);
            rej(err);
          } else {
            console.log(`Cloned ${remote} to ${Git.local}`);
            res(true);
          }
        });
    });
  }
}

Git.local = `${__dirname}/.techfolios`; //OS.homedir() + "/.techfolios"

module.exports = Git;
