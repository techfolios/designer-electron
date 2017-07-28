import React from 'react';
// import Path from 'path';
// import { Card, Button } from 'semantic-ui-react';
import { Icon, Segment, Header } from 'semantic-ui-react';

import EssayEditor from './components/Editor.jsx';
import FileCrawler from '../../utilities/file-crawler';
import values from './values';

class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'list' };
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);
    values.dir = this.directory;
  }

  render() {
    return <Segment piled>
      <Segment basic textAlign="center">
        <Icon name="write" size="big"/>
        <Header as="h3"></Header>
      </Segment>
      <EssayEditor data={this.props.data} state={this.props.state}/>
    </Segment>;
  }
}

export default Essay;
