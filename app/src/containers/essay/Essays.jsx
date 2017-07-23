import React from 'react';
import ReactDOM from 'react-dom';
import Path from 'path';
import { Container, Card, Button, Icon, Segment, Header } from 'semantic-ui-react';

import FileCrawler from '../../utilities/file-crawler';
import YAMLParser from '../../utilities/yaml-parser';
import EssayList from './components/List.jsx';
import EssayEditor from './components/Editor.jsx';

import values from './values';

class Essay extends React.Component {

  constructor(props) {
    super(props);
    this.state = { page: 'list' };
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);
    values.dir = this.directory;
  }

  static changePage(event, page, data) {
    event.preventDefault();
    values.data = data || null;
    values.page = page || 'list';

    ReactDOM.render(
        <Essay dir={values.dir}/>,
        document.getElementById('essay'));
  }

  getPage() {
    let page;
    switch (values.page) {
      case 'list':
        page = <EssayList dir={this.directory}/>;
        break;
      case 'edit':
        page = <EssayEditor data={values.data}/>;
        break;
      default:
        page = <h1>404 Error</h1>;
    }
    return page;
  }

  render() {
    return <Container id="essay">
      <Segment basic textAlign="center">
        <Icon name="file text outline" size="huge" />
        <Header as="h3"></Header>
      </Segment>
        {this.getPage()}
    </Container>;
  }
}

export default Essay;
