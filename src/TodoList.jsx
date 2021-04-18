import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import TodoItem from "./TodoItem";
import todoStore from "./ObservableTodoStore";

const UnstyledTodoList = observer(({
  className,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const {
    completedTodos,
    completedTodosCount,
    incompletedTodos,
    incompletedTodosCount,
   } = todoStore;

  const incompletedTodoItems = incompletedTodos.map((todoItem, todoIndex) => {
    const todoKey = `${todoIndex}`;
    return (
      <TodoItem
        key={todoKey}
        index={todoIndex}
        todo={todoItem}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
    );
  });

  const completedTodoItems = completedTodos.map((todoItem, todoIndex) => {
    const todoKey = `${todoIndex}`;
    return (
      <TodoItem
        key={todoKey}
        index={todoIndex}
        todo={todoItem}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
    );
  });

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
        <h1>Todo</h1>
        <ul>
          {incompletedTodosCount > 0 ? incompletedTodoItems : incompletedEmptyStateMessage}
        </ul>
      </div>

      <div className='todoGroup'>
        <h1 className={className}>Done</h1>
        <ul>
          {completedTodosCount > 0 ? completedTodoItems : completedEmptyStateMessage}
        </ul>
      </div>
    </div>
  );
});

UnstyledTodoList.propTypes = {
  className: PropTypes.string.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
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
