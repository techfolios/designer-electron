import React from 'react';
import { Form, Button, Segment, Header, Icon } from 'semantic-ui-react';

import FS from 'fs';
import Path from 'path';
import SimpleGit from 'simple-git';

class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.bio = props.bio;
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
          <Form>
            <Form.Group>
              <Form.Input label='Name'
                defaultValue={this.state.bio.basics.name}
                placeholder={"John Smith"}
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        name: event.target.value
                      }
                    }
                  });
                }}
              />              
              <Form.Input label='Label'
                defaultValue={this.state.bio.basics.label}
                placeholder={'Student'}
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        label: event.target.value
                      }
                    }
                  });
                }}
              />              
              <Form.Input label='Phone Number'
                defaultValue={this.state.bio.basics.phone}
                placeholder={'+1-808-867-5309'}
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        phone: event.target.value
                      }
                    }
                  });
                }}
              />            
            </Form.Group>              
            <Form.Group>              
              <Form.Input label='E-Mail'
                defaultValue={this.state.bio.basics.email}
                placeholder='jsmith@example.com'
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        email: event.target.value
                      }
                    }
                  });
                }}
              />
              <Form.Input label='Website'
                width={9}
                defaultValue={this.state.bio.basics.website}
                placeholder="https://www.example.com"
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        website: event.target.value
                      }
                    }
                  });
                }} 
              />
            </Form.Group>                            
            <Form.TextArea label='Summary'
              defaultValue={this.state.bio.basics.summary}
              placeholder="Once upon a midnight dreary, while I pondered weak and weary..."
                onChange={(event) => {
                  this.setState({
                    bio: {
                      basics: {
                        summary: event.target.value
                      }
                    }
                  });
                }}
              />            
              <Form.Dropdown multiple label='Interests'
              options={this.state.bio.interests.map((item, index) => {
                return {
                  key: index,
                  value: item.name,
                  text: item.name,
                }
              })} />
            <Button onClick={this.cancel}>Cancel</Button>
            <Button onClick={this.save}>Save</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default Bio;
