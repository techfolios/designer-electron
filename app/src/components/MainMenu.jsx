import React from 'react';
import { Menu, Icon, Accordion, MenuItem, Divider } from 'semantic-ui-react';

import ProjectsMenu from './ProjectsMenu.jsx';
import YAMLParser from '../utilities/yaml-parser';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      activeItem: '',
      projects: props.projects,
      essayList: props.essays,
      essayCrawler: props.essayCrawler,
      deletedEssay: undefined,
    };

    this.maxWidth = 16;
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleProjectsClick = this.handleProjectsClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  handleProjectsClick(e, { name }) {
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

  handlePageChange(event, name, data) {
    event.preventDefault();
    this.setState({ activeItem: data.attributes.title });
    this.props.onMenuSelect(name, data, this);
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
          <Menu.Item name='basicsSection' active={activeItem === 'basicsSection'} onClick={this.handleItemClick}>
            Basics
          </Menu.Item>
          <Menu.Item name='profilesSection' active={activeItem === 'profilesSection'} onClick={this.handleItemClick}>
            Profiles
          </Menu.Item>
          <Menu.Item name='interestsSection' active={activeItem === 'interestsSection'} onClick={this.handleItemClick}>
            Interests
          </Menu.Item>
          <Menu.Item name='skillsSection' active={activeItem === 'skillsSection'} onClick={this.handleItemClick}>
            Skills
          </Menu.Item>
          <Menu.Item name='awardsSection' active={activeItem === 'awardsSection'} onClick={this.handleItemClick}>
            Awards
          </Menu.Item>
          <Menu.Item name='educationSection' active={activeItem === 'educationSection'} onClick={this.handleItemClick}>
            Education
          </Menu.Item>
          <Menu.Item name='workSection' active={activeItem === 'workSection'} onClick={this.handleItemClick}>
            Work
          </Menu.Item>
          <Menu.Item name='volunteerSection' active={activeItem === 'volunteerSection'} onClick={this.handleItemClick}>
            Volunteer
          </Menu.Item>
          <Menu.Item name='refSection' active={activeItem === 'refSection'} onClick={this.handleItemClick}>
            References
          </Menu.Item>
        </Accordion.Content>
      </Accordion>
    );
  }

  removeYAML(event, key, file, crawler, state, checkpoint) {
    event.preventDefault();
    const list = this.state;
    if (checkpoint) list[checkpoint] = list[state][key];
    list[state] = list[state].filter((data, index) => index !== key);
    if (file) crawler.removeFile(file);
    this.setState(list);
    this.props.onMenuSelect('default');
  }

  restoreYAML(event, crawler, state, checkpoint) {
    event.preventDefault();
    const list = this.state;
    if (!list[checkpoint]) return;
    if (list[checkpoint].file) crawler.writeFile(list[checkpoint].file, YAMLParser.write(list[checkpoint]));
    list[state].push(list[checkpoint]);
    list[checkpoint] = undefined;
    this.setState(list);
  }

  getShortenString(str) {
    let returnString = '';
    if (str.length > this.maxWidth) returnString = `${str.trim().slice(0, this.maxWidth - 3)}...`;
    else returnString = str;

    return returnString;
  }

  getYAML(files, crawler, state, checkpoint) {
    const list = [];
    const { activeItem } = this.state;
    let key;
    files.forEach((data, index) => {
      key = `${data.attributes.title}`;
      list.push(<Menu.Item name={key} key={key} active={activeItem === key}>
        {this.getShortenString(key)}
        <br />
        <div>
          <Icon link size='big' name='edit' color='black'
                onClick={event => this.handlePageChange(event, 'essays', data)}/>
          <Icon link size='big' name='remove' color='red'
                onClick={event => this.removeYAML(event, index, data.file, crawler, state, checkpoint)}/>
        </div>
      </Menu.Item>);
    });

    return list;
  }

  addYAML(event, files) {
    const list = files;
    list.push({
      attributes: {
        layout: 'essay',
        type: 'essay',
        title: 'New Essay',
        date: '',
        labels: [],
      },
    });
    this.setState(list);
  }

  renderEssays() {
    return <Accordion as={MenuItem}>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='file text outline'/>
          <Icon name='dropdown'/>
          Essays
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        {this.getYAML(this.state.essayList, this.state.essayCrawler, 'essayList', 'deletedEssay')}
        <Divider/>
        <Menu.Item>
          <span>
            <Icon link size='big' name='plus' color='green'
                  onClick={event => this.addYAML(event, this.state.essayList, this.state.essayCrawler, 'essayList')}/>
            <Icon link={this.state.deletedEssay !== undefined} size='big' name='undo'
                  disabled={!this.state.deletedEssay} color='teal' onClick={event =>
                      this.restoreYAML(event, this.state.essayCrawler, 'essayList', 'deletedEssay')}/>
          </span>
        </Menu.Item>
      </Accordion.Content>
    </Accordion>;
  }

  renderUpload(activeItem) {
    return (
      <Menu.Item name='upload' active={activeItem === 'upload'} onClick={this.handleUpload}>
        <Icon name='upload' />
        Upload
      </Menu.Item>
    );
  }

  render() {
    const { activeItem, projects } = this.state;
    return (
      <Menu vertical widths={this.maxWidth} fixed="left" icon='labeled' color="teal">
        {this.renderSettings(activeItem)}

        {this.renderBio(activeItem)}

        <ProjectsMenu
          data={projects}
          setSelected={this.props.setSelected}
          saveProject={this.props.saveProject}
          removeProject={this.props.removeProject} />

          {this.renderEssays(activeItem)}

          {this.renderUpload(activeItem)}

        <Menu.Item name='addItem' active={activeItem === 'addItem'} onClick={this.handleItemClick}>
          <Icon name='plus' />
          Add Menu Item
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
