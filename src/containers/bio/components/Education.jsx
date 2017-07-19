import React from 'react';
import { Icon, Form, Header } from 'semantic-ui-react';

class Education extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(e, key, index) {
    let state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('education', state);
  }
  handleAddition(e, obj) {
    const data = this.state.data;
    console.log(e);
    // need to get array index from e
    data[0].courses.push(obj.value);
    this.setState({
      data: data
    });
  }

  add() {
    let data = this.state.data;
    data.push({
      institution:'',
      area: '',
      studyType: '',
      startDate:'',
      endDate:'',
      gpa:'',
      courses:['']
    });
    this.props.onChange('education', data);
  }

  remove() {
    let data = this.state.data;
    data.pop();
    this.props.onChange('education', data);
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
          <Form.Dropdown className="dropdown" multiple search selection fluid allowAdditions label='Courses'
            options={
              education.courses.map((course, index) => {
                return {
                  key: index,
                  value: course,
                  text: course,
                }
              })
            }
            onAddItem={this.handleAddition}
            onChange={this.handleDropdownChange}
           />
        </div>
      })
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>
  }
}

export default Education;
