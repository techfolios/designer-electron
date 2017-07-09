import React from 'react';
import { Form } from 'semantic-ui-react';

class Awards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('volunteer', state);
  }

  render() {
    return <div>
      {this.state.data.map((award, index) => {
          return <div key={index}>
            <Form.Input label='Name'
              defaultValue={award.title}
              placeholder={"Example Award"}
              onChange={(e) => this.handleChange(e, 'title', index)} />
            <Form.Input label='Date'
              defaultValue={award.date}
              placeholder={'2015-Present'}
              onChange={(e) => this.handleChange(e, 'date', index)} />
            <Form.Input label='Phone Number'
              defaultValue={award.awarder}
              placeholder={'State of Hawaii'}
              onChange={(e) => this.handleChange(e, 'awarder', index)} />
            <Form.TextArea label='Summary'
              defaultValue={award.summary}
              placeholder={'My team won first place in 2015. See my partfolio site for more details.'}
              onChange={(e) => this.handleChange(e, 'summary', index)} />
          </div>
        })
      }
    </div>
  }
}

export default Awards;