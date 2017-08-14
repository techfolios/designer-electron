const values = {
  dir: '',
  replace: (html) => {
    const json = html;
    if (!html.attribs) return;

    if (html.name === 'img') {
      const imagePath = json.attribs.src.split(/[\\/]/);
      imagePath[0] = values.dir;
      json.attribs.src = imagePath.join('\\');
    }
  },
};

module.exports = values;
