import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import TodoItem from "./TodoItem";
import { ObservableTodoStore } from "./ObservableTodoStore";

const UnstyledTodoList = observer(({
  className,
  todoStore,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const { todos } = todoStore;
  const todoItems = todos.map((todoItem, todoIndex) => {
    const toggleCheckbox = () => {
      // eslint-disable-next-line no-param-reassign
      todoItem.completed = !todoItem.completed
    };

    const todoKey = `${todoIndex}`;
    return (
      <TodoItem
        key={todoKey}
        todoStore={todoStore}
        index={todoIndex}
        text={todoItem.text}
        completed={todoItem.completed}
        toggleChecked={toggleCheckbox}
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
  todoStore: PropTypes.instanceOf(ObservableTodoStore).isRequired,
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
