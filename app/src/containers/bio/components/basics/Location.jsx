import React from 'react';
import { Form, Container } from 'semantic-ui-react';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
    <Container textAlign="center">
      <Form.Group>
        <Form.Input
          label={'Address'}
          width={16}
          defaultValue={this.state.address}
          placeholder={'Address'}
          onChange={e => this.props.handleChange(e, 'address')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          label={'City'}
          width={4}
          defaultValue={this.state.city}
          placeholder={'City'}
          onChange={e => this.props.handleChange(e, 'city')}
        />
        <Form.Input
          label={'Postal Code'}
          width={4}
          defaultValue={this.state.postalCode}
          placeholder={'Postal Code'}
          onChange={e => this.props.handleChange(e, 'postalCode')}
        />
        <Form.Input
          label={'Country Code'}
          width={4}
          defaultValue={this.state.countryCode}
          placeholder={'Country Code'}
          onChange={e => this.props.handleChange(e, 'countryCode')}
        />
        <Form.Input
          label={'Region'}
          width={4}
          defaultValue={this.state.region}
          placeholder={'Region'}
          onChange={e => this.props.handleChange(e, 'region')}
        />
      </Form.Group>
    </Container>);
  }
}

export default Location;
