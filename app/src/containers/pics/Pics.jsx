import React from 'react';
import { Image } from 'semantic-ui-react';
import Cropper from 'cropperjs';

/**
 * PLAN:
 *  view: list of all images
 *  actions: rename, add, remove, and edit [resize, and crop (perfect squares only)]
 */

class Pics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    console.log(this.state);
    const image = document.getElementById('image');
    const cropper = new Cropper(image, {
      aspectRatio: 1,
      crop: (e) => {
        console.log(e.detail.x);
        console.log(e.detail.y);
        console.log(e.detail.width);
        console.log(e.detail.height);
        console.log(e.detail.rotate);
        console.log(e.detail.scaleX);
        console.log(e.detail.scaleY);
      },
    });

    return <div>
      <Image src="C:\Users\Naaupo\.techfolios\images\micromouse-robot-2.jpg" />
    </div>;
  }
}

export default Pics;
