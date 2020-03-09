import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Container } from "react-bootstrap";
import PartyCard from "./PartyCard";

const axiosCall = axios.axiosHeaders();

const PartyList = props => {
  const [parties, setParties] = useState([]);
  const userId = 2;

  const convertDate = party => {
    const date = new Date(party.when);
    console.log(date);
    const displayDate = date.toDateString();
    console.log(displayDate);
    return { ...party, when: displayDate };
  };

  useEffect(() => {
    axiosCall
      .get(`/api/user/${userId}/parties`)
      .then(res => {
        const formatData = res.data.map(party => {
          return convertDate(party);
        });
        setParties(formatData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      {parties.map(party => (
        <PartyCard {...party} key={party.id} history={props.history} />
      ))}
    </Container>
  );
};

export default PartyList;
