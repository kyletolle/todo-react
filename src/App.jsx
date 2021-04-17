import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { observer } from 'mobx-react-lite';
import TodoList from "./TodoList";
import TodoStats from "./TodoStats";
import AddTodo from "./AddTodo";
import todoStore from "./ObservableTodoStore";

// Following drag and drop tutorial at
// https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i
const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
}

const UnstyledApp = observer(({ className }) => {
  const { todos } = todoStore;
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

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
      <AddTodo />

      <hr />

     <div className="sideBySide">
        <TodoList
          todoStore={todoStore}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />

      <TodoStats />
     </div>
    </div>
  );
});

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

  hr {
    border: 1px solid #61dafb;
    margin: 2em 0;
    width: 80vw;
  }

  .sideBySide {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2vw;
  }
`;

export default App;
