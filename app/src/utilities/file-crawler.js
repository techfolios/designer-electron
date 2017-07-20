const path = require('path');
const fs = require('fs-extra');

class FileCrawler {

  constructor(directory) {
    this.dir = directory;
  }

  getFiles(directory) {
    const list = [];
    const dir = this.dir;
    fs.readdirSync(dir).forEach((file) => {
      list.push(file);
    });
    return list;
  }

  createFile(fileName) {
    const dir = this.dir;
  }

}
