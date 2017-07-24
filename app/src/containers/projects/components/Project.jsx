import React from 'react';
// import { Icon } 'semantic-ui-react';
// import { Form, Segment } from 'semantic-ui-react';
import { Icon, Image } from 'semantic-ui-react';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleChange(e, key, index) {
    const data = this.state.data;
    data[index][key] = e.target.value;
    this.setState({ data });
  }

  handleHighlightChange(e, key, windex, hindex) {
    const data = this.state.data;
    data[windex][key][hindex] = e.target.value;
    this.setState({ data });
  }

  edit() {
    console.log(this.state);
  }

  remove() {
    console.log(this.state);
  }

  render() {
    return <div>
      <h3>{this.state.data.attributes.title}</h3>
      <Image src={`./../.techfolios/${this.state.data.attributes.image}`} />
      <p>{this.state.data.attributes.summary}</p>
      <Icon link name="remove" />
      <Icon link name="edit" />
    </div>;
  }
}

export default Project;
