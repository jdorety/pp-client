import React, { useEffect, useReducer, useState } from "react";
import {
  Alert,
  Container,
  Form,
  InputGroup,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import logger from "use-reducer-logger";
import {
  TODO_LOAD,
  TODO_UPDATE,
  TODO_FAILURE,
  TOGGLE_START,
  TOGGLE_SUCCESS,
  TOGGLE_FAILURE,
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "../../util/actionVars";
import axios from "../../util/axios";
import TodoReducer from "../../reducers/TodoReducer";

const axiosCall = axios.axiosHeaders();

/**
 * List
 * @prop {number} partyId this party's id number in the backend database
 */
const List = props => {
  const [state, dispatch] = useReducer(logger(TodoReducer), {
    todos: [],
    loading: false,
    error: "",
    updating: false
  });

  const [item, setItem] = useState("");

  useEffect(() => {
    dispatch({ type: TODO_LOAD });
    fetchTodos();
  }, []);

  const textHandler = e => {
    setItem(e.target.value);
  };

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
      // get index of entry in array from name attribute
      const i = e.target.name;
      // create new object duplicating orginal entry with completed field inverted
      const toggledItem = {
        ...state.todos[e.target.name],
        completed: !state.todos[e.target.name].completed
      };
      // reducer changes local state to reflect changes
      dispatch({ type: TOGGLE_START, index: i, item: toggledItem });
      // send request to toggle item on backend
      const response = await axiosCall.put(
        `/api/todos/${toggledItem.id}`,
        toggledItem
      );
      // successfult response dispatches success, updates todo list from server
      // Maybe get rid of update from server, since a successful put should
      // mean that local and backend status are the same?
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

  const addItem = e => {
    e.preventDefault();
    const newItem = {
      item: item,
      completed: false,
      party_id: props.partyId
    };
    dispatch({ type: ADD_ITEM_START, item: newItem });
    axiosCall
      .post(`/api/todos`, newItem)
      .then(res => {
        dispatch({ type: ADD_ITEM_SUCCESS });
        console.log(res);
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ADD_ITEM_FAILURE, error: err.message });
      });
  };

  return (
    <>
      {state.error && <Alert variant="danger">{state.error}</Alert>}
      <ListGroup className="mb-3">
        {state.todos.map((item, index) => {
          return (
            <ListGroupItem key={`todo-${item.id}`}>
              <Form.Check
                type="checkbox"
                label={item.item}
                checked={item.completed}
                name={index}
                onChange={toggleHandler}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <Form onSubmit={addItem}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-primary" onClick={addItem}>
              +
            </Button>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            placeholder="Add new item..."
            value={item}
            onChange={textHandler}
          />
        </InputGroup>
      </Form>
    </>
  );
};

export default List;
