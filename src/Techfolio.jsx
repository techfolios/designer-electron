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
      bio: null,
      projects: null,
      essays: null,
      selected: <h1>Default page</h1>,
      isLoading: false
    };
  }

  handleSaveBio(data) {
    this.setState({bio: data});
    this.io.writeBio(data);
  }

  handleLoadBio() {
    this.setState({ isLoading: true });
    this.io.loadBio()
      .then((res) => {
        this.setState({ bio: res });
        this.setState({ isLoading: false });
        this.setState({selected: 'bio'});
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handleLoadProjects() {

  }

  handleLoadEssays() {

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

  componentDidMount() {
    this.setState({ isLoading: true });
    this.io.init()
      .then(res => {
        console.log(res);
        this.io.loadBio()
          .then(res => {
            this.setState({ bio: res });
            this.setState({ isLoading: false });
          }, rej => {
            console.log(rej);
            this.setState({ isLoading: false });
          });
      }, rej => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  getSelected(selected) {
    switch(selected) {
      case 'bio':
        selected = <Bio bio={this.state.bio} onSaveBio={this.handleSaveBio} onLoadBio={this.handleLoadBio}/>;
        break;
      case 'projects':
        selected = <h1>Projects</h1>;
        break;
      case 'essays':
        selected = <h1>Essays</h1>;
        break;
      case 'upload':
        selected = <h1>Upload</h1>;
        break;
      default:
        selected = <h1>Default page</h1>;
    }
    return selected;
  }

  handleMenuSelect(item) {
    let selected = this.getSelected(item);
    this.setState({selected: selected});
  }

  render() {

    if(this.state.isLoading){
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

ReactDOM.render(
  <Techfolio />,
  document.getElementById('techfolio')
);
