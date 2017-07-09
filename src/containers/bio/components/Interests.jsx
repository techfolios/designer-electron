import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class Interests extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return <Form.Dropdown multiple label='Interests'
      options={
        this.state.data.map((item, index) => {
          return {
            key: index,
            value: item.name,
            text: item.name,
          }
        })
      } />
  }
}

export default Interests;