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
    this.date = this.data.file.split(/[-.]/);
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(values.dir, 'essays'));

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.displayLabels = this.displayLabels.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
  }

  save(event) {
    event.preventDefault();
    const date = `${this.date[0]}-${this.date[1]}-${this.date[2]}`;
    this.data.attributes.date = date;
    this.data.body = this.data.body.trim();
    if (!this.data.file) this.data.file = `${date}.md`;
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file, yaml);
    this.menu.setState(this.data);
  }

  delete(event) {
    event.preventDefault();
    const date = `${this.date[0]}-${this.date[1]}-${this.date[2]}`;
    this.data.attributes.date = date;
    this.data.body = this.data.body.trim();
    if (!this.data.file) this.data.file = `${date}.md`;
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file, yaml);
    this.menu.setState(this.data);
  }


  displayLabels() {
    const list = [];
    const labels = this.data.attributes.labels || [];

    labels.forEach((value, index) => {
      list.push(<Label tag color='blue' key={`${index}: ${value}`}>
        <Form.Group>
          <Form.Input defaultValue={value} onChange={(event) => {
            labels[index] = event.target.value;
          }}/>
          <Icon link size='big' color='red' name='delete'
                onClick={event => this.removeLabel(event, index)}/>
        </Form.Group>
      </Label>);
    });

    return list;
  }

  removeLabel(event, index) {
    event.preventDefault();
    const data = this.data;
    data.attributes.labels = data.attributes.labels.filter((value, key) => key !== index);
    this.setState({ data });
  }

  addLabel(event) {
    event.preventDefault();
    const data = this.data;
    const labels = data.attributes.labels;
    labels.push('');
    this.setState(data);
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
                    onChange={(event) => { date[1] = ISODate.getPadded(event.target.value); }}/>
        <Form.Input width={2} label='Day' defaultValue={date[2]}
                    onChange={(event) => { date[2] = ISODate.getPadded(event.target.value); }}/>
        <Form.Input width={4} label='Year' defaultValue={date[0]}
                    onChange={(event) => { date[0] = ISODate.getPadded(event.target.value); }}/>
      </Form.Group>
      <Form.TextArea autoHeight label='Body' defaultValue={data.body.trim()}
                     onChange={(event) => { data.body = event.target.value; }}/>
      <Accordion>
        <Accordion.Title>
          <Icon name='dropdown'/>
          Tag(s)
        </Accordion.Title>
        <Accordion.Content>
          {this.displayLabels()}
          <br/>
          <Icon link size='big' name='plus' color='teal' onClick={this.addLabel}/>
        </Accordion.Content>
      </Accordion>
      <br/>
      <Button content='Save' color='green' onClick={this.save}/>
      <Button content='Delete' color='green' onClick={this.delete}/>
    </Form>;
  }
}

export default EssayEditor;
