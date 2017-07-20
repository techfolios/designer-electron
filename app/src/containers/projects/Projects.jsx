import React from 'react';
// import { Button, Icon, Image, Menu } from 'semantic-ui-react';
import { Form, Segment, Grid, Header } from 'semantic-ui-react';

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
    this.handleLoadProjects = this.handleLoadProjects.bind(this);
  }

  handleChange(key, data) {
    const state = this.state;
    state[key] = data;
    this.setState(state);
  }

  handleSaveProjects() {
    this.props.onSaveProjects(this.state.projects);
  }

  handleLoadProjects() {
    this.props.onLoadProjects();
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
    return <div>
      <Form>
        <Grid doubling relaxed padded columns={4}>
          {projects.map((project, index) => <ProjectComponent name={project.title} key={index}>
            <Project data={project} onChange={this.handleChange} />
          </ProjectComponent>)}
        </Grid>
        <Form.Button positive floated="right" onClick={this.add}>Add</Form.Button>
        <Form.Button positive floated="right" onClick={this.remove}>Save</Form.Button>
      </Form>
    </div>;
  }
}

export default Projects;
