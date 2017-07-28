import React from 'react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';

import ProjectEditor from '../containers/project/ProjectEditor.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      activeIndex: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(file, activeIndex) {
    this.props.setSelected(<ProjectEditor index={activeIndex} saveProject={this.props.saveProject} data={file} />);
    this.setState({ activeIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const result = [];
    this.props.data.forEach((file, index) => {
      const title = file.attributes.title;
      result.push(<Menu.Item key={index} name={title} active={activeIndex === index}
        onClick={() => this.handleClick(file, index)}>{title}</Menu.Item>);
    });

    return (
      <Accordion>
        <Accordion.Title>
          <Menu.Item name='projects'>
            <Icon name='dropdown' />
            <Icon name='cubes' />
            Projects
          </Menu.Item>
        </Accordion.Title>
        <Accordion.Content>
          {result}
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ProjectsMenu;
