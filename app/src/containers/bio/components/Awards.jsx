import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class Awards extends React.Component {
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

  add() {
    const data = this.state.data;
    data.push({
      title: '',
      date: '',
      awarder: '',
      summary: '',
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
      {this.state.data.map((award, index) => <Segment basic key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={`${award.title} ${award.date} ${award.awarder}`} data-position="bottom center">
            <i className={'trophy icon'}></i>
            {award.title}
          </span>
        </h2>
        <Form.Group>
          <Form.Input
            width={6}
            label='Title'
            defaultValue={award.title}
            placeholder={'Title'}
            onChange={e => this.handleChange(e, 'title', index)} />
          <Form.Input
            width={5}
            label='Date'
            defaultValue={award.date}
            placeholder={'Date'}
            onChange={e => this.handleChange(e, 'date', index)} />
          <Form.Input
            width={5}
            label='Awarder'
            defaultValue={award.awarder}
            placeholder={'Awarder'}
            onChange={e => this.handleChange(e, 'awarder', index)} />
          </Form.Group>
        <Form.TextArea
          label='Summary'
          defaultValue={award.summary}
          placeholder={'My team won first place in 2015. See my partfolio site for more details.'}
          onChange={e => this.handleChange(e, 'summary', index)} />
        <br />
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Awards;
