import React from 'react';
import { Form, Button, Segment, Grid, Header, Icon, Image } from 'semantic-ui-react';

import Awards from './components/Awards';
import Basics from './components/Basics';
import Education from './components/Education';
import Interests from './components/Interests';
import References from './components/References';
import Skills from './components/Skills';
import Volunteer from './components/Volunteer';
import Work from './components/Work';

function BioComponent(props) {
  return <Grid.Column >
    <Header as="h2"> {props.name} </Header>
    {props.children}
  </Grid.Column>
}

class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.bio;
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
    
  }

  handleChange(key, data) {
    let state = this.state;
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
      <Segment color="teal">
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
          <Form.Button positive type="Submit">Save</Form.Button>
        </Form>
      </Segment>
    </div>
  }
}

export default Bio;
