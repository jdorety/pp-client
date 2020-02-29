import React from "react";
import { Accordion, Card } from "react-bootstrap";
import People from "../Icons/People";
import Calendar from "../Icons/Calendar";

const PartyCard = props => (
  <Accordion>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.id}>
        <Card.Title>{props.theme}</Card.Title>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.id}>
        <Card.Body variant={"primary"}>
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
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

export default PartyCard;
