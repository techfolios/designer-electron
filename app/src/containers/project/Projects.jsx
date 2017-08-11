import React from 'react';
import { Menu } from 'semantic-ui-react';
import preview from 'marked';
import renderHTML from 'html-react-parser';

import ProjectEditor from './components/ProjectEditor.jsx';
import FileCrawler from '../../utilities/file-crawler';
import values from '../values';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'edit' };
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);

    this.delete = this.props.delete;
    this.getPage = this.getPage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  setPage(event, { name }) {
    event.preventDefault();
    this.setState({ page: name });
  }

  getPage() {
    let page = <ProjectEditor delete={this.delete}
                                data={this.props.data} dir={this.directory} state={this.props.state}/>;
    if (this.state.page === 'preview') {
      page = renderHTML(preview(this.props.data.body), values);
    }
    return page;
  }

  render() {
    const { page } = this.state;
    return <div>
        <Menu tabular>
          <Menu.Item name='edit' active={page === 'edit'} onClick={this.setPage}/>
          <Menu.Item name='preview' active={page === 'preview'} onClick={this.setPage}/>
        </Menu>
        {this.getPage()}
      </div>;
  }
}

export default Projects;
