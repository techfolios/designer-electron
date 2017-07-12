import React from 'react';
import { Icon, Form, Segment } from 'semantic-ui-react';

class Voulnteer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    let data = this.state.data;
    data[index][key] = e.target.value;
    this.props.onChange('volunteer', data);
  }

  handleHighlightChange(e, key, windex, hindex) {
    let data = this.state.data;
    data[windex][key][hindex] = e.target.value;
    this.props.onChange('volunteer', data);
  }

  add() {
    let data = this.state.data;
    data.push({
      organization:'',
      position: '',
      startDate: '',
      endDate: '',
      website: '',
      summary: '',
      highlights:['']
    });
    this.props.onChange('volunteer', data);    
  }

  remove() {
    let data = this.state.data;
    data.pop();
    this.props.onChange('volunteer', data);
  }

  render() {
    return <div>
      {this.state.data.map((volunteer, index) => {
        return <Segment key={index}>
          <Form.Input label='Organization'
            defaultValue={volunteer.organization}
            placeholder='Example High School'
            onChange={(e) => this.handleChange(e, 'organization', index)} />
          <Form.Input label='position'
            defaultValue={volunteer.position}
            placeholder="Example Specialist"
            onChange={(e) => this.handleChange(e, 'position', index)} />
          <Form.Group>
            <Form.Input label='Start Date'
              defaultValue={volunteer.startDate}
              placeholder='01/01/1970'
              onChange={(e) => this.handleChange(e, 'startDate', index)} />
            <Form.Input label='End Date'
              defaultValue={volunteer.endDate}
              placeholder="01/01/9999"
              onChange={(e) => this.handleChange(e, 'endDate', index)} />
          </Form.Group>
          <Form.Input label='Website'
            defaultValue={volunteer.website}
            placeholder="https://www.example.org"
            onChange={(e) => this.handleChange(e, 'website', index)} />
          <Form.Input label='Summary'
            defaultValue={volunteer.summary}
            placeholder="Lead developer for weather sensing project"
            onChange={(e) => this.handleChange(e, 'summary', index)} />
          {volunteer.highlights.map((highlight, hindex) => {
              return <Form.Input key={hindex}
                label='Highlights'
                defaultValue={highlight}
                placeholder="Design firmware for distributed weather sensor network"
                onChange={(e) => this.handleHighlightChange(e, 'highlights', index, hindex)} />
            })
          }
        </Segment>
      })
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>                                  
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>
  }
}

export default Voulnteer;