import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Grid} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'
import { handleInitialData } from '../actions/shared'
import Login from './login' 
import Nav from './nav'
import Home from './Home'
import LeaderBoard from './leaderboard'
import UserCard from './userCard'
import NewQuestion from './newQuestion'
import NoMatch from './404NoMatch';

class App extends Component  {

  componentDidMount(){
    this.props.handleInitialData()
  }
  
   render() {
      /* console.log('Props', this.props) */
      const{ authedUser } = this.props
    return (
        <Router>
          <div className='app'>
              {authedUser === null ? ( 
                <Route render = {() => (
                    <Login /> 
                  )} />
                  )
               : (
                <Fragment>
                  <Nav />
                  <ContentGrid>
                    <Switch>
                      <Route exact path='/' component={ Home } />
                      <Route path='/questions/:question_id' component={ UserCard } />
                      <Route path='/add' component={ NewQuestion } />
                      <Route path='/leaderboard' component={ LeaderBoard } />
                      <Route path='/questions/bad_id' component={ NoMatch } />
                      <Route component={ NoMatch } />
                    </Switch>
                  </ContentGrid>
                </Fragment>
                )
              }
          </div>
        </Router>
    )
  };
}

 const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 650 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

 function mapStateToProps({authedUser}) {
  return {
    authedUser,
    /* loading: authedUser === null  */
  }
}

export default connect(mapStateToProps, {handleInitialData})(App)
