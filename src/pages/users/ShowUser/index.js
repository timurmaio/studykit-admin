import React, { Component } from 'react'
import { API_URL, axios } from '../../../config'

class ShowUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      avatar: '',
      avatarPreviewUrl:'',
      editable: false,
      error: ''
    }
    // console.log(this.props.params.id)
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/users/' + this.props.params.id).then((response) => {
      const item = response.data
      console.log(response.data)
      this.setState({ firstName: item.first_name, lastName: item.last_name, email: item.email, password: item.password, role: item.role, avatar: item.avatar })
    })
  }

  handleEdit = (event) => {
    event.preventDefault()
    this.setState({ editable: !this.state.editable })
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name

    if (name === 'avatar') {
      let reader = new FileReader()
      let file = event.target.files[0]

      reader.onloadend = () => {
        this.setState({
          avatar: file,
          avatarPreviewUrl: reader.result
        })
      }
      reader.readAsDataURL(file)
    } else {
      const value = target.value
      this.setState({ [name]: value })
    }
  }

  handleEditSubmit = (event) => {
    event.preventDefault()
    const url = API_URL + '/api/admin/users/' + + this.props.params.id

    const data = {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        avatar: this.state.avatar
      }
    }

    axios.put(url, data).then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.setState({ editable: !this.state.editable })
      }
    })
  }

  handleClick = (event) => {
    console.log(event)
  }

  render () {
    const firstName = this.state.editable ? <input name='firstName' type='text' defaultValue={this.state.firstName} onChange={this.handleInputChange} /> : <h3>{this.state.firstName}</h3>
    const lastName = this.state.editable ? <input name='lastName' type='text' defaultValue={this.state.lastName} onChange={this.handleInputChange} /> : <h3>{this.state.lastName}</h3>
    const email = this.state.editable ? <input name='email' type='text' defaultValue={this.state.email} onChange={this.handleInputChange} /> : <h3>{this.state.email}</h3>
    const password = this.state.editable ? <input name='password' type='text' defaultValue={this.state.password} onChange={this.handleInputChange} /> : <h3>{this.state.password}</h3>
    const role = this.state.editable ? <input name='role' type='text' defaultValue={this.state.role} onChange={this.handleInputChange} /> : <h3>{this.state.role}</h3>
    const avatar = this.state.editable ? <input name='avatar' type='file' defaultValue={this.state.avatar} onChange={this.handleInputChange} onClick={this.handleClick} /> : <img src={this.state.avatar} />
    const button = this.state.editable ? <button type='text' onClick={this.handleEditSubmit}>Сохранить</button> : <button type='text' onClick={this.handleEdit}>Изменить</button>
    return (
      <div>
        {this.props.params.id}й Пользователь
        <form>
          <div>{firstName}</div>
          <div>{lastName}</div>
          <div>{email}</div>
          <div>{password}</div>
          <div>{avatar}</div>
          <div>{role}</div>
          {button}
        </form>
      </div>
    )
  }
}

export default ShowUser
