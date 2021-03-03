import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

function UnstyledApp({ className }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Load from localstorage if data is there
    const existingTodoDataString = window.localStorage.getItem("tododata");
    if (!existingTodoDataString) {
      return;
    }

    const existingTodoData = JSON.parse(existingTodoDataString);
    setTodos(existingTodoData.todos);
  }, []);

  useEffect(() => {
    // Write to localstorage when todos change
    window.localStorage.setItem("tododata", JSON.stringify({ todos }));
  }, [todos]);

  const handleAddTodo = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    const todoElement = document.getElementById("addTodo");
    const todoText = todoElement.value;

    const todo = {
      text: todoText,
      checked: false,
    };

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    todoElement.value = "";
  };

  const handleTodosChanged = (newTodos) => {
    setTodos(newTodos);
  };

  const handleTodoDeleted = (todoIndex) => {
    console.info("Handling a Todo Delete");
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <div className={className}>
      <form onSubmit={handleAddTodo}>
        <AddTodo />

        <hr />

        <TodoList
          todos={todos}
          handleTodosChanged={handleTodosChanged}
          handleTodoDeleted={handleTodoDeleted}
        />
      </form>
    </div>
  );
}

UnstyledApp.propTypes = {
  className: PropTypes.string.isRequired,
};

const App = styled(UnstyledApp)`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  form {
    padding-top: 1em;
  }

  hr {
    border: 1px solid #61dafb;
    margin: 2em 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default App;
