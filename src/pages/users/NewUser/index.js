import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, axios } from '../../../config'

class NewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      avatar: '',
      imagePreviewUrl: '',
      error: ''
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  handleImageChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        // avatar: file,
        avatar: reader.result,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const url = API_URL + '/api/admin/users'

    const data = {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: +this.state.role,
        avatar: this.state.avatar
      }
    }

    axios.post(url, data).then((response) => {
      if (response.status === 201) {
        console.log('Пользователь создан')
        browserHistory.push('/users')
      }
    }).catch((error) => {
      this.setState({ error: String(error) })
      console.log('Ошибка создания пользователя')
    })
  }

  render () {
    return (
      <div>
        Новый курс
        <form>
          <label>
            Имя
            <input name='firstName' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Фамилия
            <input name='lastName' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Электронная почта
            <input name='email' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Пароль
            <input name='password' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Роль
            <input name='role' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Аватар
            <input name='avatar' type="file" onChange={this.handleImageChange} />
          </label>
          <button type='submit' onClick={this.handleSubmit}>Создать</button>
          <span>{this.state.error}</span>
        </form>
      </div>
    )
  }
}

export default NewUser
