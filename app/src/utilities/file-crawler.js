const path = require('path');
const fs = require('fs-extra');

class FileCrawler {
  constructor(directory) {
    this.dir = directory;
  }

  getFiles() {
    const list = [];
    const dir = this.dir;
    fs.readdirSync(dir).forEach((file) => {
      if (file !== 'index.html') {
        list.push(fs.readFileSync(dir + file));
      }
    });
    return list;
  }

  createFile(fileName, data) {
    const filePath = path.resolve(this.dir, fileName);
    fs.outputFile(filePath, data);
  }

  createJSON(fileName, data) {
    const filePath = path.resolve(this.dir, fileName);
    fs.outputJson(filePath, data);
  }
}


module.exports = FileCrawler;
