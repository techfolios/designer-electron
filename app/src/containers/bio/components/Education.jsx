import React from 'react';
import { Form, Icon, Segment, Label } from 'semantic-ui-react';

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
      {this.state.data.map((education, index) => <Segment basic key={index}>
        <Form.Group>
          <Form.Input label={<span data-position="bottom center" data-tooltip={education.institution}>
            <Icon name={`student`} />
            Institution
          </span>}
            defaultValue={education.institution}
            placeholder={'Institution'}
            onChange={e => this.handleChange(e, 'institution', index)}
            width={8}
          />
          <Form.Input label='Area'
            defaultValue={education.area}
            placeholder={'Area'}
            onChange={e => this.handleChange(e, 'area', index)}
            width={8}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input label='Start Date'
            defaultValue={education.startDate}
            placeholder={'Start Date'}
            onChange={e => this.handleChange(e, 'startDate', index)}
            width={4}
          />
          <Form.Input label='End Date'
            defaultValue={education.endDate}
            placeholder={'End Date'}
            onChange={e => this.handleChange(e, 'endDate', index)}
            width={4}
          />
          <Form.Input label='Study Type'
            defaultValue={education.studyType}
            placeholder={'Study Type'}
            onChange={e => this.handleChange(e, 'studyType', index)}
            width={4}
          />
          <Form.Input label='GPA'
            defaultValue={education.gpa}
            placeholder={'GPA'}
            onChange={e => this.handleChange(e, 'gpa', index)}
            width={4}
          />
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
        <br/>
      </Segment>)
      }
      <Icon link name="minus" onClick={this.remove}></Icon>
      <Icon link name="plus" color="teal" onClick={this.add}></Icon>
    </div>;
  }
}

export default Education;
