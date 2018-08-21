import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Site from './layout/Site'
import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'
import Router from './layout/Router'

import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
class Layout extends Component {
  render() {
    return (
      <Site>
        <Helmet
          title="NetHood - Find you're team!"
          meta={[
            { name: 'description', content: 'This is a site for finding the best people to team up with.' },
            { name: 'keywords', content: 'sports, fun, joy, team, friends' },
          ]}
          script={[
            { 'src': 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'},
          ]}
          link={[
            {'rel':'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
          ]}
        />
        <Header />
        <Content>
          <Router />
        </Content>
        <Footer />
      </Site>
    )
  }
} 

Layout.propTypes = {
  children: PropTypes.func,
}

export default withStyles(Layout.styles, {withTheme: true})(Layout)