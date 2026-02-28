import React, { Component } from 'react';
import NavMenu from './NavMenu.jsx';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <div className="p-container p-fluid" style={{ padding: '2rem' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
