import React from 'react';
import { Form, Button, Segment, Header, Icon } from 'semantic-ui-react';

import Awards from './components/Awards';
import Basics from './components/Basics';
import Education from './components/Education';
import Interests from './components/Interests';
import References from './components/References';
import Skills from './components/Skills';
import Voulnteer from './components/Voulnteer';
import Work from './components/Work';

function BioComponent(props) {
  return <Segment basic>
    <Header as="h2"> {props.name} </Header>
    {props.children}
  </Segment>
}

class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.bio;
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
        <BioComponent name="Basics">
          <Basics data={this.state.basics} />
        </BioComponent>
        <BioComponent name="Interests">
          <Interests data={this.state.interests} />
        </BioComponent>
        <BioComponent name="Skills">
          <Skills data={this.state.skills} />
        </BioComponent>
        <BioComponent name="Education">
          <Education data={this.state.education} />
        </BioComponent>
        <BioComponent name="Work">
          <Work data={this.state.work} />
        </BioComponent>
        <BioComponent name="Volunteer">
          <Voulnteer data={this.state.voulnteer} />
        </BioComponent>
        <BioComponent name="Awards">
          <Awards data={this.state.awards} />
        </BioComponent>
        <BioComponent name="References">
          <References data={this.state.references} />
        </BioComponent>
        <Button onClick={() => this.setState(this.io.loadBio)}>Cancel</Button>
        <Button onClick={() => this.io.saveBio()}>Save</Button>
      </Segment>
    </div>
  }
}

export default Bio;
