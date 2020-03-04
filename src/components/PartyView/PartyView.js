import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "../../util/axios";
import MobileView from "./MobileView";
import PartyReducer from "../../reducers/PartyReducer";
import PartyContext from "../../contexts/PartyContext";

import {
  PARTY_FAILURE,
  PARTY_LOADING,
  PARTY_SUCCESS
} from "../../util/actionVars";

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

  useEffect(() => {
    dispatch({ type: PARTY_LOADING });
    const partyId = props.match.params.id;
    axiosCall
      .get(`/api/party/${partyId}`)
      .then(res => {
        console.log("ping");
        dispatch({ type: PARTY_SUCCESS, party: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: PARTY_FAILURE, error: err });
      });
  }, [props.match.params.id]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  });
  // const toggleTodo = e => {
  //   console.log(e.target);
  //   dispatch({ type: TODO_TOGGLE, index: e.target.name });

  // };

  return (
    <PartyContext.Provider value={{ party }}>
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
