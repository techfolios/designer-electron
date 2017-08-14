import React from 'react';
import { Menu } from 'semantic-ui-react';
import preview from 'marked';
import renderHTML from 'html-react-parser';

import FileCrawler from '../../utilities/file-crawler';
import ProjectEditor from '../project/components/ProjectEditor.jsx';
import EssayEditor from '../essay/components/EssayEditor.jsx';
import values from '../values';

class YAMLDisplay extends React.Component {
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
    let page = <p>404 Not Found</p>;
    if (this.props.editor === 'project') {
      page = <ProjectEditor delete={this.delete}
                            data={this.props.data} dir={this.directory} state={this.props.state}/>;
    } else {
      page = <EssayEditor delete={this.delete}
                   data={this.props.data} dir={this.directory} state={this.props.state}/>;
    }
    if (this.state.page === 'preview') {
      console.log(renderHTML(preview(this.props.data.body), values));
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

export default YAMLDisplay;
