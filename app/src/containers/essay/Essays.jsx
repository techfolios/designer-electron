import React from 'react';
import Path from 'path';
import { Container, Card, Button, Icon, Segment, Header } from 'semantic-ui-react';

import FileCrawler from '../../utilities/file-crawler';
import YAMLParser from '../../utilities/yaml-parser';
import EssayList from './components/List.jsx';
import EssayEditor from './components/Editor.jsx';

class Essay extends React.Component {

  constructor(props) {
    super(props);
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);
  }

  getPage() {
    return <EssayList dir={this.directory}/>;
  }

  render() {
    return <Container>
      <Segment basic textAlign="center">
        <Icon name="file text outline" size="huge" />
        <Header as="h3"></Header>
      </Segment>
      <Card.Group>
        {this.getPage()}
      </Card.Group>
    </Container>;
  }
}

export default Essay;
