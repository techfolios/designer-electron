import React from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import MainMenu from './components/MainMenu.jsx';
import BasicsSection from './containers/bio/BasicsSection.jsx';
import InterestsSection from './containers/bio/InterestsSection.jsx';
import SkillsSection from './containers/bio/SkillsSection.jsx';
import AwardsSection from './containers/bio/AwardsSection.jsx';
import EducationSection from './containers/bio/EducationSection.jsx';
import WorkSection from './containers/bio/WorkSection.jsx';
import VolunteerSection from './containers/bio/VolunteerSection.jsx';
import RefSection from './containers/bio/RefSection.jsx';

import Essay from './containers/essay/Essays.jsx';
import Projects from './containers/projects/Projects.jsx';

import IO from './io';
import values from './containers/essay/values';

class Techfolio extends React.Component {
  constructor(props) {
    super(props);
    this.io = new IO(props.username);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
    this.handleSaveProjects = this.handleSaveProjects.bind(this);
    this.handleLoadProjects = this.handleLoadProjects.bind(this);
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

<<<<<<< HEAD
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

  getSelected(selected, data, state) {
=======
  getSelected(selected) {
>>>>>>> issue-003
    let retSelection;
    switch (selected) {
      case 'basicsSection':
        retSelection = <BasicsSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'interestsSection':
        retSelection = <InterestsSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'skillsSection':
        retSelection = <SkillsSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'awardsSection':
        retSelection = <AwardsSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'educationSection':
        retSelection = <EducationSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'workSection':
        retSelection = <WorkSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'volunteerSection':
        retSelection = <VolunteerSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'refSection':
        retSelection = <RefSection
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
<<<<<<< HEAD
        retSelection = <Essay dir={this.io.getLocalFolder()} key={data.attributes.title} data={data} state={state}/>;
=======
        retSelection = <Essay dir={this.io.getLocalFolder()} />;
>>>>>>> issue-003
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

<<<<<<< HEAD
  handleMenuSelect(item, data, state) {
    const selected = this.getSelected(item, data, state);
=======
  handleMenuSelect(name) {
    const selected = this.getSelected(name);
>>>>>>> issue-003
    this.setState({ selected });
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

  componentDidMount() {
    this.setState({ isLoading: true });
    this.io.init()
      .then((res) => {
        console.log(res);
        return this.io.loadBio();
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      })
      .then((resBio) => {
        console.log(resBio);
        this.setState({ bio: resBio });
        return this.io.loadProjects();
      }, (rejBio) => {
        console.log(rejBio);
        this.setState({ isLoading: false });
      })
      .then((resProj) => {
        console.log(resProj);
        this.setState({ projects: resProj });
        this.setState({ isLoading: false });
      }, (rejProj) => {
        console.log(rejProj);
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading || !this.state.bio || !this.state.projects) {
      return <Dimmer inverted active> <Loader size="big" content="Loading..." /> </Dimmer>;
    }

    return (
      <Grid>
        <Grid.Column width={3}>
          <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload} projects={this.state.projects} />
        </Grid.Column>
        <Grid.Column stretched width={12} id="root">
          {this.state.selected}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Techfolio;
