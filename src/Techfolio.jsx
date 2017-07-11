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
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      selected: 'bio',
      bio: {},
      isLoading: false,
    };
  }


  handleSaveBio(data) {
    this.io.writeBio(data);
  }

  handleLoadBio() {
    this.setState({ isLoading: true });
    this.setState({selected: 'bio'});
    this.io.loadBio()
      .then((res) => {
        this.setState({ bio: res });
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handleLoadProjects() {

  }

  handleLoadResume() {

  }

  handleUpload() {
    this.setState({isLoading: true});
    this.io.push()
      .then((res) => {
        if (res) {
          console.log('success');
        }
        this.setState({isLoading: false});
      }, (rej) => {
        console.log(rej);
        this.setState({isLoading: false});
      });
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.io.hasLocal()
      .then((res) => {
        if (!res) {
          this.io.cloneUserRemote()
            .then((res) => {
              if (res) {
                return this.io.loadBio();
              }
            }, (rej) => {
              console.log(rej);
              this.setState({ isLoading: false });
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

  componentDidMount() {

  }

  handleMenuSelect(item) {
    this.setState({selected: item})
  }

  render() {
    if (this.state.isLoading) {
      return <Dimmer inverted active> <Loader size="big" content="Loading techfolio..." /> </Dimmer>
    }

    let selected;
    switch(this.state.selected) {
      case 'bio':
        selected = <Bio bio={this.state.bio} onSaveBio={this.handleSaveBio} onLoadBio={this.handleLoadBio}/>;
        break;
      case 'projects':
        selected = <h1>Projects</h1>
        break;
      case 'resume':
        selected = <h1>Resume</h1>
        break;
      case 'upload':
        selected = <h1>Upload</h1>
        break;
      default:
        selected = <h1>Default page</h1>;
    }

    return (
      <Grid>
        <Grid.Column width={3}>
          <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload}/>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {selected}
        </Grid.Column>
      </Grid>
    );
  }
}

ReactDOM.render(
  <Techfolio />,
  document.getElementById('techfolio')
);