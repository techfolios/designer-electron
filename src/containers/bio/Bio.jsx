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
    this.state =  props.bio;
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  
  save(event) {
    event.preventDefault();
  }

  cancel(event) {
    event.preventDefault();
  }

  render() {
    console.log('render');
    return (
      <div>
        <Segment basic >
          <Header as='h2' icon textAlign="center">
            <Icon name='user circle' />
            Bio
          </Header>
        </Segment>
        <Segment color="teal">
          <Basics data    = { this.state.basics } />
          <Interests data = { this.state.interests }/>
          <Skills data    = { this.state.skills }/>
          <Education data = { this.state.education }/>
          <Work data      = { this.state.work }/>
          <Voulnteer data = { this.state.voulnteer }/>
          <Awards data    = { this.state.awards }/>
        <References/>
          <Form>
            <Form.Dropdown multiple label='Interests'
              options={
                this.state.interests.map((item, index) => {
                  return {
                    key: index,
                    value: item.name,
                    text: item.name,
                  }
                }
              )} />
            <Button onClick={ this.cancel }>Cancel</Button>
            <Button onClick={ this.save }>Save</Button>
          </Form>
          <Awards/>
        </Segment>
      </div>
    );
  }
}

export default Bio;
