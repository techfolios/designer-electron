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
    return <Form>
      <Button content='Back' color='green' onClick={event => Essay.changePage(event)} />
      <Form.Input label='Title'/>
      <Form.Input label='Tag(s)'/>
      <Form.TextArea label='Body' />
      <Button content='Save' color='green' onClick={this.save} />
    </Form>;
  }

}

export default EssayEditor;