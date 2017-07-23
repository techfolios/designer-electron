const path = require('path');
const fs = require('fs-extra');
const parser = require('front-matter');

class YAMLParser {
  constructor(files) {
    this.files = files;
  }

  read(file, fileName) {
    let data = [];
    const list = this.files;

    if (file !== undefined) {
      const json = parser(file);
      if (fileName !== undefined) {
        json.file = fileName;
      }
      data = json;
      console.log(data);
    } else {
      list.forEach((value) => {
        const json = parser(value);
        if (fileName !== undefined) {
          json.file = fileName;
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
