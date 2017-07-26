import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { request } from 'superagent';


class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    // this.handleItemClick = this.handleItemClick.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  logout() {
    console.log(this);
  }

  render() {
    return (
      <Container fluid>
      <h1>Settings</h1>
        <Button size='small' onClick={this.logout}>
          Logout
        </Button>
      </Container>
    );
  }
}

export default Settings;
