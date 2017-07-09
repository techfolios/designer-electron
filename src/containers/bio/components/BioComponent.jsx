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

  renderComponent(callback) {
    return <Segment basic>
      { this.renderHeader() }
      { callback() }
    </Segment>
  }

  render() {
      return <Segment basic>
        { this.renderHeader() }
        <code> { JSON.stringify(this.state, null, 4) } </code>   
      </Segment>
  }
}

export default BioComponent;