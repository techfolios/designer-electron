import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';
import BioComponent from './BioComponent';

class Skills extends BioComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <Segment>
      { this.renderHeader() }
      { this.state.data.map((skill) => {
          return <Form>
            <Header as="h3">{ skill.name }</Header>
            <Form.Input label='Level'
              defaultValue    = { skill.level }
              placeholder     = { "???" }
              onChange        = { ( event) => skill.level = event.target.value } />            
            <Form.Dropdown multiple label='Keywords'
              options={
                skill.keywords.map((keyword, index) => {
                  return {
                    key:   index,
                    value: index,
                    text:  keyword.name,
                  }
                })
              } />
          </Form>
        }) 
      }
    </Segment>
  }
}

export default Skills;