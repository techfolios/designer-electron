const path = require('path');
const fs = require('fs-extra');
const parser = require('front-matter');

class YAMLParser {
  constructor(files) {
    this.files = files;
  }

  read(file, filePath) {
    let data = [];
    const list = this.files;

    if (file !== undefined) {
      const json = parser(file);
      if (filePath !== undefined) {
        json.path = filePath;
      }
      data = json;
      console.log(data);
    } else {
      list.forEach((value) => {
        const json = parser(value);
        if (filePath !== undefined) {
          json.path = filePath;
        }
        data.push(json);
      });
    }

    return data;
  }

  write() {
    const list = this.files;
  }
}

module.exports = YAMLParser;
