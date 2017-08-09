import React from 'react';
import { Menu, Icon, Accordion, MenuItem, Divider } from 'semantic-ui-react';

import Images from '../containers/images/Images.jsx';
import YAMLParser from '../utilities/yaml-parser';
import ISODate from '../utilities/iso-date';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      activeItem: '',
      projectList: props.projects,
      essayList: props.essays,
      essayCrawler: props.essayCrawler,
      projectCrawler: props.projectCrawler,
      deletedEssay: undefined,
      deletedProject: undefined,
    };

    this.maxWidth = 16;
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleProjectsClick = this.handleProjectsClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.removeYAML = this.removeYAML.bind(this);
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
    if (list[checkpoint].file) crawler.writeFile(list[checkpoint].file.name, YAMLParser.write(list[checkpoint]));
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

  getYAML(name, files, crawler, state, checkpoint) {
    const list = [];
    const { activeItem } = this.state;
    let key;
    files.forEach((data, index) => {
      const yaml = data;
      key = `${data.attributes.title}`;
      yaml.file.index = index;
      yaml.file.checkpoint = checkpoint;
      yaml.file.state = state;
      console.log(data);
      list.push(<Menu.Item name={key} key={key} active={activeItem === key}
                           onClick={event => this.handlePageChange(event, name, data)}>
        {this.getShortenString(key)}
      </Menu.Item>);
    });

    return list;
  }

  addYAML(event, menu, type, fileName) {
    const list = menu;
    list.push({
      attributes: {
        layout: type,
        type,
        image: '',
        title: `New ${type}`,
        permalink: '',
        date: ISODate.getDate(),
        labels: [],
        summary: '',
      },
      file: {
        name: `${fileName}.md`,
        index: '',
        checkpoint: '',
        state: '',
      },
    });
    this.setState(list);
  }

  renderEssays() {
    return <Accordion as={MenuItem}>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='dropdown' />
          <Icon name='file text outline' />
          Essays
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        {this.getYAML('essays', this.state.essayList, this.state.essayCrawler, 'essayList', 'deletedEssay')}
        <Divider/>
        <Menu.Item>
          <span>
            <Icon link size='big' name='plus' color='green'
                  onClick={event => this.addYAML(event, this.state.essayList, 'essay', ISODate.getDate())}/>
            <Icon link={this.state.deletedEssay !== undefined} size='big' name='undo'
              disabled={!this.state.deletedEssay} color='teal' onClick={event =>
                this.restoreYAML(event, this.state.essayCrawler, 'essayList', 'deletedEssay')} />
          </span>
        </Menu.Item>
      </Accordion.Content>
    </Accordion>;
  }

  renderProject() {
    const { projectList } = this.state;
    return <Accordion as={MenuItem}>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='dropdown'/>
          <Icon name='cubes'/>
          Projects
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        {this.getYAML('projects', projectList, this.state.projectCrawler, 'projectList', 'deletedProject')}
        <Divider/>
        <Menu.Item>
          <span>
            <Icon link size='big' name='plus' color='green'
                  onClick={event => this.addYAML(event, projectList, 'project', 'New-Project')}/>
            <Icon link={this.state.deletedProject !== undefined} size='big' name='undo'
                  disabled={!this.state.deletedProject} color='teal' onClick={event =>
                this.restoreYAML(event, this.state.projectCrawler, 'projectList', 'deletedProject')}/>
          </span>
        </Menu.Item>
      </Accordion.Content>
    </Accordion>;
  }

  render() {
    const { activeItem } = this.state;
    const tempCSS = { overflow: 'hidden', overflowY: 'scroll' };
    return (
      <Menu style={tempCSS} vertical widths={this.maxWidth} fixed="left" icon='labeled' color="teal">
        {this.renderSettings(activeItem)}

        {this.renderBio(activeItem)}

        {this.renderProject()}

        {this.renderEssays()}

        <Menu.Item
          onClick={() => this.props.setSelected(
            <Images data={this.props.images}
              setSelected={this.props.setSelected}
              importImage={this.props.importImage} />)}>
          <Icon name='file image outline' />
          Pics
        </Menu.Item>

        <Menu.Item name='upload' active={activeItem === 'upload'} onClick={this.handleUpload}>
          <Icon name='upload' />
          Upload
      </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
