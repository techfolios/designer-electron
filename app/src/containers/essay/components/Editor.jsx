import React from 'react';

import { Form, Button, Icon, Accordion, Label } from 'semantic-ui-react';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';
import ISODate from '../../../utilities/iso-date';

import values from '../values';

const Path = require('path');

class EssayEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.data = this.state.data;
    this.date = this.data.file.name.split(/[-.]/);
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(values.dir, 'essays'));

    this.delete = this.props.delete;
    this.save = this.save.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  save(event) {
    event.preventDefault();
    const date = `${this.date[0]}-${this.date[1]}-${this.date[2]}`;
    this.data.attributes.date = date;
    this.data.body = this.data.body.trim();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file.name, yaml);
    this.menu.setState(this.data);
  }

  handleLabel(event, obj) {
    this.data.attributes.labels = obj.value;
    this.setState(this.data);
  }

  render() {
    const data = this.data;
    const date = this.date;
    if (!data.body) data.body = '';
    return <Form>
      <Form.Input label='Title' defaultValue={data.attributes.title || ''}
                  onChange={(event) => {
                    data.attributes.title = event.target.value || '';
                  }}/>
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
                     onChange={(event) => {
                       data.body = event.target.value;
                     }}/>
      <Form.Dropdown
          multiple search selection fluid allowAdditions label='Tag(s)'
          defaultValue={data.attributes.labels}
          noResultsMessage={'Start typing to add a new keyword!'}
          options={
            data.attributes.labels.map((label, key) => ({
              key,
              value: label,
              text: label,
            }))
          }
          onChange={this.handleLabel} />
      <br/>
      <Button.Group floated="right">
        <Button content='Save' color='green' onClick={this.save}/>
        <Button content='Delete' color='red'
                onClick={event => this.delete(event, data.file.index, data.file.name,
                    this.crawler, data.file.state, data.file.checkpoint)}/>
      </Button.Group>
    </Form>;
  }
}

export default EssayEditor;
