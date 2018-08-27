import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Button, Input, Menu, MenuItem, List, ListItem} from '@material-ui/core';

import MapComp from './app/MapComp';
import MyFancyComponent from './app/MapComp';


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

class Home extends Component {
    constructor() {
        super();
        this.state = {
          isMarkerShown: true,
          locations: [],
          query: "",
          isOpen: {}
        }

        this.onToggleOpen = this.onToggleOpen.bind(this);
        this.closeWindows = this.closeWindows.bind(this);
    }

    filterLocations(query) {
        this.setState({query});
    }

    searchLocations(query) {
        if (query !== "")
            fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=n9R000qQ4FM75YR9xfDlaiywPO8oSCm4&lat=32.1500&lon=34.8839&radius=3000`)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({locations: data.results})
                })
                .catch((err) => {
                        console.log(err);
                        this.setState({locations: []})
                    }
                );
        else this.setState({locations: []})
    }

    onToggleOpen = (id) => {
        const isOpen = this.state.isOpen;
        isOpen[id] = true;
        this.setState({isOpen});
    };

    closeWindows = (id) => {
      const isOpen = this.state.isOpen;
      delete isOpen[id]
      this.setState({isOpen});
    };


    componentDidMount() {
        this.searchLocations("sports");
    }


    render() {
        const {classes} = this.props;
        const {locations, query} = this.state;

        let showingLocations

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingLocations = locations.filter((location) => match.test(location.poi.name));
        } else {
            showingLocations = locations;
        }

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar className={classes.appBar}>
                        <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                            NetHood
                        </Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.searchLocations(e.target.querySelector("#searchLocations").value)
                        }}>
                            <Typography variant="subheading" color="inherit">
                                <label>Load other locations:</label>
                            </Typography>
                            <Input type="text" id="searchLocations"/>
                            <Input type="submit" color="inherit" value="load"/>
                        </form>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent"
                        classes={{paper: classes.drawerPaper,}}>
                    <div className={classes.toolbar}/>
                    <Input type="text"
                           onChange={(value) => this.filterLocations(value.target.value)}/>
                    <Divider/>
                    <List>
                    {showingLocations.filter((location) => location.type === "POI")
                      .map((location) => (
                          <MenuItem key={location.id} 
                                    selected={this.state.isOpen[location.id]}>
                            <Button>{location.poi.name}</Button>
                          </MenuItem>
                        )
                    )}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <MyFancyComponent 
                             isMarkerShown={this.state.isMarkerShown}
                             markers={this.state.locations}
                             isOpen={this.state.isOpen}
                             onToggleOpen={this.onToggleOpen}
                             closeWindows={this.closeWindows}/>
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);