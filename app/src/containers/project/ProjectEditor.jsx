import React from 'react';
// import { Icon } 'semantic-ui-react';
// import { Form, Segment } from 'semantic-ui-react';
import { Form, Header, Icon, Image, Segment } from 'semantic-ui-react';

class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, item) {
    console.log(this);
  }

  render() {
    const { title, summary } = this.props.data.attributes;
    const { body } = this.props.data.body;
    return <div>
      <Segment textAlign="center" basic>
        <Icon size="huge" name='cubes' />
      </Segment>
      <Form>
        <Form.Input label='Title'
          defaultValue={title}
          placeholder={'Title of your Project'}
          onChange={e => this.handleChange(e, 'title')} />
        <Form.Input value={title} />
        <Form.Input value={summary} />
        <Form.TextArea value={body} autoHeight />
      </Form>
    </div>;
  }
}

export default ProjectEditor;
