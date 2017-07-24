import React from 'react';
import Path from 'path';
import { Card, Button, Menu, Icon, Accordion } from 'semantic-ui-react';

import FileCrawler from '../../../utilities/file-crawler';
import Essay from '../Essays.jsx';

class EssayList extends React.Component {

  constructor(props) {
    super(props);
    this.menuMode = props.menu;
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
    let cards = [];

    if (this.menuMode) {
      list.forEach((data, index) => {
        if (data !== null) {
          cards.push(<Menu.Item key={`menu${data.attributes.title}`}
                                onClick={event => Essay.changePage(event, data, 'edit')}>
            {data.attributes.title}
            <Icon name="remove" onClick={event => this.removefile(event, index, data.file)}/>
          </Menu.Item>);
        }
      });
      cards = (<Accordion>
        <Accordion.Title>
          <Menu.Item>
            <Icon name='file text outline'/>
            <Icon name='dropdown'/>
            Essays
          </Menu.Item>
        </Accordion.Title>
        <Accordion.Content>
          {cards}
        </Accordion.Content>
      </Accordion>);
    } else {
      list.forEach((data, index) => {
        if (data !== null) {
          cards.push(<Card key={`card${data.attributes.title}`} color='blue'>
            <Card.Content>
              <Card.Header>
                {data.attributes.title}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green' onClick={event => Essay.changePage(event, data, 'edit')}>Edit</Button>
                <Button basic color='red' onClick={event => this.removefile(event, index, data.file)}>Delete</Button>
              </div>
            </Card.Content>
          </Card>);
        }
      });
      cards = <Card.Group>{cards}</Card.Group>;
    }

    return cards;
  }

  render() {
    return this.getFiles();
  }
}

export default EssayList;
