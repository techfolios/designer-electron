import React from 'react';
import Cropper from 'cropperjs';
import Jimp from 'jimp';
import { Dropdown, Image, Segment } from 'semantic-ui-react';

class ImageEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      activeItem: '',
      index: props.index,
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleImageLoad(ev) {
    const image = ev.target;
    console.log(image);
    const cropper = new Cropper(image, {
      autoCrop: true,
      autoCropArea: 1,
      aspectRatio: 1,
      crop: (e) => {
        console.log(e.detail.x);
        console.log(e.detail.y);
        console.log(e.detail.width);
        console.log(e.detail.height);
        console.log(e.detail.rotate);
        console.log(e.detail.scaleX);
        console.log(e.detail.scaleY);
        this.setState({ crop: e.detail });
      },
    });
    this.setState({ selectedImage: image });
    this.setState({ cropper });
  }

  handleItemClick(ev, { name }) {
    console.log(name);
    this.setState({ active: name });
  }

  handleCrop() {
    const { crop, url } = this.state;
    console.log(crop);
    Jimp.read(url, (err, img) => {
      if (!err) {
        img.crop(crop.x, crop.y, crop.width, crop.height);
        img.write(url, (writeErr) => {
          if (!writeErr) {
            console.log(`image written to disk: ${url}`);
          } else {
            console.log(writeErr);
          }
        });
      }
    });
  }

  handleDelete() {
    this.props.removeImage(() => this.state.index);
  }

  render() {
    const { url, cropper } = this.state;
    return <Segment basic padded="very">
      <Dropdown text="File">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={this.handleCrop}
            text='Crop' />
          <Dropdown.Item
            onClick={this.handleItemClick}
            text='Save' />
          <Dropdown.Item
            onClick={this.handleDelete}
            text='Delete' />
          <Dropdown.Item
            onClick={() => cropper.reset()}
            text='Reset' />
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <Image src={url} onLoad={this.handleImageLoad} />
      </div>
    </Segment>;
  }
}

export default ImageEditor;
