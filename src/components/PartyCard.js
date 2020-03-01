import React from "react";
import { Card } from "react-bootstrap";
import People from "../Icons/People";
import Calendar from "../Icons/Calendar";

const PartyCard = props => (
  <Card>
    <Card.Body>
      <Card.Title>{props.theme}</Card.Title>
      <Card.Text>
        <div>
          <Calendar height="40" width="40" />
          <span>{props.when}</span>
        </div>
        <div>
          <People height="40" width="40" />
          <span>{props.numberGuest}</span>
        </div>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default PartyCard;
