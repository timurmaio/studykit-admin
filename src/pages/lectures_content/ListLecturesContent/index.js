import React, { Component } from 'react';
import { Link } from 'react-router';
import { API_URL, axios } from '../../../config'

class ListLecturesContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/course_contents')
      .then((response) => {
        this.setState({ items: response.data })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (item) => {
    axios.delete(API_URL + '/api/admin/lectures_content/' + item.id).then((response) => {
      if (response.status === 204) {
        console.log('Курс успешно удалён')
        let newState = this.state.items
        if (newState.indexOf(item) > -1) {
          newState.splice(newState.indexOf(item), 1)
          this.setState({ lectures: newState })
        }
      }
    })
  }

  renderItem = (item) => {
    if (item) return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.title}</td>
        <td>{item.body}</td>
        <td>{item.course_id}</td>
        <td>
          <div className="btn-group btn-group-sm" role="group">
            <Link to={{ pathname: `course_contents/${item.id}` }} className="btn btn-outline-info">
              Показать
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={this.handleDelete.bind(this, item)}>
              Удалить
            </button>
          </div>
        </td>
      </tr>
    )
  }

  render () {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Тело</th>
              <th>ID курса</th>
              <th>Действия</th>
              {/*<th>Аватар</th>*/}
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(this.renderItem)}
          </tbody>
        </table>
        <Link to="/course_contents/new" className="btn btn-success mt-3">Новый</Link>
      </div>
    );
  }
}

export default ListLecturesContent
