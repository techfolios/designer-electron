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
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
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
          this.io.cloneUserRemote()
            .then((res) => {
              if(res){
                return this.io.loadBio();
              }
            }, (rej) => {
              console.log(rej);
            });
        } else {
          return this.io.loadBio();
        }
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      })
      .then((res) => {
        console.log(res);
        this.setState({ bio: res });
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handleSaveBio(data) {
    this.io.writeBio(data);
  }

  handleLoadBio() {
    this.setState({ isLoading: true });
    this.io.loadBio()
      .then((res) => {
        this.setState({bio: res});
        this.setState({ isLoading: false });
      }, (rej) => {
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {

  }

  getRender() {
    return <Bio bio={ this.state.bio } onSaveBio={ this.handleSaveBio } onLoadBio={ this.handleLoadBio }/>;
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