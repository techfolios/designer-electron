import React from 'react';
import { Segment } from 'semantic-ui-react';

import Contact from './Contact.jsx';
import Location from './Location.jsx';

class Basics extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.handleChange = this.handleChange.bind(this);
    this.handleProfilesChange = this.handleProfilesChange.bind(this);
  }

  handleChange(e, key) {
    const state = this.state;
    state[key] = e.target.value;
    this.props.onChange('basics', state);
  }

  handleProfilesChange(data) {
    const state = this.state;
    state.profiles = data;
    this.props.onChange('basics', state);
  }

  render() {
    return (<Segment>
      <Contact data={this.state} handleChange={this.handleChange} />
      <Location data={this.state.location} onChange={this.props.onChange}/>
    </Segment>);
  }
}

export default Basics;
