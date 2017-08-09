/* eslint-disable */
// todo
import React from 'react';
import { Menu, Icon, Accordion, MenuItem, Divider } from 'semantic-ui-react';

import YAMLParser from '../utilities/yaml-parser';
import ISODate from '../utilities/iso-date';

class YAMLMenu extends React.Component {
  render() {
    return <Accordion as={MenuItem}>
      <Accordion.Title>
        <Menu.Item>
          <Icon name='dropdown'/>
          <Icon name='file text outline'/>
          Essays
        </Menu.Item>
      </Accordion.Title>
      <Accordion.Content>
        {this.getYAML(this.state.essayList, this.state.essayCrawler, 'essayList', 'deletedEssay')}
        <Divider/>
        <Menu.Item>
          <span>
            <Icon link size='big' name='plus' color='green'
                  onClick={event => this.addYAML(event, this.state.essayList, 'essay', ISODate.getDate())}/>
            <Icon link={this.state.deletedEssay !== undefined} size='big' name='undo'
                  disabled={!this.state.deletedEssay} color='teal' onClick={event =>
                this.restoreYAML(event, this.state.essayCrawler, 'essayList', 'deletedEssay')}/>
          </span>
        </Menu.Item>
      </Accordion.Content>
    </Accordion>;
  }
}
