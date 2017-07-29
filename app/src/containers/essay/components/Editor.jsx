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
    this.menu = props.state;
    this.crawler = new FileCrawler(Path.resolve(values.dir, 'essays'));

    this.save = this.save.bind(this);
    this.displayLabels = this.displayLabels.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
  }

  save(event) {
    event.preventDefault();
    this.data.attributes.date = ISODate.getDate();
    if (!this.data.file) this.data.file = `${ISODate.getDate()}.md`;
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file, yaml);
    this.menu.setState(this.data);
  }

  displayLabels() {
    const list = [];
    const labels = this.data.attributes.labels || [];

    labels.forEach((value, index) => {
      list.push(<Label tag key={`${index}: ${value}`}>
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
    if (!data.body) data.body = '';
    return <Form>
      <Form.Input label='Title' defaultValue={data.attributes.title || ''}
                  onChange={(event) => {
                    data.attributes.title = event.target.value || '';
                  }}/>
      <Form.TextArea autoHeight label='Body' defaultValue={data.body.trim()}
                     onChange={(event) => {
                       data.body = event.target.value;
                     }}/>
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
    </Form>;
  }
}

export default EssayEditor;
