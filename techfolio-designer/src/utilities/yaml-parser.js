const parser = require('front-matter');

class YAMLParser {
  constructor(files) {
    this.files = files;
  }

  static read(file, fileName) {
    let data = {};
    const json = parser(file);

    json.file = {};
    json.file.name = fileName;
    data = json;

    return data;
  }

  static write(json) {
    let yaml = '';
    Object.keys(json.attributes).forEach((key) => {
      if (json.attributes[key] !== '') {
        if (Array.isArray(json.attributes[key]) && json.attributes[key].length !== 0) {
          yaml = yaml.concat(`${key}:\n`);
          json.attributes[key].forEach((value) => {
            yaml = yaml.concat(`  - ${value.trim()}\n`);
          });
        } else {
          yaml = yaml.concat(`${key}: ${json.attributes[key]}\n`);
        }
      }
    });
    return `---\n${yaml}---\n\n${json.body.trim()}`;
  }
}

module.exports = YAMLParser;
