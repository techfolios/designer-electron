import React from 'react';
import { Menu, Icon, Accordion } from 'semantic-ui-react';

import ProjectEditor from '../containers/project/ProjectEditor.jsx';

class ProjectsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: props.data,
      activeIndex: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(file, index) {
    this.setState({ activeIndex: index });
    this.props.setSelected(<ProjectEditor key={index} index={index}
      saveProject={this.props.save} data={file} removeProject={this.props.remove} />);
  }

  render() {
    const { activeIndex, projectList } = this.state;
    const result = [];
    projectList.forEach((file, index) => {
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
          <Menu.Item>
            <span>
               <Icon link size='big' name='plus' color='green'
                  onClick={event => this.addYAML(event, this.state.essayList, 'essay', ISODate.getDate())}/>
               <Icon link={this.state.deletedEssay !== undefined} size='big' name='undo'
                  disabled={!this.state.deletedEssay} color='teal' onClick={event =>
                this.restoreYAML(event, this.state.essayCrawler, 'essayList', 'deletedEssay')}/>
             </span>
          </Menu.Item>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ProjectsMenu;
