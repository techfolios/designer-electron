import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

class Profiles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key) {
    let data = this.state.data;
    data[key] = e.target.value;
    this.setState(data);
  }

  add() {
    let data = this.state.data;
    data.push({
      network: '',
      username: '',
      url: ''
    });
    this.props.onChange(data);
  }

  remove() {
    let data = this.state.data;
    data.pop();
    this.props.onChange(data);
  }
  
  render() {
    return <div>
      <Form.Input label="Network" 
        defaultValue={this.state.data.network} 
        placeholder="Github" 
        onChange={e => this.handleChange(e, 'network')}/>
      <Form.Input label="Username" 
        defaultValue={this.state.data.network} 
        placeholder="Username" 
        onChange={e => this.handleChange(e, 'username')}/>
      <Form.Input label="Url" 
        defaultValue={this.state.data.network} 
        placeholder="https://github.com" 
        onChange={e => this.handleChange(e, 'url')}/>
    </div>
  }
}