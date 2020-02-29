import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import PartyList from "./components/PartyList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={PartyList} />
    </div>
  );
}

export default App;
