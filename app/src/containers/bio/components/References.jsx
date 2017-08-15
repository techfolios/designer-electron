import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class References extends React.Component {
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
      reference: '',
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
      {this.state.data.map((reference, index) => <Segment basic key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={`${reference.name}`} data-position="bottom center">
            <i className={'checkmark icon'}></i>
            {reference.name}
          </span>
        </h2>
        <Form.Group>
          <Form.Input
            width={8}
            label='Name'
            defaultValue={reference.name}
            placeholder={'Name'}
            onChange={e => this.handleChange(e, 'name', index)} />
          <Form.Input
            width={8}
            label='Reference'
            defaultValue={reference.reference}
            placeholder={'Reference'}
            onChange={e => this.handleChange(e, 'reference', index)} />
        </Form.Group>
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default References;
