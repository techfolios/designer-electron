import React from 'react';
import { Button, Grid, Image, Segment } from 'semantic-ui-react';
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    console.log(ev.target);
    const cropper = new Cropper(ev.target, {
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
    this.setState({ clicked: ev });
  }

  render() {
    const { data } = this.state;
    return <Grid doubling columns={5}>
      {data.map((url, index) => <Grid.Column key={index}>
          <Segment raised><div>
            <Image src={url} onClick={this.handleClick}/>
          </div></Segment>
        </Grid.Column>)
      }
      <Grid.Column>
        <Button color="teal" icon="plus" />
      </Grid.Column>
    </Grid>;
  }
}

export default Pics;
