import React from 'react';
// import Header from 'semantic-ui-react';
import { Icon, Form } from 'semantic-ui-react';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleChange(e, key, index) {
    const state = this.state.data;
    state[index][key] = e.target.value;
    this.props.onChange('education', state);
  }
  handleAddition(e, obj) {
    const data = this.state.data;
    const index = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
    data[index].courses.push(obj.value);
    this.setState({
      data,
    });
  }

  add() {
    const data = this.state.data;
    data.push({
      institution: '',
      area: '',
      studyType: '',
      startDate: '',
      endDate: '',
      gpa: '',
      courses: [''],
    });
    this.props.onChange('education', data);
  }

  remove() {
    const data = this.state.data;
    data.pop();
    this.props.onChange('education', data);
  }

  render() {
    return <div>
      {this.state.data.map((education, index) => <div key={index}>
        <h2 className="ui horizontal divider header">
          <span data-tooltip={`${education.institution} ${education.area} ${education.gpa}`}
            data-position="bottom center">
            <i className={'student icon'}></i>
            {education.institution}
          </span>
        </h2>
        <Form.Input label='Institution'
          defaultValue={education.institution}
          placeholder={''}
          onChange={e => this.handleChange(e, 'institution', index)} />
        <Form.Input label='Area'
          defaultValue={education.area}
          placeholder={''}
          onChange={e => this.handleChange(e, 'area', index)} />
        <Form.Group>
          <Form.Input label='Start Date'
            defaultValue={education.startDate}
            placeholder={''}
            onChange={e => this.handleChange(e, 'startDate', index)} />
          <Form.Input label='End Date'
            defaultValue={education.endDate}
            placeholder={''}
            onChange={e => this.handleChange(e, 'endDate', index)} />
        </Form.Group>
        <Form.Group>
          <Form.Input label='Study Type'
            defaultValue={education.studyType}
            placeholder={''}
            onChange={e => this.handleChange(e, 'studyType', index)} />
          <Form.Input label='GPA'
            defaultValue={education.gpa}
            placeholder={''}
            onChange={e => this.handleChange(e, 'gpa', index)} />
        </Form.Group>
        <Form.Dropdown data-index={index} className="dropdown"
          multiple search selection fluid allowAdditions label='Courses'
          defaultValue={education.courses}
          noResultsMessage={'Start typing to add a new keyword!'}
          options={
            education.courses.map((course, key) => ({
              key,
              value: course,
              text: course,
            }))
          }
          onAddItem={this.handleAddition}
        />
        <br />
      </div>)
      }
      <Icon link name="minus" onClick={this.remove} ></Icon>
      <Icon link name="plus" color="teal" onClick={this.add} ></Icon>
    </div>;
  }
}

export default Education;
