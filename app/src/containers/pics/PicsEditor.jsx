import React from 'react';

class PicsEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    console.log(this);
    return <div>Pics Editor</div>;
  }
}

export default PicsEditor;
