import React, {useContext} from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import InfoCard from "./InfoCard";
import List from "../List/List";
import PartyContext from "../../contexts/PartyContext";
import PartyReducer from "../../reducers/PartyReducer";
/**
 * Mobile view
 * @prop {string} theme The theme, or name of the party
 * @prop {string} username The username of the party host
 * @prop {string} when The date (MM/DD/YYYY) the party is to be held on
 * @prop {number} numberGuest The guest count for the party
 * @prop {number} budget The monetary budget set for the party
 * @prop {number} spentBudget The amount of money spent on the party so far
 */
const MobileView = props => {
  const {party} = useContext(PartyContext)
  return (
    <>
      <Jumbotron fluid>
        <h3>{party.theme}</h3>
      </Jumbotron>
      <InfoCard {...party} />
      <List partyId={props.match.params.id} />
    </>
  );
};

export default withRouter(MobileView);
