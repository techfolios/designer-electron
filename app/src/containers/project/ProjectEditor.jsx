import React from 'react';
// import { Icon } 'semantic-ui-react';
// import { Form, Segment } from 'semantic-ui-react';
import { Form, Header, Icon, Image, Segment } from 'semantic-ui-react';

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
    };
    this.setTitle = this.setTitle.bind(this);
    this.setSummary = this.setSummary.bind(this);
    this.setBody = this.setBody.bind(this);
    this.saveProject = this.saveProject.bind(this);
  }

  setTitle(e) {
    const data = this.state.data;
    data.attributes.title = e.target.value;
    this.setState({ data });
  }

  setSummary(e) {
    const data = this.state.data;
    data.attributes.summary = e.target.value;
    this.setState({ data });
  }

  setBody(e) {
    const data = this.state.data;
    data.body = e.target.value;
    this.setState({ data });
  }

  saveProject() {
    this.props.saveProject(this.state.index, this.state.data);
  }

  render() {
    const { title, summary } = this.props.data.attributes;
    const body = this.props.data.body;
    return <div>
      <Segment textAlign="center" basic>
        <Icon size="huge" name='cubes' />
      </Segment>
      <Form onSubmit={this.saveProject}>
        <Form.Input label='Title'
          value={title}
          placeholder={'Title of your Project'}
          onChange={this.setTitle} />
        <Form.Input label='Summary'
          value={summary}
          placeholder={'A short description about your project'}
          onChange={this.setSummary} />
        <Form.TextArea label='Body'
          autoHeight
          value={body}
          placeholder={'A detailed description of your project'}
          onChange={this.setBody} />
        <Form.Button positive floated="right" type="Submit">Save</Form.Button>
      </Form>
    </div>;
  }
}

export default ProjectEditor;
