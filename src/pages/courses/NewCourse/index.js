import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, axios } from '../../../config'

class NewCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      error: ''
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
    const url = API_URL + '/api/admin/courses'

    const data = {
      course: {
        title: this.state.title,
        description: this.state.description,
        owner_id: 1
      }
    }

    axios.post(url, data).then((response) => {
      if (response.status === 201) {
        console.log('Курс создан')
        browserHistory.push('/courses')
      }
    }).catch((error) => {
      this.setState({ error: String(error) })
      console.log('Ошибка создания курса')
    })
  }

  render () {
    return (
      <div>
        Новый курс
        <form>
          <label>
            Название
            <input name='title' type="text" onChange={this.handleInputChange} />
          </label>
          <label>
            Описание
            <input name='description' type="text" onChange={this.handleInputChange} />
          </label>
          <button type='submit' onClick={this.handleSubmit}>Создать</button>
          <span>{this.state.error}</span>
        </form>
      </div>
    )
  }
}

export default NewCourse
