import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';

import FS from 'fs';
import Path from 'path';
import SimpleGit from 'simple-git';

import MainMenu from './containers/MainMenu.jsx';
import Bio from './containers/Bio.jsx';

class Techfolio extends React.Component {

  constructor() {
    super();
    this.username = 'adambutac';
    this.remoteURL = `https://github.com/${this.username}/${this.username}.github.io`;
    this.state = {
      isLoading: false
    };
  }

  hasLocal() {
    return new Promise((res, rej) => {
      FS.mkdir(Techfolio.localURL, (err) => {
        if (!err) {
          res(false);
        } else if (err.code == 'EEXIST') {
          res(true);
        } else {
          rej(err);
        }
      });
    });
  }

  hasGithubPage() {
    return new Promise((res, rej) => {
      SimpleGit()
        .listRemote([this.remoteURL], function (err, data) {
          if (!err) {
            res(data);
          } else {
            rej(err);
          }
        });
    });
  }

  cloneUserRemote() {
    let options = [];

    return new Promise((res, rej) => {
      SimpleGit(Techfolio.localURL)
        .exec(() => {
          console.log(`Cloning ${this.remoteURL}...`);
        }).clone(this.remoteURL, Techfolio.localURL, options, (err) => {
          if (err) {
            rej(err);
          } else {
            console.log(`Cloned ${this.remoteURL} to ${Techfolio.localURL}`);
            res(true);
          }
        });
    });
  }

  cloneTechfoliosTemplate() {
    let options = [];

    return new Promise((res, rej) => {
      SimpleGit(Techfolio.localURL)
        .exec(() => {
          console.log(`Cloning ${Techfolio.remoteURL}...`);
        }).clone(Techfolio.remoteURL, Techfolio.localURL, options, (err) => {
          if (err) {
            console.log(`Could not clone ${Techfolio.remoteURL}`);
            rej(err);
          }
        }).exec(() => {
          console.log(`Adding remote ${this.username} ${this.remoteURL}`);
        }).addRemote(`${this.username}`, this.remoteURL, (err) => {
          if (err) {
            console.log(`Could not add remote ${this.username} ${this.remoteURL}`);
            rej(err);
          } else {
            console.log(`Cloned ${Techfolio.remoteURL} to ${Techfolio.localURL}`);
            res(true);
          }
        });
    });
  }

  componentWillMount() {
    this.setState({isLoading: true});
    this.hasLocal()
      .then((res) => {
        if (!res) {
          return this.cloneUserRemote();
        }
        this.setState({isLoading: false});
      }, (rej) => {
        console.log(rej);
        this.setState({isLoading: false});
      })
      .then((res) => {
        console.log(res);
        this.setState({isLoading: false});
      }, (rej) => {
        console.log(rej);
        this.setState({isLoading: false});
      });
  }

  componentDidMount() {

  }

  getRender() {
    return <Bio bio={require(Path.resolve(Techfolio.localURL, '_data/bio.json'))} />;
  }

  render() {
    if(this.state.isLoading) {
      return <Dimmer active> <Loader/> </Dimmer>
    } 
    return (
      <Grid>
        <Dimmer active={ this.state.isLoading }>
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

Techfolio.templateURL = 'https://github.com/techfolios/template';
Techfolio.localURL = Path.resolve(__dirname, '../.techfolios'); //OS.homedir() + "/.techfolios"

ReactDOM.render(
  <Techfolio />,
  document.getElementById('techfolio')
);