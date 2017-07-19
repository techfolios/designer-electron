import React from 'react';
import { Icon, Form, Segment, Header } from 'semantic-ui-react';

class Profiles extends React.Component {

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
    this.setState(data);
    this.props.onChange(data);
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
      <Header as="h3">Profiles</Header>
      {this.state.data.map((profile, index) => {
        return <div key={index}>
          <Form.Input label="Network"
            defaultValue={profile.network}
            placeholder="Github"
            onChange={e => this.handleChange(e, 'network', index)} />
          <Form.Input label="Username"
            defaultValue={profile.username}
            placeholder="Username"
            onChange={e => this.handleChange(e, 'username', index)} />
          <Form.Input label="Url"
            defaultValue={profile.url}
            placeholder="https://github.com"
            onChange={e => this.handleChange(e, 'url', index)} />
        </div>
      })}
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>
  }
}

export default Profiles;
