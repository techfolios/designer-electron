import React from 'react';
import Path from 'path';
import { Container, Card, Button } from 'semantic-ui-react';

import FileCrawler from '../../utilities/file-crawler';
import YAMLParser from '../../utilities/yaml-parser';

class Essay extends React.Component {

  constructor(props) {
    super(props);
    this.directory = Path.resolve(props.dir, 'essays');
    this.crawler = new FileCrawler(this.directory);
  }

  getFiles() {
    const list = [];
    const parser = new YAMLParser(this.crawler.getFiles());

    parser.read().forEach((data) => {
      list.push(<Card key={data.attributes.title} color='blue'>
        <Card.Content>
          <Card.Header>
            {data.attributes.title}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>Edit</Button>
            <Button basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>);
    });

    return list;
  }

  render() {
    return <Container>
      <Card.Group>
        {this.getFiles()}
      </Card.Group>
    </Container>;
  }
}

export default Essay;
