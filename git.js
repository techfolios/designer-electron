const SimpleGit = require("simple-git");

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
  }

  hasGithubPage(callback) {
    return SimpleGit()
      .listRemote([this.user.url.githubPage], function (err, data) {
        if (!err) {
          console.log('Remote url for repository at ' + __dirname + ':');
          console.log(data);
          callback(data);
        } 
      });
  }

  cloneGithubPage() {
    let options = [];
    let remote = this.user.url.githubPage;

    return SimpleGit(Git.local)
      .exec(() => {
        console.log(`Cloning ${remote}...`);
      }).clone(remote, Git.local, options, (err) => {
        if (err) {
          console.log(err);
          console.log(`Could not clone ${remote}`);
        } else {
          console.log(`Cloned ${remote} to ${Git.local}`);          
        }
      });
  }

  cloneTechfoliosTemplate() {
    let options = [];
    let remote = this.techfolios.url;
    let userRemote = this.user.url.githubPage;
    let userAlias = this.user.name;

    return SimpleGit(Git.local)
      .exec(() => {
        console.log(`Cloning ${remote}...`);
      }).clone(remote, Git.local, options, (err) => {
        if (err) {
          console.log(err);
          console.log(`Could not clone ${remote}`);
        }
      }).exec(() => {
        console.log(`Adding remote ${userAlias} ${userRemote}`);
      }).addRemote(`${userAlias}`, userRemote, (err) => {
        if (err) {
          console.log(err);
          console.log(`Could not add remote ${userAlias} ${userRemote}`);
        } else {
          console.log(`Cloned ${remote} to ${Git.local}`);
        }
      });
  }
}

Git.local = `${__dirname}/.techfolios`; //OS.homedir() + "/.techfolios"

module.exports = Git;
