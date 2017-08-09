import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';

const Path = require('path');

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.data = this.state.data;
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(this.props.dir, 'projects'));

    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);
    this.setLabels = this.setLabels.bind(this);

    this.delete = this.props.delete;
    this.save = this.save.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  setAttribute(e, attribute) {
    this.data.attributes[attribute] = e.target.value;
  }

  setBody(e) {
    this.data.body = e.target.value;
  }

  save(event) {
    event.preventDefault();
    this.data.body = this.data.body.trim();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file.name, yaml);
    this.menu.setState(this.data);
  }

  handleLabel(e, obj) {
    this.data.attributes.labels = obj.value;
    this.setState(this.data);
  }

  setLabels(e, obj) {
    this.data.attributes.labels = obj.value;
    this.setState(this.data);
  }

  render() {
    const data = this.state.data;
    const { date, image, permalink, summary, title, labels } = this.state.data.attributes;
    const body = this.state.data.body;

    return <div>
      <Form onSubmit={this.saveProject}>
        <Form.Input label='Title'
          defaultValue={title}
          placeholder={'Title of your Project'}
          onChange={e => this.setAttribute(e, 'title')}/>
        <Form.Input label='Image'
          defaultValue={image}
          placeholder={'url to cover image'}
          onChange={e => this.setAttribute(e, 'image')}/>
        <Form.Input label='Date'
          defaultValue={date}
          placeholder={''}
          onChange={e => this.setAttribute(e, 'date')}/>
        <Form.Input label='Permalink'
          defaultValue={permalink}
          placeholder={''}
          onChange={e => this.setAttribute(e, 'permalink')}/>
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
          onChange={this.handleLabel}/>
        <Form.Input label='Summary'
          defaultValue={summary}
          placeholder={'A short description about your project'}
          onChange={e => this.setAttribute(e, 'summary')}/>
        <Form.TextArea label='Body'
          autoHeight
          defaultValue={body}
          placeholder={'A detailed description of your project'}
          onChange={this.setBody}/>
      </Form>
      <Button.Group floated="right">
        <Button content='Save' color='green' onClick={this.save}/>
        <Button content='Delete' color='red'
          onClick={event => this.delete(event, data.file.index, data.file.name,
            this.crawler, data.file.state, data.file.checkpoint)}/>
      </Button.Group>
    </div>;
  }
}

export default ProjectEditor;
