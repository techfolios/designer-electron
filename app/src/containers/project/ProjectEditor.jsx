import React from 'react';
// import { Icon } 'semantic-ui-react';
// import { Form, Segment } from 'semantic-ui-react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
    };
    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.setLabels = this.setLabels.bind(this);
  }

  setAttribute(e, attr) {
    const data = this.state.data;
    data.attributes[attr] = e.target.value;
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

  addLabel(e, obj) {
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
    const { date, image, labels, title, summary } = this.props.data.attributes;
    const body = this.props.data.body;
    return <div>
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
          placeholder={''}
          onChange={e => this.setAttribute(e, 'image')} />
        <Form.Input label='Date'
          value={date}
          placeholder={''}
          onChange={e => this.setAttribute(e, 'date')} />
        <Form.Dropdown
          multiple search selection fluid allowAdditions label='Labels'
          defaultValue={labels}
          options={
            labels.map((item, key) => ({
              key,
              value: item,
              text: item,
            }))
          }
          onAddItem={this.addLabel}
          onChange={this.setLabels}
        />
        <Form.Input label='Summary'
          value={summary}
          placeholder={'A short description about your project'}
          onChange={e => this.setAttribute(e, 'summary')} />
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
