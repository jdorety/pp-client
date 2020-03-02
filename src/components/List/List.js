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
      if (copy[action.id]["completed"]) {
        copy[action.id]["completed"] = !copy[action.id]["completed"];
      } else {
        copy[action.id]["completed"] = true
      }
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
    console.log("booty");
    getData(props.partyId);
  }, [props.partyId]);

  const toggleCheck = e => {
    dispatch({ type: "TOGGLE_CHECK", id: e.target.id });
    axiosCall
      .put(`api/todos/${e.target.name}`, {
        ...todos[e.target.id],
        completed: !todos[e.target.id]
      })
      .then(res => getData(props.partyId))
      .catch(err => console.log(err));
  };

  return (
    <Form>
      {todos.map((item, index) => {
        return (
          <Form.Check
            key={`todo-${item.id}`}
            type="checkbox"
            id={index}
            label={item.item}
            checked={item.completed}
            onChange={toggleCheck}
            name={item.id}
          />
        );
      })}
    </Form>
  );
};

export default List;
