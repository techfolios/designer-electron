import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

class Basics extends React.Component{

  constructor(props) {
    super(props);
    this.state = props.data;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    let state = this.state;
    state[key] = e.target.value;
    this.props.onChange('basics',state);
  }

  render() {
    return <div>
      <Form.Group>
        <Form.Input label='Name'
          defaultValue={this.state.name}
          placeholder={"John Smith"}
          onChange={(e) => this.handleChange(e, 'name')} />
        <Form.Input label='Label'
          defaultValue={this.state.label}
          placeholder={'Student'}
          onChange={(e) => this.handleChange(e, 'label')} />
        <Form.Input label='Phone Number'
          defaultValue={this.state.phone}
          placeholder={'+1-808-867-5309'}
          onChange={(e) => this.handleChange(e, 'phone')} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='E-Mail'
          defaultValue={this.state.email}
          placeholder='jsmith@example.com'
          onChange={(e) => this.handleChange(e, 'email')} />
        <Form.Input label='Website'
          width={9}
          defaultValue={this.state.website}
          placeholder="https://www.example.com"
          onChange={(e) => this.handleChange(e, 'website')} />
      </Form.Group>
      <Form.Input label='Picture'
        defaultValue={this.state.picture}
        placeholder="https://www.example.com"
        onChange={(e) => this.handleChange(e, 'picture')} />
      <Form.TextArea label='Summary'
        defaultValue={this.state.summary}
        placeholder="Once upon a midnight dreary, while I pondered weak and weary..."
        onChange={(e) => this.handleChange(e, 'summary')} />
    </div>
  }
}

export default Basics;