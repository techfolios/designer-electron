import React from 'react';
// import { Icon } 'semantic-ui-react';
import { Form, Segment } from 'semantic-ui-react';

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
      <h4>{this.state.data.data}</h4>
    </div>;
  }
}

export default Project;
