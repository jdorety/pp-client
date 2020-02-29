import React, { useState, useEffect } from "react";

import axios from "../../util/axios";

const PartyView = props => {
  const axiosCall = axios.axiosHeaders();

  const [party, setParty] = useState({});

  useEffect(() => {
    const partyId = props.match.params.id;
    axiosCall
      .get(`/api/party/${partyId}`)
      .then(res => setParty(res.data))
      .catch(err => console.log(err));
  }, []);

  return <h1>This is a party</h1>;
};

export default PartyView;
