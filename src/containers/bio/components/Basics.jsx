import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

class Basics extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return <Form>
      <Form.Group>
        <Form.Input label='Name'
          defaultValue={this.state.data.name}
          placeholder={"John Smith"}
          onChange={(event) => this.setState({ data: { name: event.target.value } })} />
        <Form.Input label='Label'
          defaultValue={this.state.data.label}
          placeholder={'Student'}
          onChange={(event) => this.setState({ label: event.target.value })} />
        <Form.Input label='Phone Number'
          defaultValue={this.state.data.phone}
          placeholder={'+1-808-867-5309'}
          onChange={(event) => this.setState({ phone: event.target.value })} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='E-Mail'
          defaultValue={this.state.data.email}
          placeholder='jsmith@example.com'
          onChange={(event) => this.setState({ email: event.target.value })} />
        <Form.Input label='Website'
          width={9}
          defaultValue={this.state.data.website}
          placeholder="https://www.example.com"
          onChange={(event) => this.setState({ website: event.target.value })} />
      </Form.Group>
      <Form.Input label='Picture'
        defaultValue={this.state.data.picture}
        placeholder="https://www.example.com"
        onChange={(event) => this.setState({ website: event.target.value })} />
      <Form.TextArea label='Summary'
        defaultValue={this.state.data.summary}
        placeholder="Once upon a midnight dreary, while I pondered weak and weary..."
        onChange={(event) => this.setState({ summary: event.target.value })} />
    </Form>
  }
}

export default Basics;