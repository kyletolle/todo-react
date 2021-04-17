import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { observer } from 'mobx-react-lite';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { ObservableTodoStore } from "./ObservableTodoStore";

// Following drag and drop tutorial at
// https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i
const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}

const UnstyledApp = observer(({ className, todoStore }) => {
  const { todos } = todoStore;
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  useEffect(() => {
    // Load from localstorage if data is there
    const existingTodoDataString = window.localStorage.getItem("tododata");
    if (!existingTodoDataString) {
      return;
    }

    const existingTodoData = JSON.parse(existingTodoDataString);
    const loadedTodos = existingTodoData.todos;
    todoStore.setTodos(loadedTodos)
  }, []);

  useEffect(() => {
    // Write to localstorage when todos change
    window.localStorage.setItem("tododata", JSON.stringify({ todos }));
  }, [todos]);

  const handleAddTodo = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    const todoElement = document.getElementById("addTodo");
    const newTodoText = todoElement.value;

    todoStore.addTodo(newTodoText)
    todoElement.value = "";
  };

  const handleTodosChanged = (newTodos) => {
    todoStore.setTodos(newTodos);
  };

  const handleTodoDeleted = (todoIndex) => {
    console.info("Handling a Todo Delete");
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    todoStore.setTodos(newTodos);
  };

  const handleDragStart = (dragEvent) => {
    // Access the "data-position" attr of the current element being dragged
    const initialPosition = Number(dragEvent.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: todos,
    });

    // Note: This is only needed for Firefox.
    // Otherwise, DragAndDrop won't work.
    // But we aren't using it.
    dragEvent.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (dragEvent) => {
    dragEvent.preventDefault();

    let newTodos = dragAndDrop.originalOrder;
    const { draggedFrom } = dragAndDrop;

    // Index of the drop area being hovered
    const draggedTo = Number(dragEvent.currentTarget.dataset.position);
    // Get the element that's at the position of 'draggedFrom'
    const todoDragged = newTodos[draggedFrom];
    const remainingItems = newTodos.filter((item, index) => index !== draggedFrom);

    // Update the list
    newTodos = [
      ...remainingItems.slice(0, draggedTo),
      todoDragged,
      ...remainingItems.slice(draggedTo),
    ];

    // Since this event fires many times, check if the targets are different
    // before updating.
    if(draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({...dragAndDrop,
      updatedOrder: newTodos,
      draggedTo,
    })
    }
  };

  const handleDrop = () => {
    todoStore.setTodos(dragAndDrop.updatedOrder);

    // Reset the state of the drag and drop
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  }

  return (
    <div className={className}>
      <form onSubmit={handleAddTodo}>
        <AddTodo />

        <hr />

        <TodoList
          todoStore={todoStore}
          handleTodosChanged={handleTodosChanged}
          handleTodoDeleted={handleTodoDeleted}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      </form>
    </div>
  );
});

UnstyledApp.propTypes = {
  className: PropTypes.string.isRequired,
  todoStore: PropTypes.instanceOf(ObservableTodoStore).isRequired,
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
