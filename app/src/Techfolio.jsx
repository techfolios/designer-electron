import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import MainMenu from './components/MainMenu.jsx';
import GitHubPage from './containers/github/GitHubPage.jsx';
import BasicsSection from './containers/bio/BasicsSection.jsx';
import ProfilesSection from './containers/bio/ProfilesSection.jsx';
import InterestsSection from './containers/bio/InterestsSection.jsx';
import SkillsSection from './containers/bio/SkillsSection.jsx';
import AwardsSection from './containers/bio/AwardsSection.jsx';
import EducationSection from './containers/bio/EducationSection.jsx';
import WorkSection from './containers/bio/WorkSection.jsx';
import VolunteerSection from './containers/bio/VolunteerSection.jsx';
import RefSection from './containers/bio/RefSection.jsx';
import YAMLDisplay from './containers/yaml/YAMLDisplay.jsx';
import IO from './io';
import Oauth from './utilities/Oauth';

class Techfolio extends React.Component {
  constructor(props) {
    super(props);
    this.io = new IO(props.username);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handlePull = this.handlePull.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.handlePull = this.handlePull.bind(this);
    this.handleUpdateURL = this.handleUpdateURL.bind(this);
    this.state = {
      bio: null,
      projects: null,
      essays: null,
      essayCrawler: null,
      projectCrawler: null,
      addItem: null,
      settings: null,
      selected: <GitHubPage
        io={this.io}
        onUpload={this.handleUpload}
        onPull={this.handlePull}
        onUpdateURL={this.handleUpdateURL} />,
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
        retSelection = <YAMLDisplay editor='project' dir={this.io.getLocalFolder()} key={data.attributes.title}
          delete={state.removeYAML} data={data} state={state} />;
        break;
      case 'essays':
        retSelection = <YAMLDisplay editor='essay' dir={this.io.getLocalFolder()} key={data.attributes.title}
          delete={state.removeYAML} data={data} state={state} />;
        break;
      case 'upload':
        retSelection = <h1>Upload</h1>;
        break;
      case 'github':
        retSelection = <GitHubPage
          io={this.io}
          onUpload={this.handleUpload}
          onPull={this.handlePull}
          onUpdateURL={this.handleUpdateURL} />;
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

  removeProject(cb) {
    const index = cb();
    const projects = this.state.projects;
    projects.splice(index, 1);
    this.setState({ projects });
    this.setSelected(<div>Removed Project</div>);
    this.io.removeProject(index);
  }

  importImage(url) {
    return this.io.importImage(url);
  }

  removeImage(index) {
    const { images } = this.state;
    const url = images[index];
    images.splice(index, 1);
    this.setState({ images });
    this.setSelected(<div>Removed Image</div>);
    return this.io.removeImage(url);
  }

  handleUpdateURL(data) {
    this.setState({ isLoading: true });
    this.io.setRemote(data)
      .then((res) => {
        if (res) {
          console.log('success @handleUpdateURL');
        }
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handleUpload() {
    this.setState({ isLoading: true });
    this.io.push()
      .then((res) => {
        if (res) {
          console.log('success @handleUpload');
        }
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  handlePull() {
    this.setState({ isLoading: true });
    this.io.pull()
      .then((res) => {
        if (res) {
          this.setState({ res });
          console.log('success @handlePull');
        }
        this.setState({ isLoading: false });
      }, (rej) => {
        console.log(rej);
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Oauth.login()
      .then(() => {
        console.log('Init Oauth');
        return this.io.init();
      })
      .then((res) => {
        console.log('Loading Bio');
        console.log(res);
        return this.io.loadBio();
      }, (rej) => {
        console.log(rej);
        console.log('Oauth Failed');
        this.setState({ isLoading: false });
      })
      .then((resBio) => {
        console.log('Bio Loaded, loading project');
        console.log(resBio);
        this.setState({ bio: resBio });
        return this.io.loadProjects();
      }, (rejBio) => {
        console.log('Bio failed');
        console.log(rejBio);
        this.setState({ isLoading: false });
      })
      .then((resProj) => {
        console.log('Project loaded, loading essay');
        this.setState({ projects: resProj.projects });
        this.setState({ projectCrawler: resProj.crawler });
        return this.io.loadEssays();
      }, (rejProj) => {
        console.log('Project failed');
        console.log(rejProj);
        this.setState({ isLoading: false });
      })
      .then((resEssay) => {
        console.log('Essay loaded, loading image');
        this.setState({ essays: resEssay.essays });
        this.setState({ essayCrawler: resEssay.crawler });
        return this.io.loadImages();
      }, (rejEssay) => {
        console.log('Essay failed');
        console.log(rejEssay);
        this.setState({ isLoading: false });
      })
      .then((resImages) => {
        console.log('Image loaded');
        this.setState({ images: resImages });
        this.setState({ isLoading: false });
      }, (rejImages) => {
        console.log('Image failed');
        console.log(rejImages);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, bio, projects, projectCrawler, selected, essays, essayCrawler, images } = this.state;
    const tempCSS = { marginLeft: '100px', marginRight: '15px' };

    if (isLoading || !bio || !projects) {
      return <Dimmer inverted active> <Loader size="big" content="Loading..." /> </Dimmer>;
    }

    return (
      <div>
      <MainMenu onMenuSelect={this.handleMenuSelect} onUpload={this.handleUpload}
        essays={essays}
        essayCrawler={essayCrawler}
        projects={projects}
        projectCrawler={projectCrawler}
        setSelected={item => this.setSelected(item)}
        images={images}
        importImage={imgUrl => this.importImage(imgUrl)}
        removeImage={index => this.removeImage(index)} />
      <div style={tempCSS}>
        {selected}
      </div>
      </div>
    );
  }
}

export default Techfolio;
