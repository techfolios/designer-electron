import React from 'react';
// import { Button, Icon, Menu } from 'semantic-ui-react';
import { Divider, Form, Header, Segment } from 'semantic-ui-react';

import Profiles from './components/Profiles.jsx';

class ProfilesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.bio;
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
  }

  handleChange(key, data) {
    const state = this.state;
    state[key] = data;
    this.setState(state);
  }

  handleSaveBio(e) {
    e.preventDefault();
    this.props.onSaveBio(this.state);
  }

  handleLoadBio() {
    this.props.onLoadBio();
  }

  render() {
    return <div>
      <Form>
        <Profiles data={this.state.basics.profiles} onChange={this.handleChange} />
      </Form>
      <Form.Button positive floated="right" type="Submit" onClick={this.handleSaveBio}>Save</Form.Button>
    </div>;
  }
}

export default ProfilesSection;
