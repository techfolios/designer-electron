import React from 'react';
// import { Icon } 'semantic-ui-react';
// import { Form, Segment } from 'semantic-ui-react';
import { Form, Icon, Segment } from 'semantic-ui-react';

class ProjectEditor extends React.Component {
  constructor(props) {
    console.log(props.index);
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
    };

    if (!props.data) {
      this.state.data = {
        data: {
          layout: 'project',
          type: 'project',
          image: '',
          title: 'New Project',
          permalink: 'projects/newproject',
          date: '',
          labels: [],
          summary: '',
        },
      };
    }

    if (!props.index) {
      this.state.index = 0;
    }

    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.saveProject = this.saveProject.bind(this);
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

  addLabel(e, obj) {
    const data = this.state.data;
    data.attributes.labels.push(obj.value);
    this.setState({ data });
  }

  saveProject() {
    this.props.saveProject(this.state.index, this.state.data);
  }

  render() {
    const { date, image, labels, permalink, summary, title } = this.state.data.attributes;
    const body = this.state.data.body;
    console.log(this.state.index);
    return <div key={this.state.index}>
      <Segment textAlign="center" basic>
        <Icon size="huge" name='cubes' />
      </Segment>
      <Form onSubmit={this.saveProject }>
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
          value={labels}
          noResultsMessage={'Start typing to add a new keyword!'}
          options={
            labels.map((label, key) => ({
              key,
              value: label,
              text: label,
            }))
          }
          onAddItem={this.addLabel} />
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
