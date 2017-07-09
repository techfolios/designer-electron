import React from 'react';
import { Segment } from 'semantic-ui-react';

class References extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return <Segment basic>
      <code> { JSON.stringify(this.state.data) } </code>
    </Segment>
  }  
}

export default References;