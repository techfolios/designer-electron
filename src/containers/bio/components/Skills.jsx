import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

class Skills extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('education', state);
  }

  render() {
    return <div>
      {this.state.data.map((skill, index) => {
          return <div key={index}>
            <Header as="h3">{skill.name}</Header>
            <Form.Group>
              <Form.Input label='Level'
                defaultValue={skill.level}
                placeholder={"Diamond"}
                onChange={(e) => this.handleChange(e, 'level', index)} />
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