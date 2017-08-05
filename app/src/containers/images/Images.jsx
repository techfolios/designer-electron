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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(url, index) {
    this.props.setSelected(<ImageEditor key={index} url={url} />);
  }

  render() {
    const { data } = this.state;
    return <Grid doubling columns={5}>
      {data.map((url, index) => <Grid.Column key={index}>
        <Segment raised><div>
          <Image src={url} onClick={() => this.handleClick(url, index)} />
        </div></Segment>
      </Grid.Column>)
      }
      <Grid.Column>
        <Button color="teal" icon="plus" />
      </Grid.Column>
    </Grid>;
  }
}

export default Images;
