import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';

import MainMenu from './components/MainMenu.jsx';
import Bio from './containers/bio/Bio.jsx';
import IO from './io.js';

class Techfolio extends React.Component {

  constructor() {
    super();
    this.io = new IO('adambutac');
    this.save = this.save.bind(this);
    this.state = {
      bio: {},
      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.io.hasLocal()
      .then((res) => {
        if (!res) {
          return this.io.cloneUserRemote();
        }
        this.setState({ bio: this.io.loadBio() });
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      })
      .then((res) => {
        console.log(res);
        this.setState({ bio: this.io.loadBio() });
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  save(data) {

  }

  componentDidMount() {

  }

  getRender() {
    return <Bio bio={ this.state.bio }/>;
  }
 
  render() {

    if (this.state.isLoading) {
      return <Dimmer active> <Loader /> </Dimmer>
    }
    return (
      <Grid>
        <Dimmer active={this.state.isLoading}>
          <Loader label="Loading your techfolio..." />
        </Dimmer>
        <Grid.Column width={3}>
          <MainMenu />
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {this.getRender()}
        </Grid.Column>
      </Grid>
    );
  }
}

ReactDOM.render(
  <Techfolio />,
  document.getElementById('techfolio')
);