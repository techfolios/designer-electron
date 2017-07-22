import React from 'react';
import { Icon, Form, Segment } from 'semantic-ui-react';

class Interests extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('interests', state);
  }
  handleAddition(e, obj) {
    const data = this.state.data;
    const index = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
    data[index].keywords.push(obj.value);
    this.setState({
      data: data
    });
  }

  add(){
    let data = this.state.data;
    data.push({
      name: '',
      keywords: ['']
    });
    this.props.onChange('interests', data);
  }

  remove(){
    let data = this.state.data;
    data.pop();
    this.props.onChange('interests', data);
  }

  render() {
    return <div>
      {this.state.data.map((interest, index) => {
        return <div key={index}>
            <Form.Input label='Name'
              defaultValue={interest.name}
              placeholder={"Programming"}
              onChange={(e) => this.handleChange(e, 'name', index)} />
              <Form.Dropdown data-index={index} className="dropdown" multiple search selection fluid allowAdditions label='Keywords'
                defaultValue={interest.keywords}
                options={
                  interest.keywords.map((item, index) => {
                    return {
                      key: index,
                      value: item,
                      text: item
                    }
                  })
                }
                onAddItem={this.handleAddition}
              />
          </div>
        })
      }

      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>
  }
}

export default Interests;
