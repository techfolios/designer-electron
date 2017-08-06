import React from 'react';
import Cropper from 'cropperjs';
import { Dropdown, Image, Segment } from 'semantic-ui-react';

class ImageEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      activeItem: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleClick(ev) {
    const image = ev.target;
    console.log(image);
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
    this.setState({ selectedImage: image });
    console.log(cropper);
  }

  handleItemClick(ev, { name }) {
    console.log(name);
    this.setState({ active: name });
  }

  render() {
    const { url } = this.state;
    return <Segment basic padded="very">
      <Dropdown text="File">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={this.handleItemClick}
            text='Crop' />
          <Dropdown.Item
            onClick={this.handleItemClick}
            text='Save' />
          <Dropdown.Item
            onClick={this.handleItemClick}
            text='Delete' />
          <Dropdown.Item
            onClick={this.handleItemClick}
            text='Reset' />
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <Image src={url} onClick={this.handleClick} />
      </div>
    </Segment>;
  }
}

export default ImageEditor;
