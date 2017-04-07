import React, { Component } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'

class MainLayout extends Component {
  render () {
    const flex = {
      display: 'flex'
    }

    return (
      <div>
        <Header />
        <div style={flex}>
          <Sidebar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MainLayout
