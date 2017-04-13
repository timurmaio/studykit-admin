import React, { Component } from 'react';
import { Link } from 'react-router';
import _axios from 'axios'
import { API_URL, axios } from '../../../config'

class ListUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/users')
      .then((response) => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (item) => {
    axios.delete(API_URL + '/api/admin/users/' + item.id).then((response) => {
      if (response.status === 204) {
        console.log('Пользователь успешно удалён')
        let newState = this.state.items
        if (newState.indexOf(item) > -1) {
          newState.splice(newState.indexOf(item), 1)
          this.setState({ items: newState })
        }
      }
    })
  }

  renderItem = (item) => {
    return (
      <tr key={item.id}>
        <td scope="row">{item.id}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>{item.role}</td>
        <td><img src={item.avatar} width="40px" alt="img" /></td>
        <td>
          <div className="btn-group btn-group-sm" role="group">
            <Link to={{ pathname: `users/${item.id}` }} className="btn btn-outline-info">
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
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Пароль</th>
              <th>Роль</th>
              <th>Аватар</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(this.renderItem)}
          </tbody>
        </table>
        <Link to="/users/new" className="btn btn-success mt-3"> Новый</Link>
      </div >
    );
  }
}

export default ListUsers
