import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/navbar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

import user from './pages/user'
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/type'
import {logoutUser, getUserData} from './redux/actions/userAction'
import axios from "axios";

const theme = createMuiTheme(ThemeFile)

axios.defaults.baseURL='https://us-central1-social-ape-53553.cloudfunctions.net/api'

const token= localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData())
  }
}

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup}  />
            <Route exact path="/users/:handle" component={user}/>
            <Route exact path="/users/:handle/scream/:screamId" component={user}/>
          </Switch>
          </div>
        </Router>
        </div>
        </Provider>
      </MuiThemeProvider>
    );

  }
}

export default App;
