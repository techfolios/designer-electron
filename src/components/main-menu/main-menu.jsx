import React from 'react';
import {Menu, Segment, Icon} from 'semantic-ui-react';

class MainMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: true,
      activeItem: 'bio' 
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted vertical fixed="left" icon='labeled'>
        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} >
          <Icon name='user circle'/>
          Bio    
        </Menu.Item>

        <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleItemClick} >
          <Icon name='cubes'/>
          Projects
        </Menu.Item>
        
        <Menu.Item name='resume' active={activeItem === 'resume'} onClick={this.handleItemClick} >
          <Icon name='file text outline'/>
          Resume
        </Menu.Item>

        <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} >
          <Icon name='linkify'/>
          Links
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;