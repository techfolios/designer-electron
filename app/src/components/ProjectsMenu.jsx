import React from 'react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';

class ProjectsMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      activeItem: null,
    };
  }

  render() {
    console.log(this.state.data);
    const { activeItem, data } = this.state;
    const result = [];
    data.forEach((file, index) => {
      result.push(<Menu.Item
        key={index}
        name={file.attributes.title}
        active={activeItem === index}
        onClick={() => this.setState({ activeItem: index })}>{file.attributes.title}</Menu.Item>);
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
