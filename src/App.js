import React from "react";
import { Route } from "react-router-dom";
import PartyList from "./components/PartyList/PartyList";
import PartyView from "./components/PartyView/PartyView"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={PartyList} />
      <Route path="/parties/:id" component={PartyView} />
    </div>
  );
}

export default App;
