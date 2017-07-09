import React from 'react';
import { Form, Button, Segment, Header, Icon } from 'semantic-ui-react';

import FS from 'fs';
import Path from 'path';
import SimpleGit from 'simple-git';

import Awards from './components/Awards';
import Basics from './components/Basics';
import Education from './components/Education';
import Interests from './components/Interests';
import References from './components/References';
import Skills from './components/Skills';
import Voulnteer from './components/Voulnteer';
import Work from './components/Work';


class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state  = props.bio;
    this.save   = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  
  save(event) {
    event.preventDefault();
  }

  cancel(event) {
    event.preventDefault();
  }

  render() {
    return <div>
        <Segment basic >
          <Header as='h2' icon textAlign="center">
            <Icon name='user circle' />
            Bio
          </Header>
        </Segment>
        <Segment color="teal">
          <Basics name="Basics" data={ this.state.basics }/>
          <Interests name="Interests" data={ this.state.interests }/>
          <Skills name="Skills" data={ this.state.skills }/>
          <Education name="Education" data={ this.state.education }/>
          <Work name="Work" data={ this.state.work }/>
          <Voulnteer name="Volunteer" data={ this.state.voulnteer }/>
          <Awards name="Awards" data={ this.state.awards }/>
          <References name="" data={ this.state.references }/>
          <Button onClick={ this.cancel }>Cancel</Button>
          <Button onClick={ this.save }>Save</Button>
        </Segment>
      </div>
  }
}

export default Bio;
