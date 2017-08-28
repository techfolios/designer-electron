import React from 'react';

import { Form, Button } from 'semantic-ui-react';
import FileCrawler from '../../utilities/file-crawler';
import YAMLParser from '../../utilities/yaml-parser';
import ISODate from '../../utilities/iso-date';

const Path = require('path');

class YAMLEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.data = this.state.data;
    this.date = ISODate.getDate(this.data.attributes.date).split(/[-.]/);
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(this.props.dir, `${props.name}s`));

    this.setAttribute = this.setAttribute.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setBody = this.setBody.bind(this);

    this.delete = this.props.delete;
    this.save = this.save.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  setAttribute(e, attribute) {
    this.data.attributes[attribute] = e.target.value;
  }

  setDate(e, index) {
    this.date[index] = ISODate.getPadded(e.target.value);
  }

  setBody(e) {
    this.data.body = e.target.value;
  }

  save(event, draft) {
    event.preventDefault();
    const oldFileName = this.data.file.name;
    let date = this.date[0];

    if (this.date.length === 3) {
      date = `${this.date[0]}-${this.date[1]}-${this.date[2]}`;
      if (this.date[1] === '00' || this.date[2] === '00') date = this.date[0];
    }
    if (draft) this.data.attributes.draft = true;
    else this.data.attributes.draft = false;

    this.data.file.name = `${this.data.attributes.title.trim().replace(/\s/g, '-').toLowerCase()}.md`;
    this.data.attributes.date = date;
    this.data.body = this.data.body.trim();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file.name, yaml, oldFileName);
    this.menu.setState(this.data);
  }

  handleLabel(e, obj) {
    this.data.attributes.labels = obj.value;
    this.setState(this.data);
  }

  getProjectFields() {
    let fields = '';
    const { summary, projecturl } = this.data.attributes;
    if (this.props.name === 'project') {
      fields = <div>
        <Form.Input label='Project URL'
                    defaultValue={projecturl}
                    onChange={e => this.setAttribute(e, 'projecturl')}/>
        <Form.Input label='Summary'
                    defaultValue={summary}
                    onChange={e => this.setAttribute(e, 'summary')}/>
      </div>;
    }

    return fields;
  }

  render() {
    const data = this.data;
    const date = this.date;
    const { title, permalink, image, draft } = this.data.attributes;
    let { labels } = this.data.attributes;
    const getLabel = () => {
      if (draft) return 'Finalize Draft';
      return 'Save';
    };
    if (!labels) labels = [];
    return <div>
        <Form>
          <Form.Input label='Title' defaultValue={title || ''}
                      onChange={event => this.setAttribute(event, 'title')}/>
          <Form.Group>
            <Form.Input width={4} label='Year' defaultValue={date[0] || ''}
                        onChange={(event) => {
                          this.setDate(event, 0);
                        }}/>
            <Form.Input width={2} label='Month' defaultValue={date[1] || ''}
                        onChange={(event) => {
                          this.setDate(event, 1);
                        }}/>
            <Form.Input width={2} label='Day' defaultValue={date[2] || ''}
                        onChange={(event) => {
                          this.setDate(event, 2);
                        }}/>
            <Form.Input label='Image'
                        defaultValue={image}
                        onChange={event => this.setAttribute(event, 'image')}/>
            <Form.Input label='Permalink'
                        defaultValue={permalink}
                        placeholder={''}
                        onChange={event => this.setAttribute(event, 'permalink')}/>
          </Form.Group>
          {this.getProjectFields()}
          <Form.TextArea autoHeight label='Body' defaultValue={data.body.trim()}
                         onChange={this.setBody}/>
          <Form.Dropdown
              multiple search selection fluid allowAdditions label='Tag(s)'
              defaultValue={data.attributes.labels}
              noResultsMessage={'Start typing to add a new tag!'}
              options={
                labels.map((label, key) => ({
                  key,
                  value: label,
                  text: label,
                }))
              }
              onChange={this.handleLabel} />
          <br/>
      </Form>
      <Button.Group floated="right">
        <Button key='save' content={getLabel()} color='green' onClick={event => this.save(event, false)}/>
        <Button content='Save as Draft' color='green' onClick={event => this.save(event, true)}/>
        <Button content='Delete' color='red'
                onClick={event => this.delete(event, data.file.index, data.file.name,
                    this.crawler, data.file.state, data.file.checkpoint)}/>
      </Button.Group>
    </div>;
  }
}

export default YAMLEditor;
