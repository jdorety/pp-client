import React, { useEffect, useReducer } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import {
  TODO_LOAD,
  TODO_UPDATE,
  TODO_FAILURE,
  TOGGLE_START,
  TOGGLE_SUCCESS,
  TOGGLE_FAILURE
} from "../../util/actionVars";
import axios from "../../util/axios";
import TodoReducer from "../../reducers/TodoReducer";

const axiosCall = axios.axiosHeaders();

/**
 * List
 * @prop {number} partyId this party's id number in the backend database
 */
const List = props => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: [],
    loading: false,
    error: "",
    updating: false
  });

  useEffect(() => {
    dispatch({ type: TODO_LOAD });
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axiosCall
      .get(`/api/party/${props.partyId}/todos`)
      .then(res => {
        console.log(res);
        dispatch({ type: TODO_UPDATE, list: res.data });
      })
      .catch(err => {
        console.log(err.message);
        dispatch({ type: TODO_FAILURE, error: err.message });
      });
  };

  const toggleHandler = async e => {
    try {
      console.log(e.target.name);
      const i = e.target.name;
      const toggledItem = {
        ...state.todos[e.target.name],
        completed: !state.todos[e.target.name].completed
      };
      console.log(toggledItem);
      dispatch({ type: TOGGLE_START, index: i, item: toggledItem });
      const response = await axiosCall.put(
        `/api/todos/${toggledItem.id}`,
        toggledItem
      );
      if (response.data === 1) {
        dispatch({ type: TOGGLE_SUCCESS });
        fetchTodos();
      } else {
        dispatch({ type: TOGGLE_FAILURE, error: "Unable to edit" });
      }
    } catch (err) {
      dispatch({ type: TOGGLE_FAILURE, error: err.message });
    }
  };

  return (
    <Container>
      {state.error && <Alert variant="danger">{state.error}</Alert>}
      <Form>
        {state.todos.map((item, index) => {
          return (
            <Form.Check
              key={`todo-${item.id}`}
              type="checkbox"
              label={item.item}
              checked={!item.completed}
              name={index}
              onChange={toggleHandler}
            />
          );
        })}
      </Form>
    </Container>
  );
};

export default List;
