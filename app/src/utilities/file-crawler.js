import YAMLParser from './../utilities/yaml-parser';

const path = require('path');
const fs = require('fs-extra');

class FileCrawler {
  constructor(directory) {
    this.dir = directory;
  }

  getFileNames() {
    const list = [];
    const dir = this.dir;
    fs.readdirSync(dir).forEach((file) => {
      if (file !== 'index.html') {
        list.push(file);
      }
    });
    return list;
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
    let fileExt = '';
    fs.readdirSync(dir).forEach((file) => {
      /* eslint no-bitwise: ["error", { "allow": [">>>"] }] */
      fileExt = file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2);
      if (fileExt === 'md') {
        const filePath = path.join(dir, file);
        const data = YAMLParser.read(fs.readFileSync(filePath, 'utf8'), file);
        list.push(data);
      } else {
        console.log(`Skipping ${file}, not an md file`);
      }
    });
    return list;
  }

  removeFile(fileName) {
    if (fileName !== undefined) fs.removeSync(path.join(this.dir, fileName));
  }

  writeFile(fileName, data, oldFileName) {
    const filePath = path.resolve(this.dir, fileName);
    console.log(filePath);
    fs.outputFileSync(filePath, data);
    if (oldFileName && oldFileName !== fileName) fs.removeSync(path.resolve(this.dir, oldFileName));
  }

  createJSON(fileName, data) {
    const filePath = path.resolve(this.dir, fileName);
    fs.outputJsonSync(filePath, data);
  }
}


export default FileCrawler;
