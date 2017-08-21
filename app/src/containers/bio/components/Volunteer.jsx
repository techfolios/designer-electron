import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

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
    if (key === 'organization') {
      const val = e.target.value;
      let icon = 'world';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#volunteer-${index}`)[0].className = `teal icon ${icon}`;
    }
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
      {this.state.data.map((volunteer, index) => <Segment basic key={index}>
        <Form.Group>
          <Form.Input
            width={8}
            label={<span data-position="bottom center" data-tooltip={volunteer.organization}>
              <Icon id={`volunteer-${index}`} color="teal" name={'world'} />
              Organization
            </span>}
            defaultValue={volunteer.organization}
            placeholder='Organization'
            onChange={e => this.handleChange(e, 'organization', index)} />
          <Form.Input
            width={8}
            label='Position'
            defaultValue={volunteer.position}
            placeholder='Position'
            onChange={e => this.handleChange(e, 'position', index)} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={4}
            label='Start Date'
            defaultValue={volunteer.startDate}
            placeholder='01/01/1970'
            onChange={e => this.handleChange(e, 'startDate', index)} />
          <Form.Input
            width={4}
            label='End Date'
            defaultValue={volunteer.endDate}
            placeholder="01/01/9999"
            onChange={e => this.handleChange(e, 'endDate', index)} />
          <Form.Input
            width={8}
            label='Website'
            defaultValue={volunteer.website}
            placeholder="Website"
            onChange={e => this.handleChange(e, 'website', index)} />
        </Form.Group>
        <Form.Input label='Summary'
          defaultValue={volunteer.summary}
          placeholder="Summary"
          onChange={e => this.handleChange(e, 'summary', index)} />
        {volunteer.highlights.map((highlight, hindex) => <Form.Input key={hindex}
          label='Highlights'
          defaultValue={highlight}
          placeholder="Highlights"
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
