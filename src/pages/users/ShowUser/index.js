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
      avatarURL:'',
      editable: false,
      error: ''
    }
    // console.log(this.props.params.id)
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/users/' + this.props.params.id).then((response) => {
      const item = response.data
      console.log(response.data)
      this.setState({ firstName: item.first_name, lastName: item.last_name, email: item.email, password: item.password, role: item.role, avatarURL: item.avatar })
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
      console.log(file)

        reader.onloadend = () => {
      if (reader.result) {
          this.setState({
            avatar: file,
            avatarURL: reader.result
          })
        }
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
        role: this.state.role
        // avatar: this.state.avatarURL
      }
    }

    if (this.state.avatar) {
      data.user.avatar = this.state.avatarURL
    }

    console.log(data)

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
    const { editable } = this.state;
    const disabled = editable ? false : true

    const button = editable ? 
    <button type="submit" className="btn btn-success" onClick={this.handleEditSubmit}>Сохранить</button> 
    : 
    <button type="submit" className="btn btn-warning" onClick={this.handleEdit}>Изменить</button>

    const avatar = editable ? 
    <input name='avatar' type='file' className="form-control-file" onChange={this.handleInputChange} /> 
    : 
    <img src={this.state.avatarURL} className="img-thumbnail" width="100px" />
    return (
      <div>
        <h3>{this.props.params.id}й пользователь</h3>
        <form>
          <div className="form-group w-50">
            <label htmlFor="title">Имя</label>
            <input name="firstName" type="text" className="form-control" value={this.state.firstName} onChange={this.handleInputChange} id="title" disabled={disabled}/>
          </div>
          <div className="form-group w-50">
            <label htmlFor="description">Фамилия</label>
            <input name="lastName" type="text" className="form-control" value={this.state.lastName} onChange={this.handleInputChange} id="description" disabled={disabled}/>
          </div>
          <div className="form-group w-50">
            <label htmlFor="description">Электронная почта</label>
            <input name="email" type="text" className="form-control" value={this.state.email} onChange={this.handleInputChange} id="description" disabled={disabled}/>
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Пароль</label>
            <input name="password" type="text" className="form-control" value={this.state.password} onChange={this.handleInputChange} id="description" disabled={disabled}/>
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Роль</label>
            <input name="role" type="text" className="form-control" value={this.state.role} onChange={this.handleInputChange} id="description" disabled={disabled}/>
          </div>
          <div className="form-group w-50">
            <label htmlFor="password">Аватар</label>
            <div>{avatar}</div>
          </div>

          {button}
        </form>
      </div>
    )
  }
}

export default ShowUser
