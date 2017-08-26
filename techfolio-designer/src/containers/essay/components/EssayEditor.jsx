import React from 'react';

import { Form } from 'semantic-ui-react';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';
import ISODate from '../../../utilities/iso-date';
import YAMLEditor from '../../yaml/YAMLEditor.jsx';

const Path = require('path');

class EssayEditor extends YAMLEditor {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.data = this.state.data;
    this.date = ISODate.getDate(this.data.attributes.date).split(/[-.]/);
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(this.props.dir, 'essays'));

    this.delete = this.props.delete;
    this.save = this.save.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.setBody = this.setBody.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  /** @overwrite */
  save(event) {
    event.preventDefault();
    const date = `${this.date[0]}-${this.date[1]}-${this.date[2]}`;
    const oldFileName = this.data.file.name;
    this.data.file.name = `${date}.md`;
    this.data.attributes.date = date;
    this.data.body = this.data.body.trim();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file.name, yaml, oldFileName);
    this.menu.setState(this.data);
  }

  /** @override */
  getForm() {
    const data = this.data;
    const date = this.date;

    return <Form>
      <Form.Input label='Title' defaultValue={data.attributes.title || ''}
                  onChange={event => this.setAttribute(event, 'title')}/>
      <Form.Group>
        <Form.Input width={2} label='Month' defaultValue={date[1]}
          onChange={(event) => {
            date[1] = ISODate.getPadded(event.target.value);
          }}/>
        <Form.Input width={2} label='Day' defaultValue={date[2]}
          onChange={(event) => {
            date[2] = ISODate.getPadded(event.target.value);
          }}/>
        <Form.Input width={4} label='Year' defaultValue={date[0]}
          onChange={(event) => {
            date[0] = ISODate.getPadded(event.target.value);
          }}/>
      </Form.Group>
      <Form.TextArea autoHeight label='Body' defaultValue={data.body.trim()}
                     onChange={this.setBody}/>
      <Form.Dropdown
          multiple search selection fluid allowAdditions label='Tag(s)'
          defaultValue={data.attributes.labels}
          noResultsMessage={'Start typing to add a new tag!'}
          options={
            data.attributes.labels.map((label, key) => ({
              key,
              value: label,
              text: label,
            }))
          }
          onChange={this.handleLabel} />
      <br/>
    </Form>;
  }
}

export default EssayEditor;
