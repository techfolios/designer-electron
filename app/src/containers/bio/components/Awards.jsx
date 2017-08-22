import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

class Awards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    $('.iconic').each(function (i, e, a) {
      const words = $(e).data().text.split(' ');
      let icon = 'trophy';

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
    if (key === 'title') {
      const val = e.target.value;
      let icon = 'trophy';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#award-${index}`)[0].className = `teal icon ${icon}`;
    }
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
        <Form.Group>
          <Form.Input
            width={6}
            label={<span data-position="bottom center" data-tooltip={award.title}>
              <Icon data-text={award.title} className="iconic" id={`award-${index}`} color="teal" name={'trophy'} />
              Title
            </span>}
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
