import React from 'react';
import Path from 'path';
import { Card, Button } from 'semantic-ui-react';

import FileCrawler from '../../../utilities/file-crawler';
// import values from '../values';
import Essay from '../Essays.jsx';

class EssayList extends React.Component {
  constructor(props) {
    super(props);
    this.directory = Path.resolve(props.dir, 'essays');
    this.crawler = new FileCrawler(this.directory);
    this.state = { list: this.crawler.getYAML() };

    this.removefile = this.removefile.bind(this);
  }

  removefile(event, key, file) {
    event.preventDefault();
    const list = this.state.list.filter((data, index) => index !== key);
    this.crawler.removeFile(file);
    console.log(list);
    this.setState({ list });
  }

  getFiles() {
    const list = this.state.list;
    const cards = [];

    list.forEach((data, index) => {
      if (data !== null) {
        console.log(data);
        cards.push(<Card key={data.attributes.title} color='blue'>
          <Card.Content>
            <Card.Header>
              {data.attributes.title}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={event => Essay.changePage(event, 'edit', data)}>Edit</Button>
              <Button basic color='red' onClick={event => this.removefile(event, index, data.file)}>Delete</Button>
            </div>
          </Card.Content>
        </Card>);
      }
    });

    return cards;
  }

  render() {
    return <Card.Group>
      {this.getFiles()}
    </Card.Group>;
  }
}

export default EssayList;
