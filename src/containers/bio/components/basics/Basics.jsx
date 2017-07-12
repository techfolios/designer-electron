import React from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';

import Profiles from './Profiles'

class Basics extends React.Component{

  constructor(props) {
    super(props);
    this.state = props.data;
    this.handleProfilesChange = this.handleProfilesChange.bind(this);
  }

  handleChange(e, key) {
    let state = this.state;
    state[key] = e.target.value;
    this.props.onChange('basics', state);
  }

  handleLocationChange(e, key) {
    let state = this.state;
    state.location[key] = e.target.value;
    this.props.onChange('basics', state)
  }

  handleProfilesChange(data) {
    let state = this.state;
    state.profile = data;
    this.props.onChange('basics', data)
  }

  renderLocation() {
    let obj = [];
    Object.keys(this.state.location).forEach((key) => {
      obj.push( <Form.Input 
        key={key}
        label={key}
        defaultValue={this.state.location[key]}
        placeholder={""}
        onChange={e => this.handleLocationChange(e, key)}></Form.Input>);
    });
    return obj;
  }

  render() {
    return <div>
      <Form.Group>
        <Form.Input label='Name'
          defaultValue={this.state.name}
          placeholder={"John Smith"}
          onChange={(e) => this.handleChange(e, 'name')} />
        <Form.Input label='Label'
          defaultValue={this.state.label}
          placeholder={'Student'}
          onChange={(e) => this.handleChange(e, 'label')} />
      </Form.Group>      
      <Form.Group>    
        <Form.Input label='Phone Number'
          defaultValue={this.state.phone}
          placeholder={'+1-808-867-5309'}
          onChange={(e) => this.handleChange(e, 'phone')} />
        <Form.Input label='E-Mail'
          defaultValue={this.state.email}
          placeholder='jsmith@example.com'
          onChange={(e) => this.handleChange(e, 'email')} />
      </Form.Group>      
      <Form.Input label='Website'
        width={9}
        defaultValue={this.state.website}
        placeholder="https://www.example.com"
        onChange={(e) => this.handleChange(e, 'website')} />
      <Form.Input label='Picture'
        defaultValue={this.state.picture}
        placeholder="https://www.example.com"
        onChange={(e) => this.handleChange(e, 'picture')} />
      <Form.TextArea label='Summary'
        defaultValue={this.state.summary}
        placeholder="Once upon a midnight dreary, while I pondered weak and weary..."
        onChange={(e) => this.handleChange(e, 'summary')} />
        {this.renderLocation()}
        <Profiles data={this.state.profiles} onChange={this.handleProfilesChange} ></Profiles>

    </div>
  }
}

export default Basics;