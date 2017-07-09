import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

class BioComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  renderHeader() {
    return <Header as="h2"> { this.state.name } </Header>      
  }

  render() {
      return <Segment>
        { this.renderHeader() }
        { JSON.stringify(this.state.data, null, 4) }
      </Segment>
  }
}

export default BioComponent;