import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.bio;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, data) {
    const state = this.state;
    state[key] = data;
    this.setState(state);
  }

  render() {
    return (
      <Segment User>
        <Image centered src={this.state.basics.picture} size='small' shape='circular' />
        <Header>User login - coming soon</Header>
      </Segment>
    );
  }
}

export default User;
