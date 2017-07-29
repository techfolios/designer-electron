import React from 'react';
import { Icon, Form } from 'semantic-ui-react';

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
      {this.state.data.map((profile, index) => <div key={index}>
        <div className="ui horizontal divider header">
          <span data-tooltip={profile.username} data-position="bottom center">
            <i className={`user icon ${profile.network}`}></i>
            {profile.network}
          </span>
        </div>
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
        <br />
      </div>)}
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Profiles;
