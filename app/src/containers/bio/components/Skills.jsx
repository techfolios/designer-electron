import React from 'react';
import { Icon, Form, Segment, Header } from 'semantic-ui-react';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    const data = this.state.data;
    data[index][key] = e.target.value;
    this.setState({ data });
  }

  add() {
    const data = this.state.data;
    data.push({
      name: '',
      level: '',
      keywords: [],
    });
    this.setState({ data });
  }

  remove() {
    const data = this.state.data;
    data.pop();
    this.setState({ data });
  }

  render() {
    return <div>
      {this.state.data.map((skill, index) => <div key={index}>
        <Form.Input label='Name'
          defaultValue={skill.name}
          placeholder={'Hacky Sack'}
          onChange={e => this.handleChange(e, 'name', index)} />
        <Form.Group>
          <Form.Input label='Level'
            defaultValue={skill.level}
            placeholder={'Diamond'}
            onChange={e => this.handleChange(e, 'level', index)} />
          <Form.Dropdown multiple label='Keywords'
            options={
              skill.keywords.map((keyword, index) => ({
                key: index,
                value: keyword,
                text: keyword,
              }))
            } />
        </Form.Group>
      </div>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Skills;
