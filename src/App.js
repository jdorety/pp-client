import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "./util/axios";
import logo from "./logo.svg";
import "./App.css";

const axiosCall = axios.axiosHeaders();

function App() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    axiosCall
      .get("/api/user/1/parties")
      .then(res => setParties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Alert variant="success" dismissible>
          <Alert.Heading>This is a test alert</Alert.Heading>
          <p>Yeah, just seeing how this looks.</p>
        </Alert>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
