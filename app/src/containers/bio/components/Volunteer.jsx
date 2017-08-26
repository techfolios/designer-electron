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
    this.handleHighlightChange = this.handleHighlightChange.bind(this);
    this.addHighlight = this.addHighlight.bind(this);
    this.removeHighlight = this.removeHighlight.bind(this);
  }

  componentDidMount() {
    $('.iconic').each((_, e) => {
      const words = $(e).data().text.split(' ');
      let icon = 'world';

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(e)[0].className = `teal icon ${icon}`;
    });
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
  addHighlight(e) {
    const data = this.state.data;
    const index = e.currentTarget.getAttribute('data-index');
    data[index].highlights.push('');
    this.setState({ data });
  }
  removeHighlight(e) {
    const data = this.state.data;
    const index = e.currentTarget.getAttribute('data-index');
    const hindex = e.currentTarget.getAttribute('data-hindex');
    data[index].highlights.splice(hindex, 1);
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
              <Icon
                data-text={volunteer.organization}
                className="iconic"
                id={`volunteer-${index}`}
                color="teal"
                name={'world'}
              />
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
        {volunteer.highlights.map((highlight, hindex) =>
          <div key={`div:${hindex}`}>
            <Form.Input
              key={hindex}
              className="highlight"
              label='Highlights'
              value={highlight}
              placeholder="Highlights"
              onChange={e => this.handleHighlightChange(e, 'highlights', index, hindex)}
            />
            <Icon key={`remove:${hindex}`} data-index={index} data-hindex={hindex} link name="minus"
              onClick={this.removeHighlight}></Icon>
            {(volunteer.highlights.length - 1 === hindex) &&
              <Icon data-index={index} link name="plus" color="teal" onClick={this.addHighlight}></Icon>
            }
          </div>)
        }
        {(volunteer.highlights.length === 0) &&
          <span data-position="bottom center" data-tooltip="Add a highlight">
            <Icon data-index={index} link name="plus" color="teal" onClick={this.addHighlight}></Icon>
          </span>
        }
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Volunteer;
