import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

function App() {
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
    window.localStorage.setItem("tododata", JSON.stringify({ todos: todos }));
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
    // TODO: Delete the TODO
    let newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form" onSubmit={handleAddTodo}>
          <AddTodo />

          <hr />

          <TodoList
            todos={todos}
            handleTodosChanged={handleTodosChanged}
            handleTodoDeleted={handleTodoDeleted}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
