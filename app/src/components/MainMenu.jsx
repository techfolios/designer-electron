import React from 'react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      activeItem: '',
      projects: props.projects,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleProjectsClick = this.handleProjectsClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleItemClick(e, { name }) {
    console.log(name);
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  handleProjectsClick(e, { name }) {
    console.log(name);
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  handleUpload(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onUpload();
    this.props.onMenuSelect(name);
  }

  handlePageChange(event, name, data) {
    event.preventDefault();
    this.setState({ activeItem: data.attributes.title });
    this.props.onMenuSelect(name, data);
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
          <Menu.Item name='basicsSection' active={activeItem === 'basicsSection'} onClick={this.handleItemClick} >
            Basics
          </Menu.Item>
          <Menu.Item name='interestsSection' active={activeItem === 'interestsSection'} onClick={this.handleItemClick} >
            Interests
          </Menu.Item>
          <Menu.Item name='skillsSection' active={activeItem === 'skillsSection'} onClick={this.handleItemClick} >
            Skills
          </Menu.Item>
          <Menu.Item name='awardsSection' active={activeItem === 'awardsSection'} onClick={this.handleItemClick} >
            Awards
          </Menu.Item>
          <Menu.Item name='educationSection' active={activeItem === 'educationSection'} onClick={this.handleItemClick} >
            Education
          </Menu.Item>
          <Menu.Item name='workSection' active={activeItem === 'workSection'} onClick={this.handleItemClick} >
            Work
          </Menu.Item>
          <Menu.Item name='volunteerSection' active={activeItem === 'volunteerSection'} onClick={this.handleItemClick} >
            Volunteer
          </Menu.Item>
          <Menu.Item name='refSection' active={activeItem === 'refSection'} onClick={this.handleItemClick} >
            References
          </Menu.Item>
        </Accordion.Content>
      </Accordion>
    );
  }

  renderProjects(activeItem) {
    const data = [];
    this.state.projects.forEach((file, index) => {
      data.push(<Menu.Item
        key={index}
        name={file.attributes.title}
        active={activeItem === file.attributes.title}
        onClick={this.handleProjectsClick}>{file.attributes.title}</Menu.Item>);
    });
    return (
<<<<<<< HEAD
        <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleItemClick}>
          <Icon name='cubes'/>
          Projects
        </Menu.Item>
=======
      <Accordion>
        <Accordion.Title>
          <Menu.Item name='projects'>
            <Icon name='dropdown' />
            <Icon name='cubes' />
            Projects
          </Menu.Item>
        </Accordion.Title>
        <Accordion.Content>
          {data}
        </Accordion.Content>
      </Accordion>
>>>>>>> eac19120f7c9114fd4f54b71822428b214478259
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

  getYAML(files, crawler, state) {
    const list = [];
    const { activeItem } = this.state;
    let key;
    files.forEach((data, index) => {
      if (data !== null) {
        key = `${data.attributes.title}`;
        list.push(<Menu.Item name={key} key={key} active={activeItem === key}
                             onClick={ event => this.handlePageChange(event, 'essays', data)}>
          {data.attributes.title}
          <Icon name="remove"
                onClick={event => this.removeYAML(event, index, data.file, crawler, state)}/>
        </Menu.Item>);
      }
    });

    return list;
  }

  renderEssays(activeItem) {
    return <Accordion as={MenuItem}>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='file text outline'/>
          <Icon name='dropdown'/>
          Essays
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        {this.getYAML(this.state.essayList, this.essayCrawler, 'essayList')}
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
