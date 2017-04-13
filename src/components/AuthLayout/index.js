import React, { Component } from 'react'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  height: 100vh;
`

class AuthLayout extends Component {
  render () {
    return (
      <Flex>
        {this.props.children}
      </Flex>
    )
  }
}

export default AuthLayout
