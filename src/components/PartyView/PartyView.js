import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../util/axios";
import MobileView from "./MobileView";

const axiosCall = axios.axiosHeaders();


const PartyView = props => {
  const [party, setParty] = useState({
    todos: [],
    entertainment: [],
    shopping: []
  });

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

  return <MobileView {...party} />;
};

PartyView.propTypes = {
  theme: PropTypes.string,
  username: PropTypes.string,
  when: PropTypes.string,
  numberGuest: PropTypes.number,
  budget: PropTypes.number,
  spentBudget: PropTypes.number
};

export default PartyView;
