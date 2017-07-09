import React from 'react';
import BioComponent from './BioComponent';
import { Form, Segment } from 'semantic-ui-react';

class Interests extends BioComponent {
  constructor(props) {
    super(props);
  }

  render() { 
    return <div>
      { 
        this.renderComponent(() => {
          return <Form>
            <Form.Dropdown multiple label='Interests'
              options={
                this.state.data.map((item, index) => {
                  return {
                    key:   index,
                    value: item.name,
                    text:  item.name,
                  }
                })
              } />
          </Form>
        })
      }
    </div>
  }
}

export default Interests;