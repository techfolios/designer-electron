import Electron from 'electron';
import React from 'react';
import Path from 'path';

import { Button, Grid, Image, Segment } from 'semantic-ui-react';

import ImageEditor from './ImageEditor.jsx';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  openImageEditor(url, index) {
    this.props.setSelected(
      <ImageEditor key={index} index={index} url={url} removeImage={cb => this.removeImage(cb)} addImage={cb => this.addImage(cb)} />);
  }

  importImage() {
    const dialog = Electron.remote.dialog;
    const files = dialog.showOpenDialog({ properties: ['openFile'] });
    if (files.length > 0) {
      const url = files[0];
      const data = this.state.data;
      this.props.importImage(url)
        .then((res) => {
          data.push(res);
          this.setState({ data });
        }, (rej) => {
          console.log(rej);
        });
    }
  }

  addImage(cb) {
    const url = cb();
    const { data } = this.state;
    this.props.importImage(url)
      .then((res) => {
        data.push(res);
        this.setState({ data });
      }, (rej) => {
        console.log(rej);
      });
  }

  removeImage(cb) {
    const index = cb();
    this.props.removeImage(index);
  }

  render() {
    const { data } = this.state;
    return <Grid doubling columns={5}>
      {data.map((url, index) => {
        const imageName = Path.basename(url);
        return <Grid.Column key={index}>
          <Segment basic>
            <div data-tooltip={imageName}>
              <Image centered bordered src={url} onClick={() => this.openImageEditor(url, index)} />
            </div>
          </Segment>
        </Grid.Column>;
      })}
      <Grid.Column>
        <Button color="teal" icon="plus" onClick={() => this.importImage()} />
      </Grid.Column>
    </Grid>;
  }
}

export default Images;
