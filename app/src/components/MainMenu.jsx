import React from 'react';
// import { Segment } from 'semantic-ui-react';
import { Menu, Icon } from 'semantic-ui-react';

class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      activeItem: '',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  handleUpload(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onUpload();
    this.props.onMenuSelect(name);
  }

  renderSettings(activeItem) {
    return (
      <Menu.Item name='settings' active={activeItem === 'settings'} onClick={this.handleItemClick} >
        <Icon name='settings' />
        Settings
      </Menu.Item>
    );
  }

  renderBio(activeItem) {
    return (
      <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} >
        <Icon name='user circle' />
        Bio
      </Menu.Item>
    );
  }

  renderProjects(activeItem) {
    return (
      <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleItemClick} >
        <Icon name='cubes' />
        Projects
      </Menu.Item>
    );
  }

  renderEssays(activeItem) {
    return (
      <Menu.Item name='essays' active={activeItem === 'essays'} onClick={this.handleItemClick} >
        <Icon name='file text outline' />
        Essays
      </Menu.Item>
    );
  }

  renderUpload(activeItem) {
    return (
      <Menu.Item name='upload' active={activeItem === 'upload'} onClick={this.handleUpload} >
        <Icon name='upload' />
        Upload
      </Menu.Item>
    );
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu vertical fixed="left" icon='labeled' color="teal">
        {this.renderSettings(activeItem)}

        {this.renderBio(activeItem)}

        {this.renderProjects(activeItem)}

        {this.renderEssays(activeItem)}

        {this.renderUpload(activeItem)}

        <Menu.Item name='addItem' active={activeItem === 'addItem'} onClick={this.handleItemClick} >
          <Icon name='plus' />
          Add Menu Item
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
