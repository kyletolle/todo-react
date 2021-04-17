import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function UnstyledTodoList({
  className,
  todos,
  handleTodosChanged,
  handleTodoDeleted,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) {
  const todoItems = todos.map((todoItem, todoIndex) => {
    const toggleCheckbox = () => {
      const newChecked = !todoItem.checked;
      const newTodoItem = {
        ...todoItem,
        checked: newChecked,
      };
      const newTodos = [...todos];
      newTodos[todoIndex] = newTodoItem;
      handleTodosChanged(newTodos);
    };

    const todoKey = `${todoIndex}`;
    return (
      <TodoItem
        key={todoKey}
        index={todoIndex}
        text={todoItem.text}
        checked={todoItem.checked}
        toggleChecked={toggleCheckbox}
        handleTodoDeleted={handleTodoDeleted}
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
}

UnstyledTodoList.propTypes = {
  className: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf({ text: PropTypes.string, checked: PropTypes.bool })
    .isRequired,
  handleTodosChanged: PropTypes.func.isRequired,
  handleTodoDeleted: PropTypes.func.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

const TodoList = styled(UnstyledTodoList)`
  li {
    /* Specify this style here so the empty state will get it too. */
    list-style: none;
  }
`;

export default TodoList;
