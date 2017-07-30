import React from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import MainMenu from './components/MainMenu.jsx';
import Settings from './containers/settings/Settings.jsx';
import BasicsSection from './containers/bio/BasicsSection.jsx';
import ProfilesSection from './containers/bio/ProfilesSection.jsx';
import InterestsSection from './containers/bio/InterestsSection.jsx';
import SkillsSection from './containers/bio/SkillsSection.jsx';
import AwardsSection from './containers/bio/AwardsSection.jsx';
import EducationSection from './containers/bio/EducationSection.jsx';
import WorkSection from './containers/bio/WorkSection.jsx';
import VolunteerSection from './containers/bio/VolunteerSection.jsx';
import RefSection from './containers/bio/RefSection.jsx';
import Essay from './containers/essay/Essays.jsx';
import IO from './io';

class Techfolio extends React.Component {
  constructor(props) {
    super(props);
    this.io = new IO(props.username);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.state = {
      bio: null,
      projects: null,
      essays: null,
      essayCrawler: null,
      addItem: null,
      settings: null,
      selected: <Settings />,
      isLoading: false,
    };
  }

  getSelected(selected, data, state) {
    let retSelection;
    switch (selected) {
      case 'basicsSection':
        retSelection = <BasicsSection
          bio={this.state.bio}
          onSaveBio={this.handleSaveBio}
          onLoadBio={this.handleLoadBio} />;
        break;
      case 'profilesSection':
        retSelection = <ProfilesSection
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

        break;
      case 'essays':
        retSelection = <Essay dir={this.io.getLocalFolder()} key={data.attributes.title} data={data} state={state} />;
        break;
      case 'upload':
        retSelection = <h1>Upload</h1>;
        break;
      case 'addItem':
        retSelection = <h1>Add Menu Item</h1>;
        break;
      case 'settings':
        retSelection = <Settings />;
        break;
      default:
        retSelection = <h1>Default page</h1>;
    }
    return retSelection;
  }

  handleMenuSelect(item, data, state) {
    const selected = this.getSelected(item, data, state);
    this.setState({ selected });
  }

  setSelected(selected) {
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

  saveProject(index, data) {
    const projects = this.state.projects;
    projects[index] = data;
    this.setState({ projects });
    this.io.writeProject(index, data);
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
        return this.io.loadEssays();
      }, (rejProj) => {
        console.log(rejProj);
        this.setState({ isLoading: false });
      })
      .then((resEssay) => {
        this.setState({ essays: resEssay.essays });
        this.setState({ essayCrawler: resEssay.crawler });
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, bio, projects, selected, essays, essayCrawler } = this.state;

    if (isLoading || !bio || !projects) {
      return <Dimmer inverted active> <Loader size="big" content="Loading..." /> </Dimmer>;
    }

    return (
      <Grid>
        <Grid.Column width={3}>
          <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload}
            essays={essays}
            essayCrawler={essayCrawler}
            projects={projects}
            setSelected={this.setSelected}
            saveProject={this.saveProject} />
        </Grid.Column>
        <Grid.Column stretched width={12} id="root">
          {selected}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Techfolio;
