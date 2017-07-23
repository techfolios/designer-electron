import React from 'react';

import { Form, Button } from 'semantic-ui-react';
import Essay from '../Essays.jsx';

class EssayEditor extends React.Component {

  constructor(props) {
    super(props);
    this.data = props.data;
  }

  static getDate() {
    const today = new Date();
    return `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
  }

  save() {
    this.causeiwantthatredthinggone = null;
  }

  render() {
    const data = this.data;
    return <Form>
      <Button content='Back' color='green' onClick={event => Essay.changePage(event)} />
      <Form.Input label='Title' defaultValue={data.attributes.title} />
      <Form.Input label='Tag(s)' defaultValue={data.attributes.labels} />
      <Form.TextArea label='Body' defaultValue={data.body} />
      <Button content='Save' color='green' onClick={this.save} />
    </Form>;
  }

}

export default EssayEditor;
