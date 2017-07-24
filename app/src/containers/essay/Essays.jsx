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

  static changePage(event, data, page) {
    event.preventDefault();
    values.data = data || null;
    values.page = page || 'list';

    ReactDOM.render(
        <Essay dir={values.dir} key={data.attributes.title}/>,
        document.getElementById('essay'));
  }

  getPage() {
    let page;
    switch (values.page) {
      case 'list':
        page = <div>
          <Segment basic textAlign="center">
            <Icon name="file text outline" size="huge"/>
            <Header as="h3"></Header>
          </Segment>
          <EssayList dir={this.directory}/></div>;
        break;
      case 'edit':
        page = <div>
          <Segment basic textAlign="center">
            <Icon name="write" size="big"/>
            <Header as="h3"></Header>
          </Segment>
          <EssayEditor data={values.data}/>
        </div>;
        break;
      default:
        page = <h1>404 Error</h1>;
    }
    return page;
  }

  render() {
    return <Container id="essay">
      {this.getPage()}
    </Container>;
  }
}

export default Essay;
