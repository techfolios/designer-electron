import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

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

  componentDidMount() {
    $('.iconic').each(function () {
      const words = $(this).data().text.split(' ');
      let icon = 'wizard';

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(this)[0].className = `teal icon ${icon}`;
    });
  }

  handleChange(e, key, index) {
    const state = this.state.data;
    if (key === 'name') {
      const val = e.target.value;
      let icon = 'wizard';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#skill-${index}`)[0].className = `teal icon ${icon}`;
    }
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
        <Form.Group>
          <Form.Input
            width={4}
            label={<span data-position="bottom center" data-tooltip={skill.name}>
              <Icon data-text={skill.name} className="iconic" id={`skill-${index}`} color="teal" name={'wizard'} />
              Name
            </span>}
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
