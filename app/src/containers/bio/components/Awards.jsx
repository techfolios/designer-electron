import React from 'react';
import { Icon, Form, Segment } from 'semantic-ui-react';

class Awards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('awards', state);
  }

  add() {
    let data = this.state.data;
    data.push({
      title:'',
      date: '',
      awarder: '',
      summary: '',
    });
    this.setState({data: data});    
    this.props.onChange('awards', data);    
  }

  remove() {
    let data = this.state.data;
    data.pop();
    this.setState({data: data});    
    this.props.onChange('awards', data);
  }

  render() {
    return <div>
      {this.state.data.map((award, index) => {
          return <Segment key={index}>
            <Form.Input label='Title'
              defaultValue={award.title}
              placeholder={"Example Award"}
              onChange={(e) => this.handleChange(e, 'title', index)} />
            <Form.Input label='Date'
              defaultValue={award.date}
              placeholder={'2015-Present'}
              onChange={(e) => this.handleChange(e, 'date', index)} />
            <Form.Input label='Phone Number'
              defaultValue={award.awarder}
              placeholder={'State of Hawaii'}
              onChange={(e) => this.handleChange(e, 'awarder', index)} />
            <Form.TextArea label='Summary'
              defaultValue={award.summary}
              placeholder={'My team won first place in 2015. See my partfolio site for more details.'}
              onChange={(e) => this.handleChange(e, 'summary', index)} />
          </Segment>
        })
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>                                  
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>
  }
}

export default Awards;