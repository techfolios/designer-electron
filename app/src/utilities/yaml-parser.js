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

  static write(json) {
    let yaml = '';
    Object.keys(json.attributes).forEach((key) => {
      if (Array.isArray(json.attributes[key])) {
        yaml = yaml.concat(`${key}:\n`);
        json.attributes[key].forEach((value) => {
          yaml = yaml.concat(`  -${value}\n`);
        });
      } else {
        yaml = yaml.concat(`${key}: ${json.attributes[key]}\n`);
      }
    });
    return `---\n${yaml}---\n\n${json.body}`;
  }
}

module.exports = YAMLParser;
