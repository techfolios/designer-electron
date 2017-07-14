import React from 'react';
import { Icon, Form } from 'semantic-ui-react';

class References extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    let data = this.state.data;
    data[index][key] = e.target.value;
    this.setState({ data: data});
  }

  add() {
    let data = this.state.data;
    data.push({
      name:'',
      reference: ''
    });
    this.setState({ data: data});
  }

  remove() {
    let data = this.state.data;
    data.pop();
    this.setState({ data: data});
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
      <Icon link name="minus" onClick={this.remove} ></Icon>                                  
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
      </div>
  }  
}

export default References;