import React from 'react';
import { Form } from 'semantic-ui-react';

class References extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('education', state);
  }

  render() {
    return <div>
      {this.state.data.map((reference, index) => {
          return <div key={index}>
            <Form.Input label='Name'
              defaultValue={reference.name}
              placeholder={"Available upon request"}
              onChange={(e) => this.handleChange(e, 'name', index)} />
            <Form.Input label='Reference'
              defaultValue={reference.reference}
              placeholder={""}
              onChange={(e) => this.handleChange(e, 'reference', index)} />
          </div>
        })
      }
      </div>
  }  
}

export default References;