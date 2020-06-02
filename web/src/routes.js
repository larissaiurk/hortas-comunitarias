import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      {/* Garantir que uma rota seja executada por vez */}
      <Switch> 
        <Route path="/" exact component={Login}/>
        {/* <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/> */}
      </Switch>
    </BrowserRouter>

  )
}