import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

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
              <Icon name={`world ${work.company}`} />
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
              key={hindex}
              label='Highlight'
              defaultValue={highlight}
              placeholder="Design firmware for distributed weather sensor network"
              onChange={e => this.handleHighlightChange(e, 'highlights', index, hindex)}
            />
            <Icon key={`remove:${hindex}`} data-index={index} data-hindex={hindex} link name="minus"
                  onClick={this.removeHighlight}></Icon>
            {((work.highlights.length - 1 === hindex) || (work.highlights.length === 0)) &&
            <Icon data-index={index} link name="plus" color="teal" onClick={this.addHighlight}></Icon>}
          </div>)}
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Work;
