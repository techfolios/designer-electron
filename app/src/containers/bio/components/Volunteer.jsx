import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class Volunteer extends React.Component {
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

  handleHighlightChange(e, key, windex, hindex) {
    const data = this.state.data;
    data[windex][key][hindex] = e.target.value;
    this.setState({ data });
  }

  add() {
    const data = this.state.data;
    data.push({
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      website: '',
      summary: '',
      highlights: [''],
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
      {this.state.data.map((volunteer, index) => <Segment key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={`${volunteer.organization} ${volunteer.position}`} data-position="bottom center">
            <i className={`world icon ${volunteer.organization}`}></i>
            {volunteer.organization}
          </span>
        </h2>
        <Form.Input label='Organization'
          defaultValue={volunteer.organization}
          placeholder='Example High School'
          onChange={e => this.handleChange(e, 'organization', index)} />
        <Form.Input label='Position'
          defaultValue={volunteer.position}
          placeholder="Example Specialist"
          onChange={e => this.handleChange(e, 'position', index)} />
        <Form.Group>
          <Form.Input label='Start Date'
            defaultValue={volunteer.startDate}
            placeholder='01/01/1970'
            onChange={e => this.handleChange(e, 'startDate', index)} />
          <Form.Input label='End Date'
            defaultValue={volunteer.endDate}
            placeholder="01/01/9999"
            onChange={e => this.handleChange(e, 'endDate', index)} />
        </Form.Group>
        <Form.Input label='Website'
          defaultValue={volunteer.website}
          placeholder="https://www.example.org"
          onChange={e => this.handleChange(e, 'website', index)} />
        <Form.Input label='Summary'
          defaultValue={volunteer.summary}
          placeholder="Lead developer for weather sensing project"
          onChange={e => this.handleChange(e, 'summary', index)} />
        {volunteer.highlights.map((highlight, hindex) => <Form.Input key={hindex}
          label='Highlights'
          defaultValue={highlight}
          placeholder="Design firmware for distributed weather sensor network"
          onChange={e => this.handleHighlightChange(e, 'highlights', index, hindex)} />)
        }
        <br />
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Volunteer;
