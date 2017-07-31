import React from 'react';
import { Icon, Segment, Header } from 'semantic-ui-react';
import preview from 'marked';
import renderHTML from 'react-render-html';

import EssayEditor from './components/Editor.jsx';
import FileCrawler from '../../utilities/file-crawler';
import values from './values';

class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'edit' };
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);
    values.dir = this.directory;
    this.getPage = this.getPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  setPage(event, page) {
    event.preventDefault();
    this.setState({ page });
  }

  getPage() {
    const page = {
      view: <EssayEditor data={this.props.data} state={this.props.state}/>,
      icon: <Icon link name="write" size="big" onClick={ event => this.setPage(event, 'preview') }/>,
    };
    if (this.state.page === 'preview') {
      page.view = renderHTML(preview(this.props.data.body));
      page.icon = <Icon link name="picture" size="big" onClick={ event => this.setPage(event, 'write') }/>;
    }
    return page;
  }

  render() {
    const page = this.getPage();
    return <div>
      <Segment basic textAlign="center">
        { page.icon }
        <Header as="h3"></Header>
      </Segment>
      { page.view }
    </div>;
  }
}

export default Essay;
