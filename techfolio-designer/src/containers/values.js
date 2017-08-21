import React from 'react';
import domToReact from 'html-react-parser/lib/dom-to-react';

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
          imagePath[0] = values.dir;
          json.attribs.src = imagePath.join('\\');
        }
        break;
      }
      default:
        return json;
    }

    return json;
  },
};

module.exports = values;
