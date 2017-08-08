import React from 'react';
import { Button, Form, Icon, Segment } from 'semantic-ui-react';

class ProjectEditor extends React.Component {
  constructor(props) {
    console.log(props.index);
    super(props);

    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.removeProject = this.props.remove;
  }

  setAttribute(e, attribute) {
    const data = this.state.data;
    data.attributes[attribute] = e.target.value;
    this.setState({ data });
  }

  setBody(e) {
    const data = this.state.data;
    data.body = e.target.value;
    this.setState({ data });
  }

  saveProject() {
    this.setState({ saved: true });
    this.props.saveProject(this.state.index, this.state.data);
  }

  handleLabel(e, obj) {
    const data = this.state.data;
    data.attributes.labels.push(obj.value);
    this.setState({ data });
  }

  setLabels(e, obj) {
    const data = this.state.data;
    data.attributes.labels = obj.value;
    this.setState({ data });
  }

  render() {
    const { date, image, permalink, summary, title } = this.state.data.attributes;
    let labels = this.state.data.attributes.labels;
    if (!labels) {
      labels = [];
    }
    const body = this.state.data.body;
    const saved = this.state.saved;

    return <div key={this.state.index}>
      <Segment textAlign="center" basic>
        <Icon size="huge" name='cubes' />
      </Segment>
      <Form onSubmit={this.saveProject}>
        <Form.Input label='Title'
          value={title}
          placeholder={'Title of your Project'}
          onChange={e => this.setAttribute(e, 'title')} />
        <Form.Input label='Image'
          value={image}
          placeholder={'url to cover image'}
          onChange={e => this.setAttribute(e, 'image')} />
        <Form.Input label='Date'
          value={date}
          placeholder={''}
          onChange={e => this.setAttribute(e, 'date')} />
        <Form.Input label='Permalink'
          value={permalink}
          placeholder={''}
          onChange={e => this.setAttribute(e, 'permalink')} />
        <Form.Dropdown
          multiple search selection fluid allowAdditions label='Labels'
          defaultValue={labels}
          noResultsMessage={'Start typing to add a new keyword!'}
          options={
            labels.map((label, key) => ({
              key,
              value: label,
              text: label,
            }))
          }
          onChange={this.handleLabel} />
        <Form.Input label='Summary'
          value={summary}
          placeholder={'A short description about your project'}
          onChange={e => this.setAttribute(e, 'summary')} />
        <Form.TextArea label='Body'
          autoHeight
          value={body}
          placeholder={'A detailed description of your project'}
          onChange={this.setBody} />
      </Form>
      <Button positive floated="right" onClick={this.saveProject}>Save</Button>
      <Button secondary floated="right" onClick={this.removeProject} disabled={!saved}>Delete</Button>
    </div>;
  }
}

export default ProjectEditor;
