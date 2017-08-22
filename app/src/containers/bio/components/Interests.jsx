import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

class Interests extends React.Component {
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
    $('.iconic').each(function (i, e, a) {
      const words = $(e).data().text.split(' ');
      let icon = 'idea';

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(e)[0].className = `teal icon ${icon}`;
    });
  }

  handleChange(e, key, index) {
    const state = this.state.data;
    if (key === 'name') {
      const val = e.target.value;
      let icon = 'idea';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#interest-${index}`)[0].className = `teal icon ${icon}`;
    }
    state[index][key] = e.target.value;
    this.props.onChange('interests', state);
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
      keywords: [],
    });
    this.props.onChange('interests', data);
  }

  remove() {
    const data = this.state.data;
    data.pop();
    this.props.onChange('interests', data);
  }

  render() {
    return <div>
      {this.state.data.map((interest, index) => <Segment basic key={index}>
        <div>
          <Form.Group>
            <Form.Input
              label={<span data-position="bottom center" data-tooltip={interest.name}>
                <Icon data-text={interest.name} className="iconic" id={`interest-${index}`} color="teal" name={'idea'} />
                Name
              </span>}
              width={4}
              defaultValue={interest.name}
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
              defaultValue={interest.keywords}
              noResultsMessage={'Start typing to add a new keyword!'}
              options={
                interest.keywords.map((item, key) => ({
                  key,
                  value: item,
                  text: item,
                }))
              }
              onAddItem={this.handleAddition}
            />
          </Form.Group>
        </div>
      </Segment>)
      }

      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Interests;
