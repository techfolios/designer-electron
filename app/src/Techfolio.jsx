import React from 'react';
/*
  Hid unused consts
 */
// import ReactDOM from 'react-dom';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import MainMenu from './components/MainMenu.jsx';
import Bio from './containers/bio/Bio.jsx';

import IO from './io.js';

class Techfolio extends React.Component {
  constructor(props) {
    super(props);
    this.io = new IO(props.username);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      bio: null,
      projects: null,
      essays: null,
      addItem: null,
      selected: <h1>Default page</h1>,
      isLoading: false,
    };
  }

  handleSaveBio(data) {
    this.setState({ bio: data });
    this.io.writeBio(data);
  }

  handleLoadBio() {
    this.setState({ isLoading: true });
    this.io.loadBio()
      .then((res) => {
        this.setState({ bio: res });
        this.setState({ isLoading: false });
        this.setState({ selected: 'bio' });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handleSaveProjects(data) {

  }

  handleLoadProjects() {

  }

  handleSaveEssays(data) {

  }

  handleLoadEssays() {

  }

  handleUpload() {
    this.setState({ isLoading: true });
    this.io.push()
      .then((res) => {
        if (res) {
          console.log('success');
        }
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.io.init()
      .then((res) => {
        console.log(res);
        this.io.loadBio()
          .then((res) => {
            this.setState({ bio: res });
            this.setState({ isLoading: false });
          }, (rej) => {
            console.log(rej);
            this.setState({ isLoading: false });
          });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  getSelected(selected) {
    let retSelection;
    switch (selected) {
      case 'bio':
        retSelection = <Bio bio={this.state.bio} onSaveBio={this.handleSaveBio} onLoadBio={this.handleLoadBio}/>;
        break;
      case 'projects':
        retSelection = <h1>Projects</h1>;
        break;
      case 'essays':
        retSelection = <h1>Essays</h1>;
        break;
      case 'upload':
        retSelection = <h1>Upload</h1>;
        break;
      case 'addItem':
        selected = <h1>Add Menu Item</h1>;
        break;
      default:
        retSelection = <h1>Default page</h1>;
    }
    return retSelection;
  }

  handleMenuSelect(item) {
    const selected = this.getSelected(item);
    this.setState({ selected });
  }

  render() {
    if (this.state.isLoading) {
      return <Dimmer inverted active> <Loader size="big" content="One sec..." /> </Dimmer>;
    }

    return (
      <Grid>
        <Grid.Column width={3}>
          <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload}/>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {this.state.selected}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Techfolio;
