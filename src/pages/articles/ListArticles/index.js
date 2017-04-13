import React, { Component } from 'react';
import { Link } from 'react-router';
import { API_URL, axios } from '../../../config'

class ListArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/admin/articles')
      .then((response) => {
        this.setState({ articles: response.data })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (item) => {
    axios.delete(API_URL + '/api/admin/articles/' + item.id).then((response) => {
      if (response.status === 204) {
        console.log('Новость успешно удалёна')
        let newState = this.state.articles
        if (newState.indexOf(item) > -1) {
          newState.splice(newState.indexOf(item), 1)
          this.setState({ courses: newState })
        }
      }
    })
  }

  renderItem = (item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.title}</td>
        <td>{item.body}</td>
        {/*<td>{item.owner_id}</td>*/}
        <td>
          <div className="btn-group btn-group-sm" role="group">
            <Link to={{ pathname: `articles/${item.id}` }} className="btn btn-outline-info">
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
              <th>Название</th>
              <th>Тело новости</th>
              {/*<th>Владелец</th>*/}
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.articles.map(this.renderItem)}
          </tbody>
        </table>
        <Link to="/articles/new" className="btn btn-success mt-3">Создать</Link>
      </div>
    );
  }
}

export default ListArticles
