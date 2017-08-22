import React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/dist/commonjs/lib/SUI';
import $ from 'jquery';

class References extends React.Component {
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
      let icon = 'checkmark';

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
    if (key === 'name') {
      const val = e.target.value;
      let icon = 'checkmark';
      const words = val.split(' ');

      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (ALL_ICONS_IN_ALL_CONTEXTS.indexOf(word.toLowerCase()) > -1) {
          icon = word;
        }
      }
      $(`#reference-${index}`)[0].className = `teal icon ${icon}`;
    }
    data[index][key] = e.target.value;
    this.setState({ data });
  }

  add() {
    const data = this.state.data;
    data.push({
      name: '',
      reference: '',
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
      {this.state.data.map((reference, index) => <Segment basic key={index}>
        <Form.Group>
          <Form.Input
            width={8}
            label={<span data-position="bottom center" data-tooltip={reference.name}>
              <Icon data-text={reference.name} className="iconic" id={`reference-${index}`} color="teal" name={'checkmark'} />
              Name
            </span>}
            defaultValue={reference.name}
            placeholder={'Name'}
            onChange={e => this.handleChange(e, 'name', index)} />
          <Form.Input
            width={8}
            label='Reference'
            defaultValue={reference.reference}
            placeholder={'Reference'}
            onChange={e => this.handleChange(e, 'reference', index)} />
        </Form.Group>
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default References;
