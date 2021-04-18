import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import TodoItem from "./TodoItem";
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

const UnstyledTodoList = observer(({
  className,
}) => {
  const {
    sortedTodos,
    completedTodosCount,
    incompletedTodosCount,
    totalTodosCount,
   } = todoStore;

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const handleDragStart = (dragEvent) => {
    // Access the "data-position" attr of the current element being dragged
    const initialPosition = Number(dragEvent.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: [...sortedTodos],
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

  const sortedTodoData = sortedTodos.map((todoItem, todoIndex) => {
    const todoKey = `${todoIndex}`;

    return {
        completed: todoItem.completed,
        item: (
          <TodoItem
            key={todoKey}
            index={todoIndex}
            todo={todoItem}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        ),
    };
  });

  const incompletedTodoItems  = sortedTodoData
    .filter(({completed}) => !completed)
    .map(({item}) => item);


  const completedTodoItems  = sortedTodoData
    .filter(({completed}) => completed)
    .map(({item}) => item);

  const completedEmptyStateMessage = (
    <li>
      <p>Try checking off a Todo above!</p>
    </li>
  );

  const incompletedEmptyStateMessage = (
    <li>
      <p>Try adding a Todo above!</p>
    </li>
  );

  return (
    <div className={className}>
      <div className='todoGroup'>
        <h1>Todo ({incompletedTodosCount}/{totalTodosCount})</h1>
        <ul>
          {incompletedTodosCount > 0 ? incompletedTodoItems : incompletedEmptyStateMessage}
        </ul>
      </div>

      <div className='todoGroup'>
        <h1>Done ({completedTodosCount}/{totalTodosCount})</h1>
        <ul>
          {completedTodosCount > 0 ? completedTodoItems : completedEmptyStateMessage}
        </ul>
      </div>
    </div>
  );
});

UnstyledTodoList.propTypes = {
  className: PropTypes.string.isRequired,
};

const TodoList = styled(UnstyledTodoList)`
  min-width: 25vwmin;
  width: 50vw;
  border-right: 5px solid #61dafb;
  display: flex;
  flex-direction: column;

  .todoGroup {
    padding-right: 2vw;
    display: flex;
    flex-direction: column;

    h1 {
      border-right: 0;
    }

    ul {
      padding-left: 1em;;
      border: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      li {
        /* Specify this style here so the empty state will get it too. */
        list-style: none;
      }
    }
  }

  @media screen and (max-width: 480px) {
    width: 85vw;
    border-right: 0px;
    border-bottom: 5px solid #61dafb;

    .todoGroup {
      padding-right: 0;
      padding-bottom: 2vw;
    }
  }
`;

export default TodoList;
