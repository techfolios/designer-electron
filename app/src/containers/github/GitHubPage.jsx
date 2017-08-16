import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';
import Oauth from '../../utilities/Oauth';

class GitHubPage extends React.Component {
  constructor(props) {
    super(props);

    if (!window.localStorage.getItem('githubtoken')) {
      this.state = { isLoggedIn: false };
    } else {
      this.state = { isLoggedIn: true };
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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

  handleUpload() {
    this.props.onUpload();
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let logButton = null;
    let uploadButton = null;

    if (!isLoggedIn) {
      logButton = (
        <Button size='small' color='green' onClick={this.login}>
          <Icon size='large' name='github' />
          Login with GitHub
        </Button>
      );
      uploadButton = (
        <Button size='small' color='grey'>
            Upload to GitHub
        </Button>
      );
    } else {
      logButton = (
        <Button size='small' color='green' onClick={this.logout}>
          Logout
        </Button>
      );
      uploadButton = (
        <Button size='small' color='green' onClick={this.handleUpload}>
          <Icon size='large' name='upload' />
            Upload to GitHub
        </Button>
      );
    }

    return (
      <Container fluid>
        <h1>Settings</h1>
        {logButton}
        <p></p>
        {uploadButton}
      </Container>
    );
  }
}

export default GitHubPage;
