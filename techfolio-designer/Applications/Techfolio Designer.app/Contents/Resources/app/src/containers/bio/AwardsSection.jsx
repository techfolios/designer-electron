import React from 'react';
import { Form } from 'semantic-ui-react';

import Awards from './components/Awards.jsx';

class AwardsSection extends React.Component {
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
      <Form>
        <Awards data={this.state.awards} onChange={this.handleChange} />
      </Form>
      <Form.Button positive floated="right" type="Submit" onClick={this.handleSaveBio}>Save</Form.Button>
    </div>;
  }
}

export default AwardsSection;