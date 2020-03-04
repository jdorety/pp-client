import React from "react";
import { Card } from "react-bootstrap";
import { Calendar, People, Wallet } from "../../Icons";

const InfoCard = props => (
  <Card>
    <Card.Header>{props.theme}</Card.Header>
    <Card.Body>
      <Card.Text>
        <Calendar height="40" width="40" />
        {props.when}
      </Card.Text>
      <Card.Text>
        <People height="40" width="40" />
        {props.numberGuest}
      </Card.Text>
      <Card.Text>
        <Wallet height="40" width="40" />
        {`${props.spentBudget} / ${props.budget}`}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default InfoCard;
