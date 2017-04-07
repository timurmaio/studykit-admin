import React, { Component } from 'react';
import { Link } from 'react-router';

import _axios from 'axios'
import API_URL from '../../config'

const axios = _axios.create({
  headers: { 'Authorization': localStorage.getItem('jwt_token') }
});

class ListCourses extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [{ id: 1, title: 'Wow', description: 'WowWow' }]
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/courses')
      .then((response) => {
        this.setState({ courses: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (item) => {
    axios.delete(API_URL + '/api/admin/courses/' + item.id).then((response) => {
      if (response.status === 204) {
        console.log('Курс успешно удалён')
        let newState = this.state.courses
        if (newState.indexOf(item) > -1) {
          newState.splice(newState.indexOf(item), 1)
          this.setState({ courses: newState })
        }
      }
    })
  }

  renderCourse = (item) => {
    return (
      <li key={item.id}>
        Название: {item.title}. Описание: {item.description}
        <Link to={{ pathname: `courses/${item.id}` }}>Показать</Link>
        <button onClick={this.handleDelete.bind(this, item)}>Удалить</button>
      </li>
    )
  }

  render () {
    const divStyle = {
      width: '74%'
    };

    return (
      <div style={divStyle}>
        <ul>
          {this.state.courses.map(this.renderCourse)}
        </ul>
        < Link to="/courses/new" > Новый</Link >
      </div >
    );
  }
}

export default ListCourses;
