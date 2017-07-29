import React from 'react';
import { Icon, Segment, Header } from 'semantic-ui-react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    return <Segment piled>
      <Segment basic textAlign="center">
        <Icon name="write" size="big"/>
        <Header as="h3">User login page</Header>
      </Segment>
      <Form.Input label='Username'
        defaultValue={this.state.name}
        placeholder={'John Smith'}
        onChange={e => this.handleChange(e, 'name')}
      />
    </Segment>;
  }
}

export default User;
