import YAMLParser from './../utilities/yaml-parser';

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
        const filePath = path.join(dir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        list.push(data);
      }
    });
    return list;
  }

  getYAML() {
    const list = [];
    const dir = this.dir;
    const parser = new YAMLParser();
    fs.readdirSync(dir).forEach((file) => {
      if (file !== 'index.html') {
        const filePath = path.join(dir, file);
        const data = parser.read(fs.readFileSync(filePath, 'utf8'), file);
        list.push(data);
      }
    });
    return list;
  }

  removeFile(fileName) {
    fs.removeSync(path.join(this.dir, fileName));
  }

  writeFile(fileName, data) {
    const filePath = path.resolve(this.dir, fileName);
    console.log(filePath);
    fs.outputFileSync(filePath, data);
  }

  createJSON(fileName, data) {
    const filePath = path.resolve(this.dir, fileName);
    fs.outputJsonSync(filePath, data);
  }
}


module.exports = FileCrawler;
