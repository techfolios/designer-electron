import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const electronOauth2 = require('electron-oauth2');
const config = require('../../config.js');

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

  logout() {
    window.localStorage.removeItem('githubtoken');
    this.setState({ isLoggedIn: false });
  }

  login() {
    let token;

    const windowParams = {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
      },
    };
    const scopes = ['repo', 'user:email'];

    const options = {
      scope: scopes.join(' '),
      accessType: 'online',
    };

    const myApiOauth = electronOauth2(config, windowParams);

    myApiOauth.getAccessToken(options)
      .then((t) => {
        token = t;
        window.localStorage.setItem('githubtoken', token.access_token);
        this.setState({ isLoggedIn: true });
      });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;

    if (!isLoggedIn) {
      button = (
        <Button size='small' onClick={this.login}>
          Login
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
