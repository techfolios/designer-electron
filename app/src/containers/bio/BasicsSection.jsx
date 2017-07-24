import React from 'react';
// import { Button, Icon, Menu } from 'semantic-ui-react';
import { Form, Segment, Grid, Header, Image } from 'semantic-ui-react';

import Basics from './components/basics/Basics.jsx';

function BioComponent(props) {
  return <Grid.Column >
    <Segment color="teal">
      <Header as="h2"> {props.name} </Header>
      {props.children}
    </Segment>
  </Grid.Column>;
}

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
    e.preventDefault();
    this.props.onSaveBio(this.state);
  }

  handleLoadBio() {
    this.props.onLoadBio();
  }

  render() {
    return <div>
      <Segment basic>
        <Image centered src={this.state.basics.picture} size='small' shape='circular' />
      </Segment>
      <Form onSubmit={this.handleSaveBio}>
        <Grid doubling relaxed padded columns={2}>
          <BioComponent name="Basics">
            <Basics data={this.state.basics} onChange={ this.handleChange } />
          </BioComponent>
        </Grid>
        <Form.Button positive floated="right" type="Submit">Save</Form.Button>
      </Form>
    </div>;
  }
}

export default BasicsSection;
