import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

import Basics from './components/basics/Basics.jsx';

class BasicsSection extends React.Component {
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
    console.log(e);
    e.preventDefault();
    this.props.onSaveBio(this.state);
  }

  handleLoadBio() {
    this.props.onLoadBio();
  }

  render() {
    return (<div>
      <Segment basic>
        <Header className="ui center aligned header" as="h1"> Basics </Header>
        <div className="ui divider"></div>
      </Segment>
      <Form>
        <Basics data={this.state.basics} onChange={this.handleChange} />
      </Form>
      <Form.Button positive floated="right" type="Submit" onClick={this.handleSaveBio}>Save</Form.Button>
    </div>);
  }
}

export default BasicsSection;