import React from 'react';
import { Container } from 'semantic-ui-react';

import Contact from './Contact.jsx';
import Location from './Location.jsx';

class Basics extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleChange(e, key) {
    const state = this.state;
    state[key] = e.target.value;
    this.props.onChange('basics', state);
  }

  handleLocationChange(e, key) {
    const state = this.state;
    state.location[key] = e.target.value;
    this.props.onChange('basics', state);
  }

  render() {
    return (
      <Container fluid>
        <Contact data={this.state} handleChange={this.handleChange} />
        <Location data={this.state.location} handleChange={this.handleLocationChange}/>
      </Container>
    );
  }
}

export default Basics;
