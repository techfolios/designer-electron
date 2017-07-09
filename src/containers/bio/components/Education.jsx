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
          <Form.Input label='Institution'
            defaultValue={education.institution}
            placeholder={""}
            onChange={(e) => this.handleChange(e, 'institution', index)} />
          <Form.Input label='Area'
            defaultValue={education.area}
            placeholder={""}
            onChange={(e) => this.handleChange(e, 'area', index)} />
          <Form.Group>
            <Form.Input label='Start Date'
              defaultValue={education.startDate}
              placeholder={""}
              onChange={(e) => this.handleChange(e, 'startDate', index)} />
            <Form.Input label='End Date'
              defaultValue={education.endDate}
              placeholder={""}
              onChange={(e) => this.handleChange(e, 'endDate', index)} />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Study Type'
              defaultValue={education.studyType}
              placeholder={""}
              onChange={(e) => this.handleChange(e, 'studyType', index)} />
            <Form.Input label='GPA'
              defaultValue={education.gpa}
              placeholder={""}
              onChange={(e) => this.handleChange(e, 'gpa', index)} />
          </Form.Group>
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