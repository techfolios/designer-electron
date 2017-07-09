import React from 'react';
import { Form, Header } from 'semantic-ui-react';

class Education extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return <div>
      { this.state.data.map((education) => {
        return <div>
          <Header as="h3">{ education.name }</Header>
            <Form.Group>
              <Form.Input label='Institution'
                defaultValue    = { education.institution }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.institution = event.target.value } />
              <Form.Input label='Start Date'
                defaultValue    = { education.startDate }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.startDate = event.target.value } />
            </Form.Group>
            <Form.Group>
              <Form.Input label='Area'
                defaultValue    = { education.area }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.area = event.target.value } />
              <Form.Input label='End Date'
                defaultValue    = { education.endDate }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.endDate = event.target.value } />
            </Form.Group>
              <Form.Input label='Study Type'
                defaultValue    = { education.studyType }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.studyType = event.target.value } />                    
              <Form.Input label='GPA'
                defaultValue    = { education.gpa }
                placeholder     = { "Diamond" }
                onChange        = { ( event) => education.gpa = event.target.value } />
              <Form.Dropdown multiple label='Courses'
                options={
                  education.courses.map((course, index) => {
                    return {
                      key:   index,
                      value: course,
                      text:  course,
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