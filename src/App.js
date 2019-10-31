import React from "react";
import "./css/App.css";
import Layout from "./Layout";

import Home from "./Home";
import Login from "./Login";
import User from "./User";
import Employee from "./Employee";
import Division from "./Division";
import JobTitle from "./JobTitle";
import Cuti from "./Cuti";
import Approval from "./Approval";
import RequestCuti from "./RequestCuti";
import SpecialLogin from "./SpecialLogin";

import { Route, HashRouter } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <UserProvider>
          <Layout>
            <header className="App-header">
              <Route exact path="/" component={Home} />
              <Route path="/cuti" component={Cuti} />
              <Route path="/user" component={User} />
              <Route path="/employee" component={Employee} />
              <Route path="/division" component={Division} />
              <Route path="/approval" component={Approval} />
              <Route path="/add_cuti" component={RequestCuti} />
              <Route path="/job_title" component={JobTitle} />
              <Route path="/login" component={Login} />
              <Route path="/special_leave" component={SpecialLogin} />
            </header>
          </Layout>
        </UserProvider>
      </HashRouter>
    </div>
  );
}

export default App;
