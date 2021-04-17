import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import todoStore from "./ObservableTodoStore";

function UnstyledAddTodo({ className }) {
  const handleAddTodo = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    const todoElement = document.getElementById("addTodo");
    const newTodoText = todoElement.value;

    todoStore.addTodo(newTodoText)
    todoElement.value = "";
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div className={className}>
        <input type="text" id="addTodo" placeholder="Add a Todo" />
      </div>
    </form>
  );
}

UnstyledAddTodo.propTypes = {
  className: PropTypes.string.isRequired,
};

const AddTodo = styled(UnstyledAddTodo)`
  input[type="text"] {
    border: 1px solid #61dafb;
    border-radius: 0.5em;
    padding: 1em;
    margin: 0 0 1em;
    display: block;
    width: 50em;
    color: white;
    background: #3c4048;
  }

  input::placeholder {
    color: #118aab;
  }
`;

export default AddTodo;
