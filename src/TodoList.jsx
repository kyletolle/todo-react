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
  const { todos } = todoStore;
  const todoItems = todos.map((todoItem, todoIndex) => {

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

  const emptyStateMessage = (
    <li>
      <p>Try adding a Todo above!</p>
    </li>
  );

  return (
    <ul className={className}>
      {todoItems.length > 0 ? todoItems : emptyStateMessage}
    </ul>
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
  width: 40vw;
  border-right: 5px solid #61dafb;
  padding-right: 2vw;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    /* Specify this style here so the empty state will get it too. */
    list-style: none;
  }
`;

export default TodoList;
