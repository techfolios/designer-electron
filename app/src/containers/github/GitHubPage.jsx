import React from 'react';
import { Button, Form, Segment, Container, Icon } from 'semantic-ui-react';
import Oauth from '../../utilities/Oauth';

class GitHubPage extends React.Component {
  constructor(props) {
    super(props);

    if (!window.localStorage.getItem('githubtoken')) {
      this.state = {
        isLoggedIn: false,
        remoteURL: this.props.io.remoteURL,
        username: this.props.io.username,
      };
    } else {
      this.state = {
        isLoggedIn: true,
        remoteURL: this.props.io.remoteURL,
        username: this.props.io.username,
      };
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePull = this.handlePull.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateURL = this.handleUpdateURL.bind(this);
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

  handlePull() {
    this.props.onPull();
  }

  handleChange(e, key) {
    const state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  handleUpdateURL(e) {
    e.preventDefault();
    this.props.onUpdateURL(this.state.remoteURL);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let logButton = null;
    let uploadButton = null;
    let downloadButton = null;
    let saveButton = null;

    if (!isLoggedIn) {
      logButton = (
        <Button size='small' color='green' onClick={this.login}>
          <Icon size='large' name='github' />
          Login with GitHub
        </Button>
      );
      uploadButton = (
        <Button size='small' color='grey'>
          <Icon size='large' name='upload' />
            Upload to GitHub
        </Button>
      );
      downloadButton = (
        <Button size='small' color='grey'>
          <Icon size='large' name='download' />
            Download from GitHub
        </Button>
      );
      saveButton = (
          <Form.Button color='grey' type="Submit">Save Remote URL</Form.Button>
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
      downloadButton = (
        <Button size='small' color='green' onClick={this.handlePull}>
          <Icon size='large' name='download' />
            Download from GitHub
        </Button>
      );
      saveButton = (
          <Form.Button positive type="Submit" onClick={this.handleUpdateURL}>Save Remote URL</Form.Button>
      );
    }

    return (
      <Container fluid>
        <h1>GitHub</h1>
        <Segment>
          <h3>Username: {this.state.username}</h3>
          {logButton}
        </Segment>
        <Segment>
        <Form>
          <Form.Group>
            <Form.Input
              label={'Remote URL'}
              width={12}
              type="text"
              defaultValue={this.state.remoteURL}
              placeholder={'Remote URL'}
              onChange={e => this.handleChange(e, 'remoteURL')}
            />
          </Form.Group>
        </Form>
          {saveButton}
        </Segment>
        <Segment>
        {uploadButton}
        {downloadButton}
        </Segment>
      </Container>
    );
  }
}

export default GitHubPage;
