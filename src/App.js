import React, { useState, useEffect } from "react";
import axios from "./util/axios";
import { Container } from "react-bootstrap";
import PartyCard from "./components/PartyCard";
import "./App.css";

const axiosCall = axios.axiosHeaders();

function App() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    axiosCall
      .get("/api/user/2/parties")
      .then(res => setParties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Container>
        {parties.map(party => (
          <PartyCard {...party} key={party.id} />
        ))}
      </Container>
    </div>
  );
}

export default App;
