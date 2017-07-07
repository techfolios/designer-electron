import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Menu, Segment, Sidebar} from 'semantic-ui-react';
import Bio from './components/bio/bio.jsx';
import MainMenu from './components/main-menu/main-menu.jsx';

class Root extends React.Component {
  constructor() {
    super();
  }

  getRender() {
      return <Bio/>;
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <MainMenu/>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {this.getRender()}
        </Grid.Column>
      </Grid>
    );
  }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);