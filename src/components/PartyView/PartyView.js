import React, { useState, useEffect } from "react";

import axios from "../../util/axios";
const axiosCall = axios.axiosHeaders();

const PartyView = props => {
  const [party, setParty] = useState({});

  useEffect(() => {
    const partyId = props.match.params.id;
    axiosCall
      .get(`/api/party/${partyId}`)
      .then(res => {
        console.log("ping");
        setParty(res.data);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  return <h3>{party.theme}</h3>;
};

export default PartyView;
