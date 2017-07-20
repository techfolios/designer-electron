import React from 'react';
// import { Segment } from 'semantic-ui-react';
import { Icon, Form } from 'semantic-ui-react';

class Interests extends React.Component {
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
      {this.state.data.map((interest, index) => <div key={index}>
        <Form.Input label='Name'
          defaultValue={interest.name}
          placeholder={'Programming'}
          onChange={e => this.handleChange(e, 'name', index)} />
        <Form.Dropdown multiple label='Keywords'
          options={
            interest.keywords.map((item, index) => ({
              key: index,
              value: item,
              text: item,
            }))
          } />
      </div>)
      }

      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Interests;
