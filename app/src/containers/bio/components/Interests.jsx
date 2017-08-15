import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

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

  handleChange(e, key, index) {
    const state = this.state.data;
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
          <h2 className="ui horizontal divider header">
            <span data-tooltip={interest.keywords.join(', ')} data-position="bottom center">
              <i className={`idea icon ${interest.name}`}></i>
              {interest.name}
            </span>
          </h2>
          <Form.Group>
            <Form.Input
              label='Name'
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
