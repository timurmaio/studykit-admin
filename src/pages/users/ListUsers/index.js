import React, { Component } from 'react';
import { Link } from 'react-router';
import _axios from 'axios'
import { API_URL, axios } from '../../../config'

class ListUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [{
        // id: '',
        // firstName: '',
        // lastName: '',
        // email: '',
        // password: '',
        // role: '',
        // avatar: ''
      }]
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/users')
      .then((response) => {
        // let usersData = this.state.users
        // let i = 0
        // response.data.forEach((item) => {
        //   usersData[i].id = item.id
        //   usersData[i].firstName = item.first_name
        //   usersData[i].lastName = item.last_name
        //   usersData[i].email = item.email
        //   usersData[i].password = item.password
        //   usersData[i].role = item.avatar
        //   i++
        // })
        console.log(response.data)
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (item) => {
    axios.delete(API_URL + '/api/admin/users/' + item.id).then((response) => {
      if (response.status === 204) {
        console.log('Пользователь успешно удалён')
        let newState = this.state.users
        if (newState.indexOf(item) > -1) {
          newState.splice(newState.indexOf(item), 1)
          this.setState({ users: newState })
        }
      }
    })
  }

  renderUser = (item) => {
    // console.log(item.id)
    return (
      <li key={item.id}>
        Имя: {item.first_name}.
        Фамилия: {item.last_name}.
        {/*Фамилия: {item.last_name}.*/}
        email: {item.email}.
        password: {item.password}.
        role: {item.role}.
        avatar: {item.avatar}.
        <Link to={{ pathname: `users/${item.id}` }}>Показать</Link>
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
          {this.state.users.map(this.renderUser)}
        </ul>
        <Link to="/users/new"> Новый</Link>
      </div >
    );
  }
}

export default ListUsers
