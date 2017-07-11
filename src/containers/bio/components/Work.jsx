import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class Work extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('work', state);
  }

  handleHighlightChange(e, key, windex, hindex) {
    let state = this.state.data;
    state[windex][key][hindex] = e.target.value;
    this.props.onChange('work', state);
  }

  render() {
    return <div>
      {this.state.data.map((work, index) => {
        return <Segment key={index}>
          <Form.Input label='Company'
            defaultValue={work.company}
            placeholder='Example Co.'
            onChange={(e) => this.handleChange(e, 'company', index)} />
          <Form.Input label='Position'
            defaultValue={work.position}
            placeholder="Example Specialist"
            onChange={(e) => this.handleChange(e, 'position', index)} />
          <Form.Group>
            <Form.Input label='End Date'
              defaultValue={work.endDate}
              placeholder="01/01/9999"
              onChange={(e) => this.handleChange(e, 'endDate', index)} />
            <Form.Input label='Start Date'
              defaultValue={work.startDate}
              placeholder='01/01/1970'
              onChange={(e) => this.handleChange(e, 'startDate', index)} />
          </Form.Group>
          <Form.Input label='website'
            defaultValue={work.website}
            placeholder="www.exampleco.com"
            onChange={(e) => this.handleChange(e, 'website', index)} />
          <Form.Input label='Summary'
            defaultValue={work.summary}
            placeholder="Lead developer for weather sensing project"
            onChange={(e) => this.handleChange(e, 'summary', index)} />
          {work.highlights.map((highlight, hindex) => {
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
    </div>
  }
}

export default Work;