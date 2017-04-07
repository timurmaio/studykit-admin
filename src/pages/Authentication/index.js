import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Authentication extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    if (localStorage.getItem('jwt_token')) {
      browserHistory.push('/courses')
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const url = 'http://localhost:3000/api/users/login'

    const userData = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }

    axios.post(url, userData).then(function (response) {
      if (response.status === 200) {
        console.log('Мы вошли!')
        const jwt_token = response.data.jwt_token
        // XSS vulnerability
        localStorage.setItem('jwt_token', jwt_token)
        browserHistory.push('/courses')
      }
    }).catch(function (error) {
      console.log(error)
      console.log('Введены неверные данные')
    })
  }

  render () {
    return (
      <form>
        <label>
          Username:
          <input name='email' type='text' onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input name='password' type='password' onChange={this.handleInputChange} />
        </label>
        <button type='submit' onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default Authentication
