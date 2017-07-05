const SimpleGit = require("simple-git");
const OS = require("os");

class Git {
  constructor(gitUserName) {
    this.techfolios = {
      url: "https://github.com/techfolios/techfolios.github.io"
    };

    this.user = {
      name: gitUserName,
      url: {
        github: `https://github.com/${this.name}/`,
        techfolio: `https://github.com/${this.name}/${this.name}.github.io`,
        local: `${__dirname}/.techfolios` //OS.homedir() + "/.techfolios"
      }
    };
  }

  hasGithubIO() {
    SimpleGit(this.user.url.local)
      .listRemote(['--get-url'], function (err, data) {
        if (!err) {
          console.log('Remote url for repository at ' + __dirname + ':');
          console.log(data);
          return false;
        }
      });
  }

  cloneTechfoliosTemplate() {
    let options = {};
    return SimpleGit(this.user.url.local)
      .exec(() => {
        console.log(`Cloning ${this.techfolios.url}...`);
      }).clone(this.techfolios.url, this.user.url.local, options, (err) => {
        if (err) {
          console.log(err);
          console.log(`Could not clone ${this.techfolios.url}`);
        }
      }).exec(() => {
        console.log(`Adding remote ${this.user.name} ${this.user.url.techfolio}`);
      }).addRemote(`${this.user.name}`, this.user.url.techfolio, (err) => {
        if (err) {
          console.log(err);
          console.log(`Could not add remote ${this.user.name} ${this.user.url.techfolio}`);
        } else {
          console.log(`Cloned ${this.techfolios.url} to ${this.user.url.local}`);
        }
      });
  }
}

module.exports = Git;
