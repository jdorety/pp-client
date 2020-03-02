import React, { useEffect, useReducer } from "react";
import { Form } from "react-bootstrap";

import axios from "../../util/axios";

// list needs to work for Entertainment, Shopping, and Todo lists
// variables that differ between the three:
// checked - Entertainment - ready; Shopping - purchased;  Todo - completed
const axiosCall = axios.axiosHeaders();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      console.log("FETCH_SUCCESS");
      return { todos: [...action.list] };
    case "FETCH_FAILURE":
      console.log("FETCH_FAILURE");
      return { todos: ["failure"] };
    case "TOGGLE_CHECK":
      console.log("toggle check");
      const copy = [...state.todos];
      const index = copy.findIndex(item => item.id === parseInt(action.id));
      copy[index]["completed"] = !copy[index]["completed"];
      return { todos: [...copy] };
    default:
      return state;
  }
};

/**
 * List
 * @prop {array} list contains list items with properties
 */
const List = props => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });

  const getData = id => {
    axiosCall
      .get(`/api/party/${id}/todos`)
      .then(res => {
        dispatch({ type: "FETCH_SUCCESS", list: res.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_FAILURE" });
      });
  };

  useEffect(() => {
    console.log("booty")
    getData(props.partyId);
  }, [props.partyId]);

  const toggleCheck = e => {
    dispatch({ type: "TOGGLE_CHECK", id: e.target.id });
  };

  return (
    <Form>
      {todos.map(item => {
        return (
          <Form.Check
            key={`todo-${item.id}`}
            type="checkbox"
            id={item.id}
            label={item.item}
            checked={item.completed}
            onChange={toggleCheck}
          />
        );
      })}
    </Form>
  );
};

export default List;
