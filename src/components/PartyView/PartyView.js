import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "../../util/axios";
import { Spinner } from "react-bootstrap";
import MobileView from "./MobileView";
import PartyReducer from "../../reducers/PartyReducer";
import PartyContext from "../../contexts/PartyContext";

import "./PartyView.scss";
import {
  PARTY_FAILURE,
  PARTY_LOADING,
  PARTY_SUCCESS
} from "../../util/actionVars";
import { convertDate } from "../../util/dataHelpers";

const axiosCall = axios.axiosHeaders();

const PartyView = props => {
  const [party, dispatch] = useReducer(PartyReducer, {
    loading: false,
    id: 0,
    username: "",
    when: "",
    theme: "",
    numberGuest: 0,
    budget: 0,
    spentBudget: 0
  });

  // retrieve party data from backend
  useEffect(() => {
    dispatch({ type: PARTY_LOADING });
    const partyId = props.match.params.id;
    axiosCall
      .get(`/api/party/${partyId}`)
      .then(res => {
        console.log("ping");
        const party = res.data;
        console.log(party);
        // convert Date string to nice, readable string
        party.prettyWhen = convertDate(party.when);
        dispatch({ type: PARTY_SUCCESS, party: party });
      })
      .catch(err => {
        console.log(err);
        // set error display
        dispatch({ type: PARTY_FAILURE, error: err });
      });
  }, [props.match.params.id]);

  // keep track of browser width, for responsive conditional rendering of app views
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  });

  return (
    <PartyContext.Provider value={{ party }}>
      {party.loading && (
        <Spinner animation="grow" className="loading-indicator" />
      )}
      {width <= 575 && <MobileView />}
      {width > 575 && <h1>Desktop!</h1>}
    </PartyContext.Provider>
  );
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
