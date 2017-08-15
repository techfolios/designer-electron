import Path from 'path';

const values = {
  dir: '',
  replace: (html) => {
    const json = html;
    if (!html.attribs) return;

    if (html.name === 'img') {
      const imagePath = json.attribs.src;
      json.attribs.src = Path.join(values.dir, imagePath.slice(3));
      console.log(json.attribs.src);
    }
  },
};

module.exports = values;
