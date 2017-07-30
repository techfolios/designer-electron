import React from 'react';
import { Form } from 'semantic-ui-react';


class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (<div>
      <Form.Group>
        <Form.Input label='Name'
          defaultValue={this.state.name}
          placeholder={'John Smith'}
          onChange={e => this.props.handleChange(e, 'name')}
        />
        <Form.Input label='Label'
          defaultValue={this.state.label}
          placeholder={'Student'}
          onChange={e => this.props.handleChange(e, 'label')} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='Phone Number'
          defaultValue={this.state.phone}
          placeholder={'+1-808-867-5309'}
          onChange={e => this.props.handleChange(e, 'phone')} />
        <Form.Input label='E-Mail'
          defaultValue={this.state.email}
          placeholder='jsmith@example.com'
          onChange={e => this.props.handleChange(e, 'email')} />
      </Form.Group>
      <Form.Input label='Website'
        width={9}
        defaultValue={this.state.website}
        placeholder="https://www.example.com"
        onChange={e => this.props.handleChange(e, 'website')} />
      <Form.Input label='Picture'
        defaultValue={this.state.picture}
        placeholder="https://www.example.com"
        onChange={e => this.props.handleChange(e, 'picture')} />
      <Form.TextArea label='Summary'
        defaultValue={this.state.summary}
        placeholder="Once upon a midnight dreary, while I pondered weak and weary..."
        onChange={e => this.props.handleChange(e, 'summary')} />
    </div>);
  }
}

export default Contact;
