import React from 'react';

import { Button } from 'semantic-ui-react';
import FileCrawler from '../../utilities/file-crawler';
import YAMLParser from '../../utilities/yaml-parser';

const Path = require('path');

class YAMLEditor extends React.Component {
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

  setAttribute(e, attribute) {
    this.data.attributes[attribute] = e.target.value;
  }

  setBody(e) {
    this.data.body = e.target.value;
  }

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

  handleLabel(e, obj) {
    this.data.attributes.labels = obj.value;
    this.setState(this.data);
  }

  getForm() {
    this.idontwantthisstaticyoupieceof = null;
    return <p>No Form passed</p>;
  }

  render() {
    const data = this.state.data;

    return <div>
      {this.getForm()}
      <Button.Group floated="right">
        <Button content='Save' color='green' onClick={this.save}/>
        <Button content='Delete' color='red'
                onClick={event => this.delete(event, data.file.index, data.file.name,
                    this.crawler, data.file.state, data.file.checkpoint)}/>
      </Button.Group>
    </div>;
  }
}

export default YAMLEditor;
