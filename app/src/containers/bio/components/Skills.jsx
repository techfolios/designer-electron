import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

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
      {this.state.data.map((skill, index) => <Segment basic key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={skill.keywords.join(', ')} data-position="bottom center">
            <i className={`wizard icon ${skill.name}`}></i>
            {skill.name}
          </span>
        </h2>
        <Form.Group>
          <Form.Input
            width={4}
            label='Name'
            defaultValue={skill.name}
            placeholder={'Name'}
            onChange={e => this.handleChange(e, 'name', index)} />
          <Form.Dropdown
            width={12}
            data-index={index}
            className="dropdown"
            multiple
            search
            selection
            fluid
            allowAdditions
            label='Keywords'
            defaultValue={skill.keywords}
            noResultsMessage={'Start typing to add a new keyword!'}
            options={
              skill.keywords.map((keyword, key) => ({
                key,
                value: keyword,
                text: keyword,
              }))
            }
            onAddItem={this.handleAddition}
          />
        </Form.Group>
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Skills;
