import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    // this.handleItemClick = this.handleItemClick.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onMenuSelect(name);
  }

  render() {
    return (
      <p>test</p>
    );
  }
}

export default Settings;
