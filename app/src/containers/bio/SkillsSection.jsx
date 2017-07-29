import React from 'react';
import { Form, Segment, Grid, Header } from 'semantic-ui-react';

import Skills from './components/Skills.jsx';

function BioComponent(props) {
  return <Grid.Column >
    <Segment color="teal">
      <Header className="ui center aligned header" as="h1"> {props.name} </Header>
      <div className="ui divider"></div>
      {props.children}
    </Segment>
  </Grid.Column>;
}

class SkillsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.bio;
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveBio = this.handleSaveBio.bind(this);
    this.handleLoadBio = this.handleLoadBio.bind(this);
  }

  handleChange(key, data) {
    const state = this.state;
    state[key] = data;
    this.setState(state);
  }

  handleSaveBio(e) {
    e.preventDefault();
    this.props.onSaveBio(this.state);
  }

  handleLoadBio() {
    this.props.onLoadBio();
  }

  render() {
    return <div>
      <Form onSubmit={this.handleSaveBio}>
        <Grid doubling relaxed padded columns={2}>
          <BioComponent name="Skills">
            <Skills data={this.state.skills} onChange={ this.handleChange } />
          </BioComponent>
        </Grid>
        <Form.Button positive floated="right" type="Submit">Save</Form.Button>
      </Form>
    </div>;
  }
}

export default SkillsSection;
