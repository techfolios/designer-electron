import React from 'react';
import { Form } from 'semantic-ui-react';


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.renderLocation = this.renderLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const state = this.state;
    state[key] = e.target.value;
    this.props.onChange('basics', state);
  }

  renderLocation() {
    const obj = [];
    Object.keys(this.state).forEach((key) => {
      obj.push(<Form.Input
        key={key}
        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        defaultValue={this.state[key]}
        placeholder={''}
        onChange={e => this.handleLocationChange(e, key)}></Form.Input>);
    });
    return obj;
  }

  render() {
    return (<div>
      {this.renderLocation()};
    </div>);
  }
}

export default Location;
