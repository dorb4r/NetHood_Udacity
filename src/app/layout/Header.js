import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
class Header extends React.Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  render() {
    return (
      <div style={this.styles.root}>
        <AppBar position="absolute" color="default">
          <Toolbar>
            <IconButton style={this.styles.menuButton}  color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={this.styles.flex}>
            NetHood
            </Typography>
            <NavLink
              style={this.styles.menuButton}
              to="/"
              activeClassName="is-active">
              <span>Home</span>
            </NavLink>
            <NavLink
              style={this.styles.menuButton}
              to="/add_location"
              activeClassName="is-active">
              <span>Add Location</span>
            </NavLink>
            <a className="navbar-item" href="https://github.com/dor4231" target="_block">
                <span className="icon">
                  <i className="fab fa-lg fa-github"></i>
                </span>
              </a>
              <a className="navbar-item" href="https://www.linkedin.com/in/dor-bar-1491a878/" target="_block">
                <span className="icon">
                  <i className="fab fa-lg fa-linkedin"></i>
                </span>
              </a>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Header.styles)(Header);