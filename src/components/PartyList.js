import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Container } from "react-bootstrap";
import PartyCard from "./PartyCard";
import { convertDate } from "../util/dataHelpers";

const axiosCall = axios.axiosHeaders();

const PartyList = props => {
  const [parties, setParties] = useState([]);
  const userId = 2;

  useEffect(() => {
    axiosCall
      .get(`/api/user/${userId}/parties`)
      .then(res => {
        console.log(res.data);
        const formatData = res.data.map(party => {
          // add prettyWhen string for UI display of party date
          return { ...party, prettyWhen: convertDate(party.when) };
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
