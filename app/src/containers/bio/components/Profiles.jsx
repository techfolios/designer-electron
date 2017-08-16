import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    const data = this.state.data;
    data[index][key] = e.target.value;
    this.setState(data);
    this.props.onChange(data);
  }

  add() {
    const data = this.state.data;
    data.push({
      network: '',
      username: '',
      url: '',
    });
    this.props.onChange(data);
  }

  remove() {
    const data = this.state.data;
    data.pop();
    this.props.onChange(data);
  }

  render() {
    return <div>
      {this.state.data.map((profile, index) => <Segment key={index}>
        <div className="ui horizontal divider header">
          <span data-tooltip={profile.username} data-position="bottom center">
            <i className={`user icon ${profile.network}`}></i>
            {profile.network}
          </span>
        </div>
        <Form.Group>
          <Form.Input
            label="Network"
            width={5}
            defaultValue={profile.network}
            placeholder="Network"
            onChange={e => this.handleChange(e, 'network', index)} />
          <Form.Input
            width={5}
            label="Username"
            defaultValue={profile.username}
            placeholder="Username"
            onChange={e => this.handleChange(e, 'username', index)} />
          <Form.Input
            width={6}
            label="Url"
            defaultValue={profile.url}
            placeholder="Url"
            onChange={e => this.handleChange(e, 'url', index)} />
        </Form.Group>
      </Segment>)}
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Profiles;
