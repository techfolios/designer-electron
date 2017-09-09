import React from 'react';
import { Menu, Icon, Accordion, Popup } from 'semantic-ui-react';

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

  setSelected(item, name) {
    this.setState({ activeItem: name });
    this.props.setSelected(item);
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
      <Menu.Item name='github' active={activeItem === 'github'} onClick={this.handleItemClick} >
        <Icon name='github' />
        GitHub
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
          <Menu.Menu>
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
          </Menu.Menu>
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
    if (str.length > this.maxWidth) returnString = `${str.trim().slice(0, this.maxWidth - 4)}...`;
    else returnString = str;

    return returnString;
  }

  getYAML(name, files, crawler, state, checkpoint) {
    const list = [];
    const { activeItem } = this.state;
    let key;
    let title;
    let directory = files;

    console.log('getYAML() called');

    if (!Array.isArray(directory)) {
      console.log('Non-array variable passed!');
      directory = [];
      directory.push(files);
    }

    directory.forEach((data, index) => {
      const yaml = data;
      title = data.attributes.title;
      key = `${title}-${index}`;
      yaml.file.index = index;
      yaml.file.checkpoint = checkpoint;
      yaml.file.state = state;
      console.log(data);
      list.push(<Menu.Item name={title} key={key} active={activeItem === title}
        onClick={event => this.handlePageChange(event, name, data)}>
        {this.getShortenString(title)}
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
        draft: false,
        image: '',
        title: `New ${type[0].toUpperCase()}${type.substring(1)}`,
        permalink: '',
        date: ISODate.getDate(),
        labels: [],
        projecturl: '',
        summary: '',
      },
      body: '',
      file: {
        name: `${fileName}.md`,
        index: '',
        checkpoint: '',
        state: '',
      },
    });
    this.setState(list);
  }

  renderYAML(name, icon, checkpointKey, listKey, crawler, listObj, checkpointObj) {
    const capName = `${name[0].toUpperCase()}${name.substring(1)}`;
    const addYAML = <Icon link size='large' name='plus' color='green'
      onClick={event => this.addYAML(event, listObj, name, ISODate.getDate())} />;
    const restoreYAML = <Icon link={checkpointObj !== undefined} size='large' name='undo'
      disabled={!checkpointObj} color='teal' onClick={event =>
        this.restoreYAML(event, crawler, listKey, checkpointKey)} />;
    return <Accordion>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='dropdown' />
          <Icon name={icon} />
          {`${capName}s`}
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        <Menu.Menu>
          {this.getYAML(`${name}s`, listObj, crawler, listKey, checkpointKey)}
          <Menu.Item fitted key={`${name}sicon`}>
            <span>
              <Popup trigger={addYAML} content={`Adds an new blank ${name}`} />
              <Popup trigger={restoreYAML} content={`Restores the last deleted ${name}`} />
            </span>
          </Menu.Item>
        </Menu.Menu>
      </Accordion.Content>
    </Accordion>;
  }

  render() {
    const { activeItem } = this.state;
    const { essayCrawler, essayList, deletedEssay } = this.state;
    const { projectCrawler, projectList, deletedProject } = this.state;
    const tempCSS = { overflow: 'hidden', overflowY: 'auto' };
    return (
      <Menu style={tempCSS} vertical widths={this.maxWidth} fixed="left" icon='labeled' color="teal">
        {this.renderSettings(activeItem)}
        {this.renderBio(activeItem)}
        {this.renderYAML('project', 'cubes', 'deletedProject', 'projectList',
          projectCrawler, projectList, deletedProject)}
        {this.renderYAML('essay', 'file text outline', 'deletedEssay', 'essayList',
          essayCrawler, essayList, deletedEssay)}
        <Menu.Item
          active={activeItem === 'images'}
          onClick={() => this.setSelected(
            <Images data={this.props.images}
              setSelected={item => this.setSelected(item, 'images')}
              importImage={imgURL => this.props.importImage(imgURL)}
              removeImage={imgIndex => this.props.removeImage(imgIndex)} />, 'images')}>
          <Icon name='file image outline' />
          Images
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
