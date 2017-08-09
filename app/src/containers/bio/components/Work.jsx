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
      {this.state.data.map((work, index) => <Segment key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={`${work.company} ${work.position}`} data-position="bottom center">
            <i className={`laptop icon ${work.company}`}></i>
            {work.company}
          </span>
        </h2>
        <Form.Group>
          <Form.Input
            width={8}
            label='Company'
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
            onChange={e => this.handleChange(e, 'website', index)} />
        </Form.Group>
        <Form.Input label='Summary'
          defaultValue={work.summary}
          placeholder="Lead developer for weather sensing project"
          onChange={e => this.handleChange(e, 'summary', index)} />
        {work.highlights.map((highlight, hindex) => <Form.Input key={hindex}
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

export default Work;
