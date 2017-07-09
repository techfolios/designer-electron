import React from 'react';
import { Form } from 'semantic-ui-react';

class Voulnteer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('volunteer', state);
  }

  handleHighlightChange(e, key, windex, hindex) {
    let state = this.state.data;
    state[windex][key][hindex] = e.target.value;
    this.props.onChange('volunteer', state);
  }

  render() {
    return <div>
      {this.state.data.map((volunteer, index) => {
        return <div key={index}>
          <Form.Group>
            <Form.Input label='Organization'
              defaultValue={volunteer.organization}
              placeholder='Example High School'
              onChange={(e) => this.handleChange(e, 'organization', index)} />
            <Form.Input label='Website'
              defaultValue={volunteer.website}
              placeholder="https://www.example.org"
              onChange={(e) => this.handleChange(e, 'website', index)} />
            <Form.Input label='position'
              defaultValue={volunteer.position}
              placeholder="Example Specialist"
              onChange={(e) => this.handleChange(e, 'position', index)} />
          </Form.Group>
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
        </div>
      })
      }
    </div>
  }
}

export default Voulnteer;