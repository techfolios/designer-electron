import React from 'react';
// import { Button, Icon, Menu } from 'semantic-ui-react';
import { Form, Segment, Grid, Header, Image } from 'semantic-ui-react';

import Awards from './components/Awards.jsx';
import Basics from './components/basics/Basics.jsx';
import Education from './components/Education.jsx';
import Interests from './components/Interests.jsx';
import References from './components/References.jsx';
import Skills from './components/Skills.jsx';
import Volunteer from './components/Volunteer.jsx';
import Work from './components/Work.jsx';

function BioComponent(props) {
  return <Grid.Column >
    <Segment color="teal">
      <Header as="h2"> {props.name} </Header>
      {props.children}
    </Segment>
  </Grid.Column>;
}

class Bio extends React.Component {
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
          <BioComponent name="Interests">
            <Interests data={this.state.interests} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="Skills">
            <Skills data={this.state.skills} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="Education">
            <Education data={this.state.education} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="Work">
            <Work data={this.state.work} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="Volunteer">
            <Volunteer data={this.state.volunteer} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="Awards">
            <Awards data={this.state.awards} onChange={ this.handleChange } />
          </BioComponent>
          <BioComponent name="References">
            <References data={this.state.references} onChange={ this.handleChange } />
          </BioComponent>
        </Grid>
        <Form.Button positive floated="right" type="Submit">Save</Form.Button>
      </Form>
    </div>;
  }
}

export default Bio;