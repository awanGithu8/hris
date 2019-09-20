import React from 'react';
import './App.css';
import Layout from './Layout';
import Login from './Login';
import Cuti from './Cuti';

import { Route, HashRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Layout>
          <header className="App-header">
            <Route exact path="/" component={Login}/>
            <Route path="/cuti" component={Cuti}/>
          </header>
        </Layout>
      </HashRouter>
    </div>
  );
}

export default App;
