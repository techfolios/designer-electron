const os = require('os');
const fs = require('fs');

// check if directory exists
console.log('searching for ~/.techfolios directory...');
let tfDir = os.homedir() + '/.techfolios';
fs.exists(tfDir, (res) => {
  if(res) {
    console.log(tfDir + ' exists.');
    console.log('searching for ~/.techfolios/.git directory... ');
    fs.exists(tfDir + '/.git',  (res) => {
      console.log('~/.techfolios/.git directory exists.');
      console.log('starting app...');
    });
  } else {
    console.log(tfDir + ' not found.');
    ask('.techfolios directory not found. Create one? (y/n)', /[y,n]/, (res) => {
      if(res === 'y'){
        console.log('check if user has github.io repo');
        console.log('user has/has not');
        console.log('begin init.');
        console.log('git clone https://github.com/techfolios/template');
        console.log('git remote rm origin');
        console.log('git remote add origin https://github.com/${user}/${user}.github.io');
      }
    });
  }
});

function ask(question, format, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function(data) {
    data = data.toString().trim();

    if (format.test(data)) {
      callback(data);
      stdin.end();
    } else {
      stdout.write("It should match: "+ format +"\n");
      ask(question, format, callback);
    }
  });
}

