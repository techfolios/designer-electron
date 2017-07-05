const FS = require('fs');
const Git = require('./git.js');

class Cli {
  constructor() {
    this.git = null;
  }

  start() {
    this.askUsername()
      .then((res) => {
        this.git = new Git(res);
        return this.git.hasGithubPage();
      })
      .then((res) => {
        console.log(res);
        return this.askGithubPage();
      }, (rej) => {
        console.log(rej);
        return this.git.cloneTechfoliosTemplate();
      })
      .then((res) => {
        console.log(res);
        console.log('Ok, getting your exsiting techfolio page.');
        return this.git.cloneGithubPage();
      }, (rej) => {
        console.log(rej);
        return this.git.cloneTechfoliosTemplate();
      })
      .then((res) => {
        console.log(res);
      }, (rej) => {
        console.log(rej);
      });
  }

  askUsername() {
    return new Promise((res) => {
      Cli.ask('What is your github username?', /[a-z,A-Z,0-9]/, res);
    });
  }

  askGithubPage() {
    return new Promise((res, rej) => {
      Cli.ask('You have an existing github page. Is it a techfolio? (y/n)', /[y,n]/, (ans) => {
        if (ans === 'y') {
          res(ans);
        } else if (ans === 'n') {
          rej(ans);
        }
      });
    });
  }
}

Cli.ask = function (question, format, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdout.write(question + ": ");

  stdin.once('data', function (data) {
    data = data.toString().trim();

    if (format.test(data)) {
      callback(data);
    } else {
      stdout.write("It should match: " + format + "\n");
      Cli.ask(question, format, callback);
    }
  });
}

module.exports = Cli;
