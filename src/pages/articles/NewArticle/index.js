import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, axios } from '../../../config'

class NewArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
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
    const url = API_URL + '/api/admin/articles'

    const data = {
      article: {
        title: this.state.title,
        body: this.state.body
        // owner_id: 1
      }
    }

    axios.post(url, data).then((response) => {
      if (response.status === 201) {
        console.log('Новость создана')
        browserHistory.push('/articles')
      }
    }).catch((error) => {
      this.setState({ error: String(error) })
      console.log(error)
      console.log('Ошибка создания курса')
    })
  }

  render () {
    return (
      <div>
        <h3>Создать новость</h3>
        <form>
          <div className="form-group w-50">
            <label htmlFor="title">Название</label>
            <input name="title" type="text" className="form-control" onChange={this.handleInputChange} id="title" aria-describedby="emailHelp" placeholder="" />
          </div>
          <div className="form-group w-50">
            <label htmlFor="description">Тело новости</label>
            <input name="body" type="text" className="form-control" onChange={this.handleInputChange} id="description" placeholder="" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Создать</button>
          <span>{this.state.error}</span>
        </form>
      </div>
    )
  }
}

export default NewArticle
