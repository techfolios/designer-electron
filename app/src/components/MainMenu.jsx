import React from 'react';
// import { Segment } from 'semantic-ui-react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';

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

  renderBio(activeItem) {
    return (
      <Accordion>
        <Accordion.Title>
          <Menu.Item name='bioMenu'>
            <Icon name='dropdown' />
            <Icon name='user circle' />
            Bio
          </Menu.Item>
        </Accordion.Title>
        <Accordion.Content>
          <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} >
            Profile Basics
          </Menu.Item>
          <Menu.Item name='educationSection' active={activeItem === 'educationSection'} onClick={this.handleItemClick} >
            Education
          </Menu.Item>
          <Menu.Item name='workSection' active={activeItem === 'workSection'} onClick={this.handleItemClick} >
            Work & Volunteer
          </Menu.Item>
        </Accordion.Content>
      </Accordion>
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
