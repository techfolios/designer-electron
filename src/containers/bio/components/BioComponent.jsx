import React from 'react';


class BioComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  render() {
      return <div>{ JSON.stringify(this.state.data) }</div>
  }
}

export default BioComponent;