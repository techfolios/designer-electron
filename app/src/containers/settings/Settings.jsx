import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';
import Oauth from '../../utilities/Oauth';

class Settings extends React.Component {
  constructor() {
    super();

    if (!window.localStorage.getItem('githubtoken')) {
      this.state = { isLoggedIn: false };
    } else {
      this.state = { isLoggedIn: true };
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  login() {
    Oauth.login();
    this.setState({ isLoggedIn: true });
  }

  logout() {
    Oauth.logout();
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;

    if (!isLoggedIn) {
      button = (
        <Button size='small' color='green' onClick={this.login}>
          <Icon size='large' name='github' />
          Login with GitHub
        </Button>
      );
    } else {
      button = (
        <Button size='small' onClick={this.logout}>
          Logout
        </Button>
      );
    }

    return (
      <Container fluid>
      <h1>Settings</h1>
        {button}
      </Container>
    );
  }
}

export default Settings;
