const NodeGit = require("nodegit");
const OS = require("os");

export class Git {
  constructor() {
    this.techfolios = {
      url: "https://github.com/techfolios/techfolios.github.io"
    };

    this.user = {
      name: "adambutac",
      url: {
        git: "https://github.com/${this.name}/",
        techfolio: "https://github.com/${this.name}/${this.name}.github.io",
        local: OS.homedir() + "/.techfolios"
      }
    };
  }

  clone() {
    return NodeGit.Clone(techfolios.url, user.url.local).catch(function(err) {
      return err;
    });
  }
}

module.exports = Git;
