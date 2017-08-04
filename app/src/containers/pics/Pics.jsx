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
    return <div>
      <Image src="C:\Users\Naaupo\.techfolios\images\micromouse-robot-2.jpg" />
    </div>;
  }
}

export default Pics;
