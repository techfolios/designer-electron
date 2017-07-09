import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

class Skills extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return <div>
      {this.state.data.map((skill) => {
          return <div>
            <Header as="h3">{skill.name}</Header>
            <Form.Group>
              <Form.Input label='Level'
                defaultValue={skill.level}
                placeholder={"Diamond"}
                onChange={(event) => skill.level = event.target.value} />
              <Form.Dropdown multiple label='Keywords'
                options={
                  skill.keywords.map((keyword, index) => {
                    return {
                      key: index,
                      value: keyword,
                      text: keyword,
                    }
                  })
                } />
            </Form.Group>
          </div>
        })
      }
    </div>
  }
}

export default Skills;