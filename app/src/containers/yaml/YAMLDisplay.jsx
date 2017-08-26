import React from 'react';
import { Menu } from 'semantic-ui-react';
import preview from 'marked';
import renderHTML from 'html-react-parser';
import valilator from 'htmltidy2';

import FileCrawler from '../../utilities/file-crawler';
import YAMlEditor from '../yaml/YAMLEditor.jsx';
import values from '../values';

class YAMLDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.directory = props.dir;
    this.crawler = new FileCrawler(this.directory);
    this.editor = <YAMlEditor name={this.props.editor} delete={this.props.delete}
      data={this.props.data} dir={this.directory} state={this.props.state}/>;
    this.state = {
      editor: this.editor,
      display: this.editor,
      active: 'edit',
    };

    this.delete = this.props.delete;
    this.setPage = this.setPage.bind(this);
  }

  setPage(event, { name }) {
    event.preventDefault();
    const change = new Promise((res) => { res(name); });
    const { editor } = this.state;
    const { projecturl } = this.props.data.attributes;
    const body = this.props.data.body;
    change.then((res) => {
      if (res === 'edit') {
        this.setState({ active: name, display: editor });
      } else {
        // eslint-disable-next-line no-lonely-if
        if (projecturl !== '' && projecturl !== undefined) {
          this.setState({ active: name,
            // eslint-disable-next-line max-len
            display: <p>This projects points to an outside <a href={projecturl} target="_blank">site</a></p> });
        } else {
          console.log(preview(body));
          valilator.tidy(preview(body), (err, html) => {
            this.setState({ active: name, display: renderHTML(html, values) });
          });
        }
      }
    });
  }

  render() {
    const { active, display } = this.state;
    return <div>
      <Menu tabular>
        <Menu.Item name='edit' active={active === 'edit'} onClick={this.setPage}/>
        <Menu.Item name='preview' active={active === 'preview'} onClick={this.setPage}/>
      </Menu>
      {display}
    </div>;
  }
}

export default YAMLDisplay;
