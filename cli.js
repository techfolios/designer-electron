const FS = require('fs');
const Git = require('./git.js');

class Cli {

  start() {

    console.log('searching for ~/.techfolios directory...');
    FS.exists(Git.local, (exists) => {
      if (!exists) {
        console.log(`Adding local directory ${Git.local}.`);
        FS.mkdir(Git.local);
      }

      Cli.ask('What is your github username?', /[a-z,A-Z,0-9]/, (name) => {
        let git = new Git(name);

        git.hasGithubPage((repoUrl) => {
          if (repoUrl) {
            Cli.ask('You have an existing github page. Is it a techfolio? (y/n)', /[y,n]/, (isTechfolio) => {
              if (isTechfolio === 'y') {
                console.log('Ok, getting your exsiting techfolio page.');
                git.cloneGithubPage();
              } else if (isTechfolio === 'n') {
                git.cloneTechfoliosTemplate();            
              }
            });
          } else {
            console.log('.techfolios directory not found. Cloning template.');
            git.cloneTechfoliosTemplate();
          }
        });
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
