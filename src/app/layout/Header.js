import React from 'react'
import { NavLink } from 'react-router-dom'

class Header extends React.Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <nav className="navbar"
          aria-label="main navigation"
          style={{
            borderBottom: 'solid 1px #dddddd',
          }}>
        <div className="navbar-brand">
          <a className="navbar-item">
            <span>NetHood.zone</span>
          </a>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
          <NavLink
            className="navbar-item"
            to="/"
            activeClassName="is-active">
            <span>Home</span>
          </NavLink>
          <NavLink
            className="navbar-item"
            to="/add_location"
            activeClassName="is-active">
            <span>Add Location</span>
          </NavLink>
          </div>
          <div className="navbar-end">
            <a className="navbar-item" href="https://github.com/dor4231">
              <span className="icon">
                <i className="fab fa-lg fa-github"></i>
              </span>
            </a>
            <a className="navbar-item" href="https://www.linkedin.com/in/dor-bar-1491a878/">
              <span className="icon" style={{ color: '#000', marginLeft: 5 }}>
                <i className="fab fa-lg fa-linkedin"></i>
              </span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header