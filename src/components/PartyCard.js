import React from "react";
import { Card } from "react-bootstrap";
import People from "../Icons/People";
import Calendar from "../Icons/Calendar";

const PartyCard = props => {
  const clickHandler = () => {
    props.history.push(`/parties/${props.id}`);
  };

  return (
    <Card onClick={clickHandler}>
      <Card.Body>
        <Card.Title>{props.theme}</Card.Title>
        <Card.Text>
          <Calendar height="40" width="40" />
          <span>{props.prettyWhen}</span>
        </Card.Text>
        <Card.Text>
          <People height="40" width="40" />
          <span>{props.numberGuest}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PartyCard;
