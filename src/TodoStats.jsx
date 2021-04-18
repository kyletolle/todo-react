import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { observer } from 'mobx-react-lite';
import todoStore from "./ObservableTodoStore";

const UnstyledTodoStats = observer(({ className }) => {
  const { completedTodos, completedTodosCount, incompletedTodosCount, todos, totalTodosCount } = todoStore;
  const lastAddedItem = todos.slice().sort((a, b) => (a.createdAt - b.createdAt)).pop();
  const lastAddedDate = new Date(lastAddedItem?.createdAt);
  const lastAddedTime = lastAddedDate.toLocaleString();


  const lastUpdatedItem = todos.slice().sort((a, b) => (a.updatedAt - b.updatedAt)).pop();
  const lastUpdatedDate = new Date(lastUpdatedItem?.updatedAt);
  const lastUpdatedTime = lastUpdatedDate.toLocaleString();

  const lastCompletedItem = completedTodos.slice().sort((a, b) => (
    a.completedAt - b.completedAt
  )).pop();
  const lastCompletedDate = new Date(lastCompletedItem?.completedAt);
  const lastCompletedTime = lastCompletedDate.toLocaleString();

  return (
    <div className={className}>
      <h1>Stats</h1>
      <p>Total Todos: {totalTodosCount}</p>
      <p>Completed Todos: {completedTodosCount}</p>
      <p>Incompleted Todos: {incompletedTodosCount}</p>
      {lastCompletedItem && (
        <p>Item Last Completed At: {lastCompletedTime}</p>
      )}
      {lastAddedItem && (
        <p>Item Last Added At: {lastAddedTime}</p>
      )}
      {lastUpdatedItem && (
        <p>Item Last Updated At: {lastUpdatedTime}</p>
      )}
    </div>
  )
});

UnstyledTodoStats.propTypes = {
  className: PropTypes.string.isRequired,
};

const TodoStats = styled(UnstyledTodoStats)`
  display: flex;
  flex-direction: column;
  color: white;
  min-width: 15vwmin;
  width: 20vw;


  p {
    padding-left: 1em;
    font-size: calc(8px + 1.5vmin);
  }

  @media screen and (max-width: 480px) {
    width: 85vw;
  }
`;

export default TodoStats;