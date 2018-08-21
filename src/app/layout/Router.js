import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../Home'
import AddLocation from './../AddLocation'


class Router extends Component{
    render() {
        return (
            <Switch>
              <Route exact path='/'        
                     render={() =>
                      <Home />
                     }/>
              <Route path='/add_location' 
                     render={() =>
                      <AddLocation />
                     }/>
            </Switch>
          )
    }
} 

export default Router