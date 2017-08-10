import React from 'react';
import { Icon, Segment, Header, Button } from 'semantic-ui-react';
import preview from 'marked';
import renderHTML from 'html-react-parser';

import EssayEditor from './components/EssayEditor.jsx';
import FileCrawler from '../../utilities/file-crawler';
import values from '../values';

class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'edit' };
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);

    this.delete = this.props.delete;
    this.getPage = this.getPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  setPage(event, page) {
    event.preventDefault();
    this.setState({ page });
  }

  getPage() {
    const page = {
      view: <EssayEditor delete={this.delete} data={this.props.data} dir={this.directory} state={this.props.state}/>,
    };
    if (this.state.page === 'preview') {
      page.view = renderHTML(preview(this.props.data.body), values);
    }
    return page;
  }

  render() {
    const page = this.getPage();
    return <div>
      <Button.Group>
        <Button compact basic={this.state.page === 'edit'} content='Edit' color='green'
                onClick={ event => this.setPage(event, 'edit') }/>
        <Button compact basic={this.state.page === 'preview'} content='Preview' color='blue'
                onClick={ event => this.setPage(event, 'preview') }/>
      </Button.Group>
      { page.view }
    </div>;
  }
}

export default Essay;
