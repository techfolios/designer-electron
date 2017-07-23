const path = require('path');
const fs = require('fs-extra');

class FileCrawler {
  constructor(directory) {
    this.dir = directory;
    this.map = {};
  }

  getFiles() {
    const list = [];
    const dir = this.dir;
    const map = this.map;
    fs.readdirSync(dir).forEach((file) => {
      if (file !== 'index.html') {
        const filePath = path.join(dir, file);
        list.push(fs.readFileSync(filePath, 'utf8'));
        map[file] = filePath;
      }
    });
    return list;
  }

  removeFile(name) {
    fs.removeSync(this.map[name]);
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
