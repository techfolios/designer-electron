import React from 'react';

import { Form, Button, Icon, Accordion } from 'semantic-ui-react';
import Essay from '../Essays.jsx';
import FileCrawler from '../../../utilities/file-crawler';
import YAMLParser from '../../../utilities/yaml-parser';

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

  static getDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  }

  save(event) {
    event.preventDefault();
    this.data.attributes.date = EssayEditor.getDate();
    const yaml = YAMLParser.write(this.data);
    console.log(yaml);
    this.crawler.writeFile(this.data.file || `${EssayEditor.getDate()}.md`, yaml);
    this.menu.setState(this.data);
  }

  displayLabels() {
    const list = [];
    const labels = this.data.attributes.labels || [];

    labels.forEach((value, index) => {
      list.push(
          <Form.Group key={`tags: ${value}`}>
            <Form.Input defaultValue={value}
                        onChange={ (event) => { labels[index] = event.target.value; } }/>
            <Icon color='red' name='delete'
                  onClick={ event => this.removeLabel(event, index)}/>
          </Form.Group>);
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
                  onChange={event => (data.attributes.title = event.target.value || '')}/>
      <Form.TextArea autoHeight label='Body' defaultValue={data.body.trim()}
                     onChange={event => (data.body = event.target.value)}/>
      <Accordion>
        <Accordion.Title>
          <Icon name='dropdown'/>
          Tag(s)
        </Accordion.Title>
        <Accordion.Content>
          {this.displayLabels()}
          <Icon name='plus' color='teal' onClick={this.addLabel}/>
        </Accordion.Content>
      </Accordion>
      <br/>
      <Button content='Save' color='green' onClick={this.save}/>
    </Form>;
  }
}

export default EssayEditor;
