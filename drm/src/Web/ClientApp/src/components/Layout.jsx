import React, { Component } from 'react';
import { Container } from 'primereact/container';
import NavMenu from './NavMenu.jsx';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
