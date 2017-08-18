import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class ModalExampleSize extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  show(size) {
    return () => this.setState({ size, open: true });
  }

  close() {
    return () => this.setState({ open: false });
  }

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('mini')}>Mini</Button>
        <Button onClick={this.show('tiny')}>Tiny</Button>
        <Button onClick={this.show('small')}>Small</Button>
        <Button onClick={this.show('large')}>Large</Button>
        <Button onClick={this.show('fullscreen')}>Fullscreen</Button>

        <Modal size={size} open={open} onClose={this.close()} closeIcon={true}>
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>
              No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleSize;
