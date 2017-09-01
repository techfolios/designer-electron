import React from 'react';
import domToReact from 'html-react-parser/lib/dom-to-react';
const path = require('path');

const values = {
  dir: '',
  replace: (html) => {
    const json = html;

    if (!html.attribs) return json;

    switch (html.name) {
      case 'html':
      case 'head':
      case 'title':
      case 'body':
        return <div>{domToReact(html.children, values)}</div>;
      case 'img': {
        const imagePath = json.attribs.src.split(/[\\/]/);
        if (!imagePath[0].includes('http')) {
          if (imagePath[0].includes('images')) imagePath[0] = `${values.dir}${path.sep}images`;
          else imagePath[0] = values.dir;
          json.attribs.src = imagePath.join(path.sep);
          console.log(`Image Path: ${json.attribs.src}`);
        }
        break;
      }
      case 'a': {
        json.attribs.target = '_blank';
        break;
      }
      default:
        return json;
    }

    return json;
  },
};

module.exports = values;
