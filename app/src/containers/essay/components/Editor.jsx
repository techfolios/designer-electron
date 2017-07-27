import React from 'react';

import { Form, Button, Icon } from 'semantic-ui-react';
import Essay from '../Essays.jsx';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';

import values from '../values';

const Path = require('path');

class EssayEditor extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(values.dir, 'essays'));

    this.save = this.save.bind(this);
  }

  static getDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}}`;
  }

  save(event) {
    event.preventDefault();
    this.data.attributes.date = Essay.getDate();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file || `${EssayEditor.getDate()}.md`, yaml);
    this.menu.setState(this.data);
  }

  render() {
    const data = this.data;
    return <Form>
      <Form.Input label='Title' defaultValue={data.attributes.title || ''}
        onChange={event => (data.attributes.title = event.target.value || '')}/>
      <Form.Input label='Tag(s)' defaultValue={data.attributes.labels || ''}
        onChange={event => (data.attributes.labels = event.target.value || '')}/>
      <Form.TextArea autoHeight label='Body' defaultValue={data.body || ''}
        onChange={event => (data.body = event.target.value)}/>
      <Button content='Save' color='green' onClick={this.save}/>
    </Form>;
  }
}

export default EssayEditor;
