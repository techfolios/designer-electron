import React from 'react';
import { Form } from 'semantic-ui-react';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';
import YAMLEditor from '../../yaml/YAMLEditor.jsx';

const Path = require('path');

class ProjectEditor extends YAMLEditor {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.data = this.state.data;
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(this.props.dir, 'projects'));

    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);

    this.delete = this.props.delete;
    this.save = this.save.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  /** @overwrite */
  save(event) {
    event.preventDefault();
    const oldFileName = this.data.file.name;
    this.data.file.name = `${this.data.attributes.title.trim().replace(/\s/g, '-')}.md`;
    this.data.body = this.data.body.trim();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file.name, yaml, oldFileName);
    this.menu.setState(this.data);
  }

  /** @overwrite */
  getForm() {
    const data = this.state.data;
    const { date, image, permalink, summary, title, labels } = this.state.data.attributes;
    const body = data.body;

    return <Form>
        <Form.Input label='Title'
                    defaultValue={title}
                    placeholder={'Title of your Project'}
                    onChange={event => this.setAttribute(event, 'title')}/>
        <Form.Input label='Image'
                    defaultValue={image}
                    placeholder={'url to cover image'}
                    onChange={event => this.setAttribute(event, 'image')}/>
        <Form.Input label='Date'
                    defaultValue={date}
                    placeholder={''}
                    onChange={event => this.setAttribute(event, 'date')}/>
        <Form.Input label='Permalink'
                    defaultValue={permalink}
                    placeholder={''}
                    onChange={event => this.setAttribute(event, 'permalink')}/>
        <Form.Dropdown
            multiple search selection fluid allowAdditions label='Tag(s)'
            defaultValue={labels}
            noResultsMessage={'Start typing to add a new tag!'}
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
      </Form>;
  }
}

export default ProjectEditor;
