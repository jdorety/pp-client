import React from "react";
import { Card } from "react-bootstrap";

const InfoCard = props => (
  <Card>
    <Card.Body>
      <Card.Text>{props.date}</Card.Text>
      <Card.Text>{props.when}</Card.Text>
      <Card.Text>{props.numberGuest}</Card.Text>
      <Card.Text>{`${props.spentBudget} / ${props.budget}`}</Card.Text>
    </Card.Body>
  </Card>
);

export default InfoCard;
