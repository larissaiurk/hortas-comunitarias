import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoints from './pages/CreatePoints';
import Login from './pages/Login';
import Register from './pages/Register';
import CommunityGardenList from './pages/CommunityGardenList';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={CreatePoints} path="/create-points"/>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <Route component={CommunityGardenList} path="/garden-list"/>
    </BrowserRouter>
  )
}

export default Routes;