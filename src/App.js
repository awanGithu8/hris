import React from 'react';
import './App.css';
import Layout from './Layout';

import Login from './Login';
import User from './User';
import Employee from './Employee';
import Division from './Division';
import Cuti from './Cuti';
import Approval from './Approval';

import { Route, HashRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Layout>
          <header className="App-header">
            <Route exact path="/" component={Login}/>
            <Route path="/cuti" component={Cuti}/>
            <Route path="/user" component={User}/>
            <Route path="/employee" component={Employee}/>
            <Route path="/division" component={Division}/>
            <Route path="/approval" component={Approval}/>
          </header>
        </Layout>
      </HashRouter>
    </div>
  );
}

export default App;
