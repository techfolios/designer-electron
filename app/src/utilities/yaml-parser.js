const path = require('path');
const fs = require('fs-extra');
const parser = require('front-matter');

class YAMLParser {
  constructor(files) {
    this.files = files;
  }

  read() {
    const list = this.files;
    const data = [];

    if (list.length === undefined) {
      data.push(parser(file));
    } else {
      list.forEach((file) => {
        data.push(parser(file));
      });
    }

    return data;
  }

  write() {
    const list = this.files;
  }
}

module.exports = YAMLParser;