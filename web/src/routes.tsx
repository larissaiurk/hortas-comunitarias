import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoints from './pages/CreatePoints';
import ListPoints from './pages/ListPoints';
import Login from './pages/Login';
import Register from './pages/Register';
import CommunityGardenList from './pages/CommunityGardenList';
import Point from './pages/Point';
import EditItemsPoint from './pages/EditItemsPoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={CreatePoints} path="/create-points"/>
      <Route component={ListPoints} path="/list-point/:id"/>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <Route component={Point} path="/point/:id"/>
      <Route component={EditItemsPoint} path="/edit-items-point/:id"/>
      <Route component={CommunityGardenList} path="/garden-list"/>
    </BrowserRouter>
  )
}

export default Routes;