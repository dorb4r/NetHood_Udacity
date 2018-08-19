import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../Home'
import AddLocation from './../AddLocation'
const Router = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/add_location' component={AddLocation}/>
  </Switch>
)
export default Router