import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblesPage from './components/BubblePage';
import "./styles.scss";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubbles" component={BubblesPage} />
      </div>
    </Router>
  );
}

export default App;

