import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import MainLayout from './components/MainLayout'
import ListCourses from './pages/ListCourses'
import NewCourse from './pages/NewCourse/'
import ShowCourse from './pages/ShowCourse/'
import ListUsers from './pages/ListUsers'
import News from './pages/News'
import Authentication from './pages/Authentication'

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>

      <Route path='/' component={Authentication} />

      <Route component={MainLayout}>
        <Route path='/courses' component={ListCourses} />
        <Route path='/courses/new' component={NewCourse} />
        <Route path='/courses/:id' component={ShowCourse} />
        {/* <Route path="/courses/edit" component={EditCourse} /> */}

        <Route path='/users' component={ListUsers} />
        {/* <Route path="/users/new" component={} /> */}
        {/* <Route path="/users/:id" component={} /> */}
        {/* <Route path="/users/:id/edit" component={} /> */}

        <Route path='/news' component={News} />
        {/* <Route path="/news/new" component={} /> */}
        {/* <Route path="/news/:id" component={} /> */}
        {/* <Route path="/news/:id/edit" component={} /> */}

      </Route>
    </Route>
  </Router>
)

export default routes
