import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button, Input } from '@material-ui/core';
import MapComp from './app/MapComp';


const drawerWidth = 240,
      API_KEY = "AIzaSyBUTQfI6CTeTw-g7tJwNbFLTy799wzRNeI";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    minWidth: 0, // So the Typography noWrap works
  },
  flex: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends Component {
  state = {
    locations: [],
    query: ""
  }

  filterLocations(query) {
    this.setState({ query });
  }

  searchLocations(query) {
    if (query !== "")
      fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=n9R000qQ4FM75YR9xfDlaiywPO8oSCm4&lat=32.1500&lon=34.8839&radius=3000`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          this.setState({locations: data.results})
        })
        .catch((err) =>
          console.log(err)
        )
    else this.setState({locations: []})
  }

  componentDidMount() {
    fetch("https://api.tomtom.com/search/2/search/sports.json?key=n9R000qQ4FM75YR9xfDlaiywPO8oSCm4&lat=32.1500&lon=34.8839&radius=3000")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results)
      this.setState({locations: data.results})
    })
    .catch((err) =>
      console.log(err)
    )
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.appBar}>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              NetHood
            </Typography>
            <form noWrap onSubmit={(e) => {e.preventDefault(); this.searchLocations(e.target.querySelector("#searchLocations").value)}}>
              <Typography variant="subheading" color="inherit">
                <label>Load other locations:</label>
              </Typography>
              <Input type="text" id="searchLocations" />
              <Input type="submit" color="inherit" value="load"/>
            </form>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Input type="text" 
                  onChange={(value) => this.searchLocations(value.target.value)}/>
          <Divider />
          {this.state.locations.map((location) => {
            if(location.type === "POI")
            return (<Button key={location.id}>{location.poi.name}</Button>);
          })}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MapComp apiKey={API_KEY}
                   isMarkerShown={true}
                   markers={this.state.locations}/>
        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);