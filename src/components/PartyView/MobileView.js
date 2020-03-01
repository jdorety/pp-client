import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import InfoCard from "./InfoCard";
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
  return (
    <>
      <Jumbotron fluid>
        <h3>{props.theme}</h3>
      </Jumbotron>
      <InfoCard {...props} />
    </>
  );
};

export default withRouter(MobileView);
