import React from 'react';
// import { Segment, Header } from 'semantic-ui-react';
import { Icon, Form } from 'semantic-ui-react';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(e, key, index) {
    const state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('skills', state);
  }
  handleAddition(e, obj) {
    const data = this.state.data;
    const index = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
    data[index].keywords.push(obj.value);
    this.setState({
      data,
    });
  }

  add() {
    const data = this.state.data;
    data.push({
      name: '',
      level: '',
      keywords: [''],
    });
    this.props.onChange('skills', data);
  }

  remove() {
    const data = this.state.data;
    data.pop();
    this.props.onChange('skills', data);
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
          <Form.Dropdown data-index={index} className="dropdown"
            multiple search selection fluid allowAdditions label='Keywords'
            defaultValue={skill.keywords}
            options={
              skill.keywords.map((keyword, index2) => ({
                key: index2,
                value: keyword,
                text: keyword,
              }))
            }
            onAddItem={this.handleAddition}
          />
        </Form.Group>
      </div>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Skills;
