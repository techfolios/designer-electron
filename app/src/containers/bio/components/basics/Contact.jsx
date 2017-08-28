import React from 'react';
import { Form, Container } from 'semantic-ui-react';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
      <Container>
        <Form.Group>
          <Form.Input
            label={'Name'}
            width={4}
            type="text"
            defaultValue={this.state.name}
            placeholder={'Name'}
            onChange={e => this.props.handleChange(e, 'name')}
          />
          <Form.Input
            label={'Title'}
            width={4}
            type="text"
            defaultValue={this.state.label}
            placeholder={'Label'}
            onChange={e => this.props.handleChange(e, 'label')} />
          <Form.Input
            label={'Phone Number'}
            width={4}
            type="tel"
            defaultValue={this.state.phone}
            placeholder={'Phone Number'}
            onChange={e => this.props.handleChange(e, 'phone')} />
          <Form.Input
            label={'Email'}
            width={4}
            type="email"
            defaultValue={this.state.email}
            placeholder={'E-Mail'}
            onChange={e => this.props.handleChange(e, 'email')} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label={'Website'}
            width={8}
            type="url"
            defaultValue={this.state.website}
            placeholder={'Website'}
            onChange={e => this.props.handleChange(e, 'website')} />
          <Form.Input
            label={'Picture'}
            width={8}
            type="url"
            defaultValue={this.state.picture}
            placeholder={'Picture'}
            onChange={e => this.props.handleChange(e, 'picture')} />
        </Form.Group>
        <Form.TextArea
          label={'Summary'}
          defaultValue={this.state.summary}
          placeholder={'Summary'}
          onChange={e => this.props.handleChange(e, 'summary')} />
      </Container>);
  }
}

export default Contact;
