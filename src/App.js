import React, { Component } from 'react';
import Layout from './app/Layout';
import './App.css';

import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Typography, Drawer, Divider } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class App extends Component {
  state = {

  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <AppBar 
        className={classnames(classes.appBar, classes[`appBar-left`])}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit">
              NetHood
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{paper: classes.drawerPaper}}
          variant="permanent">
          <div className={classes.toolbar} />
          <Divider />

        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
