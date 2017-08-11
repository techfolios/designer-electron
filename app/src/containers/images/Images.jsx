import Electron from 'electron';
import React from 'react';
import { Button, Grid, Image, Segment } from 'semantic-ui-react';

import ImageEditor from './ImageEditor.jsx';

/**
 * PLAN:
 *  view: list of all images
 *  actions: rename, add, remove, and edit [resize, and crop (perfect squares only)]
 */

class Images extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.openImageEditor = this.openImageEditor.bind(this);
    this.importImage = this.importImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  openImageEditor(url, index) {
    this.props.setSelected(<ImageEditor key={index} index={index} url={url} removeImage={this.removeImage}/>);
  }

  importImage() {
    const dialog = Electron.remote.dialog;
    console.log(this);
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

  removeImage(cb) {
    const index = cb();
    this.props.removeImage(index);
  }

  render() {
    const { data } = this.state;
    return <Grid doubling columns={5}>
      {data.map((url, index) => <Grid.Column key={index}>
        <Segment raised><div>
          <Image centered src={url} onClick={() => this.openImageEditor(url, index)} />
        </div></Segment>
      </Grid.Column>)
      }
      <Grid.Column>
        <Button color="teal" icon="plus" onClick={this.importImage} />
      </Grid.Column>
    </Grid>;
  }
}

export default Images;
