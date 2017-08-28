import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHighlightChange = this.handleHighlightChange.bind(this);
    this.addHighlight = this.addHighlight.bind(this);
    this.removeHighlight = this.removeHighlight.bind(this);
  }

  componentDidMount() {
    $('.iconic').each((_, e) => {
      const words = $(e).data().text.split(' ');
      let icon = 'laptop';

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
    if (key === 'company') {
      const val = e.target.value;
      let icon = 'laptop';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#work-${index}`)[0].className = `teal icon ${icon}`;
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
      company: '',
      position: '',
      website: '',
      startDate: '',
      endDate: '',
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
      {this.state.data.map((work, index) => <Segment basic key={index}>
        <Form.Group>
          <Form.Input
            width={8}
            label={<span data-position="bottom center" data-tooltip={work.company}>
              <Icon data-text={work.company} className={'iconic'} id={`work-${index}`} color="teal" name={'laptop'} />
              Organization
            </span>}
            defaultValue={work.company}
            placeholder='Company'
            onChange={e => this.handleChange(e, 'company', index)} />
          <Form.Input
            width={8}
            label='Position'
            defaultValue={work.position}
            placeholder="Position"
            onChange={e => this.handleChange(e, 'position', index)} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={4}
            label='End Date'
            defaultValue={work.endDate}
            placeholder="01/01/9999"
            onChange={e => this.handleChange(e, 'endDate', index)} />
          <Form.Input
            width={4}
            label='Start Date'
            defaultValue={work.startDate}
            placeholder='01/01/1970'
            onChange={e => this.handleChange(e, 'startDate', index)} />
          <Form.Input
            width={8}
            label='Website'
            defaultValue={work.website}
            placeholder="www.exampleco.com"
            onChange={e => this.handleChange(e, 'website', index)}
          />
        </Form.Group>
        <Form.Input
          label='Summary'
          defaultValue={work.summary}
          placeholder="Lead developer for weather sensing project"
          onChange={e => this.handleChange(e, 'summary', index)}
        />
        {work.highlights.map((highlight, hindex) =>
          <div key={`div:${hindex}`}>
            <Form.Input
              className="highlight"
              key={hindex}
              label='Highlight'
              value={highlight}
              placeholder="Design firmware for distributed weather sensor network"
              onChange={e => this.handleHighlightChange(e, 'highlights', index, hindex)}
            />
            <Icon key={`remove:${hindex}`} data-index={index} data-hindex={hindex} link name="minus"
              onClick={this.removeHighlight}></Icon>
            {(work.highlights.length - 1 === hindex) &&
              <Icon data-index={index} link name="plus" color="teal" onClick={this.addHighlight}></Icon>
            }
          </div>)}
        {(work.highlights.length === 0) &&
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

export default Work;
