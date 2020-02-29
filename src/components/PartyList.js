import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Container } from "react-bootstrap";
import PartyCard from "./PartyCard";

const PartyList = props => {
  const [parties, setParties] = useState([]);

  const axiosCall = axios.axiosHeaders();


  useEffect(() => {
    axiosCall
      .get("/api/user/2/parties")
      .then(res => setParties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      {parties.map(party => (
        <PartyCard
          {...party}
          key={party.id}
          history={props.history}
        />
      ))}
    </Container>
  );
};

export default PartyList;
