import React from 'react';
// import FrontMatter from 'front-matter';

// import { Button, Icon, Image, Menu } from 'semantic-ui-react';
import { Button, Icon, Segment, Grid, Header } from 'semantic-ui-react';
import Project from './components/Project.jsx';

// import FileCrawler from '../../utilities/file-crawler';

function ProjectComponent(props) {
  return <Grid.Column >
    <Segment color="teal">
      <Header as="h2"> {props.name} </Header>
      {props.children}
    </Segment>
  </Grid.Column>;
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveProjects = this.handleSaveProjects.bind(this);
  }

  handleChange(key, data) {
    const state = this.state;
    state[key] = data;
    this.setState(state);
  }

  handleSaveProjects() {
    this.props.onSaveProjects(this.state.projects);
  }

  /*
  commented out unused method stubs
   */
  /*
  add() {

  }

  remove() {

  }
  */

  render() {
    const projects = this.state.projects;
    console.log(projects);
    return <div>
      <Segment basic textAlign="center">
        <Icon name="cubes" size="huge" />
        <Header as="h3"></Header>
      </Segment>
      <Grid doubling relaxed padded columns={4}>
        {projects.map((project, index) => <ProjectComponent key={index}>
          <Project data={project} onChange={this.handleChange} />
        </ProjectComponent>)}
      </Grid>
      <Button circular positive floated="right" icon="plus" onClick={this.add} />
    </div>;
  }
}

export default Projects;
