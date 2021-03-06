import React from 'react';
import Cropper from 'cropperjs';
import Jimp from 'jimp';
import { Button, Checkbox, Dropdown, Image, Modal, Segment } from 'semantic-ui-react';

class ImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      index: props.index,
      alert: false,
      cropRatio: 'free',
    };
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleSquareCrop = this.toggleSquareCrop.bind(this);
    this.show = this.show.bind(this);
  }

  handleImageLoad(ev) {
    const { cropRatio } = this.state;
    const image = ev.target;
    const cropper = new Cropper(image, {
      autoCrop: true,
      autoCropArea: 1,
      aspectRatio: cropRatio,
      crop: (e) => {
        // console.log(e.detail.x);
        // console.log(e.detail.y);
        // console.log(e.detail.width);
        // console.log(e.detail.height);
        // console.log(e.detail.rotate);
        // console.log(e.detail.scaleX);
        // console.log(e.detail.scaleY);
        this.setState({ crop: e.detail });
      },
    });
    this.setState({ cropper });
  }

  handleCrop() {
    const { crop, url } = this.state;
    this.show('Crop Image', 'Are you sure?', () => {
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
    });
  }

  handleDelete() {
    this.show('Delete Image', 'Are you sure?', () => {
      this.props.removeImage(() => this.state.index);
    });
  }

  toggleSquareCrop() {
    const { cropRatio, cropper } = this.state;
    if (cropRatio !== 1) {
      this.setState({ cropRatio: 1 });
      cropper.setAspectRatio(1);
    } else {
      this.setState({ cropRatio: 'free' });
      cropper.setAspectRatio('free');
    }
  }

  show(header, message, res, rej) {
    const onResolve = () => {
      res();
      this.setState({ alert: false });
    };
    const onReject = () => {
      if (rej) {
        rej();
      }
      this.setState({ alert: false });
    };
    this.setState({ header, message, onResolve, onReject, alert: true });
  }

  render() {
    const { url, cropper, alert, header, message, onReject, onResolve } = this.state;
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
        <Checkbox toggle label={<label>Square Crop</label>} onClick={this.toggleSquareCrop} />
        <Image src={url} onLoad={this.handleImageLoad} />
      </div>

      <Modal size="mini" open={alert} onClose={() => this.setState({ alert: false })} closeIcon={true}>
        <Modal.Header>
          {header}
        </Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary content='No' onClick={onReject} />
          <Button positive content='Yes' onClick={onResolve} />
        </Modal.Actions>
      </Modal>
    </Segment>;
  }
}

export default ImageEditor;
