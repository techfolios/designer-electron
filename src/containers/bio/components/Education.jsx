import React from 'react';
import { Form, Header } from 'semantic-ui-react';

class Education extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('education', state);
  }

  render() {
    return <div>
      {this.state.data.map((education, index) => {
        return <div key={index}>
          <Header as="h3">{education.name}</Header>
          <Form.Group>
            <Form.Input label='Institution'
              defaultValue={education.institution}
              placeholder={"Diamond"}
              onChange={(e) => this.handleChange(e, 'institution', index)} />
            <Form.Input label='Start Date'
              defaultValue={education.startDate}
              placeholder={"Diamond"}
              onChange={(e) => this.handleChange(e, 'startDate', index)} />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Area'
              defaultValue={education.area}
              placeholder={"Diamond"}
              onChange={(e) => this.handleChange(e, 'area', index)} />
            <Form.Input label='End Date'
              defaultValue={education.endDate}
              placeholder={"Diamond"}
              onChange={(e) => this.handleChange(e, 'endDate', index)} />
          </Form.Group>
          <Form.Input label='Study Type'
            defaultValue={education.studyType}
            placeholder={"Diamond"}
            onChange={(e) => this.handleChange(e, 'studyType', index)} />
          <Form.Input label='GPA'
            defaultValue={education.gpa}
            placeholder={"Diamond"}
            onChange={(e) => this.handleChange(e, 'gpa', index)} />
          <Form.Dropdown multiple label='Courses'
            options={
              education.courses.map((course, index) => {
                return {
                  key: index,
                  value: course,
                  text: course,
                }
              })
            } />
        </div>
      })
      }
    </div>
  }
}

export default Education;