import React, { Component } from 'react'
import { Link } from 'react-router'

class Sidebar extends Component {
  handleSignout () {
    localStorage.removeItem('jwt_token')
  }

  render () {
    return (
      <div className='sidebar'>
        <Link className='link' activeClassName='link--active' to='/courses'>Курсы</Link>
        <Link className='link' activeClassName='link--active' to='/users'>Пользователи</Link>
        <Link className='link' activeClassName='link--active' to='/news'>Новости</Link>
        <Link className='link'>Лекции</Link>
        <Link className='link'>Контент лекции</Link>
        <Link className='link'>Роли</Link>
        <Link className='link'>Права</Link>
        <Link className='link'>Разделы курсов</Link>
        <Link className='link'>Группы</Link>
        <Link className='link'>Тесты</Link>
        <Link className='link'>Вопросы</Link>
        <Link className='link'>Ответы</Link>
        <Link className='link'>Состояния</Link>
        <Link className='link'>Изменения</Link>
        <Link className='link'>Комментарии</Link>
        <Link className='link' to='/' onClick={this.handleSignout.bind(this)}>Выйти</Link>
      </div>
    )
  }
}

export default Sidebar
