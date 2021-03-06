import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, axios } from '../../../config'

class NewUser extends Component {
  constructor(props) {
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
        <h3>Новый пользователь</h3>
        <form>
          <div className="form-group w-50">
            <label htmlFor="title">Имя</label>
            <input name="firstName" type="text" className="form-control" onChange={this.handleInputChange} id="title" aria-describedby="emailHelp" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="description">Фамилия</label>
            <input name="lastName" type="text" className="form-control" onChange={this.handleInputChange} id="description" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="description">Электронная почта</label>
            <input name="email" type="text" className="form-control" onChange={this.handleInputChange} id="description" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Пароль</label>
            <input name="password" type="text" className="form-control" onChange={this.handleInputChange} id="description" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Роль</label>
            <input name="role" type="text" className="form-control" onChange={this.handleInputChange} id="description" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Аватар</label>
            <input name="avatar" type="file" className="form-control-file" onChange={this.handleImageChange} id="description" placeholder="" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Создать</button>
          <span>{this.state.error}</span>
        </form>
      </div>
    )
  }
}

export default NewUser
