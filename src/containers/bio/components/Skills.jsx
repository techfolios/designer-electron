import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';
import BioComponent from './BioComponent';

class Skills extends BioComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      { 
        this.renderComponent(() => {
          return <div>
            { this.state.data.map((skill) => {
              return <Form>
                <Header as="h3">{ skill.name }</Header>
                <Form.Group>
                  <Form.Input label='Level'
                    defaultValue    = { skill.level }
                    placeholder     = { "Diamond" }
                    onChange        = { ( event) => skill.level = event.target.value } />            
                  <Form.Dropdown multiple label='Keywords'
                    options={
                      skill.keywords.map((keyword, index) => {
                        return {
                          key:   index,
                          value: keyword,
                          text:  keyword,
                        }
                      })
                    } />
                  </Form.Group>
                </Form>
              }) 
            }
          </div>
        })
      }
    </div>
  }
}

export default Skills;