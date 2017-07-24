import React from 'react';
// import { Segment } from 'semantic-ui-react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';
import Path from 'path';

import Essay from '../containers/essay/Essays.jsx';
import values from '../containers/essay/values';
import FileCrawler from '../utilities/file-crawler';

class MainMenu extends React.Component {
  constructor() {
    super();
    this.essayCrawler = new FileCrawler(Path.resolve(__dirname, '../../.techfolios/essays'));
    this.state = {
      visible: true,
      activeItem: '',
      essayList: this.essayCrawler.getYAML(),
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
        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick}>
          <Icon name='user circle'/>
          Bio
        </Menu.Item>
    );
  }

  renderProjects(activeItem) {
    return (
        <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleItemClick}>
          <Icon name='cubes'/>
          Projects
        </Menu.Item>
    );
  }

  removeYAML(event, key, file, crawler, state) {
    event.preventDefault();
    const list = this.state;
    list[state] = list[state].filter((data, index) => index !== key);
    crawler.removeFile(file);
    console.log(list);
    this.setState(list);
  }

  getYAML(files) {
    const list = [];
    files.forEach((data, index) => {
      if (data !== null) {
        list.push(<Menu.Item key={`menu${data.attributes.title}`}
                             onClick={event => Essay.changePage(event, data, 'edit')}>
          {data.attributes.title}
          <Icon name="remove"
                onClick={event => this.removeYAML(event, index, data.file, this.essayCrawler, 'essayList')}/>
        </Menu.Item>);
      }
    });

    return list;
  }

  renderEssays(activeItem) {
    return <Accordion>
          <Accordion.Title>
            <Menu.Item name='essays' active={activeItem === 'essays'} onClick={this.handleItemClick}>
              <Icon name='file text outline'/>
              <Icon name='dropdown'/>
              Essays
            </Menu.Item>
          </Accordion.Title>
          <Accordion.Content>
            {this.getYAML(this.state.essayList)}
          </Accordion.Content>
        </Accordion>;
  }

  renderUpload(activeItem) {
    return (
        <Menu.Item name='upload' active={activeItem === 'upload'} onClick={this.handleUpload}>
          <Icon name='upload'/>
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

          <Menu.Item name='addItem' active={activeItem === 'addItem'} onClick={this.handleItemClick}>
            <Icon name='plus'/>
            Add Menu Item
          </Menu.Item>
        </Menu>
    );
  }
}

export default MainMenu;
