import React from 'react';
import { Form, Button, Segment, Header, Icon } from 'semantic-ui-react';
import Git from '../../git.js';

const path = require('path');

class Bio extends React.Component {

  constructor() {
    super();
    this.bio = require(path.resolve(Git.local, '_data/bio.json'));
    this.state = { bio: this.bio };

    this.addInterest = this.addInterest.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  addInterest(event) {
    event.preventDefault();
  }

  save(event) {
    event.preventDefault();
  }

  cancel(event) {
    event.preventDefault();
  }

  renderFormInput(label, key) {
    return <Form.Input label={label}
      value={this.state.bio.basics[key]}
      onChange={(event) => this.state.bio.basics[key] = event.target.value} />
  }

  render() {
    return (
      <div>
        <Segment basic >
          <Header as='h2' icon textAlign="center">
            <Icon name='user circle'/>
            Bio
          </Header>
        </Segment>
        <Segment color="teal">
          <Form>
            <Form.Group>
              <Form.Input label='Name'
                width={3}
                value={this.state.bio.basics.name}
                placeholder={this.state.bio.basics.name}
                onChange={(event) => this.state.bio.basics.name = event.target.value} />
              <Form.Input label='E-Mail'
                width={3}
                value={this.state.bio.basics.email}
                placeholder={this.state.bio.basics.email}
                onChange={(event) => this.state.bio.basics.email = event.target.value} />
              <Form.Input label='Phone Number'
                width={3}
                value={this.state.bio.basics.phone}
                placeholder={this.state.bio.basics.phone}
                onChange={(event) => this.state.bio.basics.phone = event.target.value} />
            </Form.Group>
            <Form.Input label='Website'
              width={9}
              value={this.state.bio.basics.site}
              placeholder="https://www.example.com"
              onChange={(event) => this.state.bio.basics.site = event.target.value} />
            <Form.TextArea label='Summary'
              value={this.state.bio.basics.summary}
              onChange={(event) => this.state.bio.basics.summary = event.target.value} />
            <Form.Dropdown multiple label='Interests' 
              options={ this.state.bio.interests.map((item, index) => {
                  return {
                    key: index,
                    value: item.name,
                    text: item.name,
                  }
                }) } />
            <Button onClick={ this.cancel }>Cancel</Button>
            <Button onClick={ this.save }>Save</Button>        
          </Form>
        </Segment>        
      </div>
    );
  }
}

export default Bio;