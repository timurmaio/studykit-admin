import React, { Component } from 'react'
import { API_URL, axios } from '../../../config'

class ShowCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      owner: '',
      editable: false,
      error: ''
    }
    // console.log(this.props.params.id)
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/courses/' + this.props.params.id).then((response) => {
      const item = response.data
      console.log(response.data)
      this.setState({ title: item.title, description: item.description })
    })
  }

  handleEdit = (event) => {
    event.preventDefault()
    this.setState({ editable: !this.state.editable })
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  handleEditSubmit = (event) => {
    event.preventDefault()
    const url = API_URL + '/api/admin/courses/' + + this.props.params.id

    const data = {
      course: {
        title: this.state.title,
        description: this.state.description
      }
    }

    axios.put(url, data).then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.setState({ editable: !this.state.editable })
      }
    })
  }

  render () {
    const title = this.state.editable ? <input name='title' type='text' defaultValue={this.state.title} onChange={this.handleInputChange} /> : <h3>{this.state.title}</h3>
    const description = this.state.editable ? <input name='description' type='text' defaultValue={this.state.description} onChange={this.handleInputChange} /> : <h3>{this.state.description}</h3>
    const button = this.state.editable ? <button type='text' onClick={this.handleEditSubmit}>Сохранить</button> : <button type='text' onClick={this.handleEdit}>Изменить</button>
    return (
      <div>
        {this.props.params.id}й Курс
        <form>
          <div>{title}</div>
          <div>{description}</div>
          {button}
        </form>
      </div>
    )
  }
}

export default ShowCourse
