import React from 'react';
/*
  Hid unused consts
 */
// import ReactDOM from 'react-dom';
// import { Segment } from 'semantic-ui-react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import MainMenu from './components/MainMenu.jsx';
import Bio from './containers/bio/Bio.jsx';
<<<<<<< HEAD
import Projects from './containers/projects/Projects.jsx';
=======
import Essay from './containers/essay/Essays.jsx';
>>>>>>> issue-002

import IO from './io';

class Techfolio extends React.Component {
  constructor(props) {
    super(props);
    this.io = new IO(props.username);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
    this.handleSaveProjects = this.handleSaveProjects.bind(this);
    this.handleLoadProjects = this.handleLoadProjects.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      bio: null,
      projects: [
        {
          title: 'Project 1',
          data: 'data',
        },
        {
          title: 'Project 2',
          data: 'data',
        },
      ],
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
  /*
  removing stubs for now, to conform with ESLint
 */
  handleSaveProjects(data) {
    console.log(data);
    console.log(this.state);
  }

  handleLoadProjects() {
    console.log('load project');
    console.log(this.state);
  }

  /*
  handleSaveEssays(data) {

  }

  handleLoadEssays() {
    this.setState({ isLoading: true });
    this.io.loadBio()
        .then((res) => {
          this.setState({ essays: res });
          this.setState({ isLoading: false });
          this.setState({ selected: 'essays' });
        }, (rej) => {
          console.log(rej);
          this.setState({ isLoading: false });
        });
  }
  */

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

  /*
  this method causes a confusing ESLint problem...
   */
  componentDidMount() {
    this.setState({ isLoading: true });
    this.io.init()
      .then((res) => {
        console.log(res);
        this.io.loadBio()
          .then((res2) => {
            this.setState({ bio: res2 });
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
        retSelection = <Bio
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'projects':
        retSelection = <Projects
          projects={this.state.projects}
          onSaveProjects={this.handleSaveProjects}
          onLoadProjects={this.handleLoadProjects} />;
        break;
      case 'essays':
        retSelection = <Essay dir={this.io.getLocalFolder()}/>;
        break;
      case 'upload':
        retSelection = <h1>Upload</h1>;
        break;
      case 'addItem':
        retSelection = <h1>Add Menu Item</h1>;
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
          <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload} />
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {this.state.selected}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Techfolio;
