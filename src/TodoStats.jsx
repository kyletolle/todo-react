import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { observer } from 'mobx-react-lite';
import todoStore from "./ObservableTodoStore";

const UnstyledTodoStats = observer(({ className }) => {
  const { completedTodosCount, incompletedTodosCount, totalTodosCount } = todoStore;
  return (
    <div className={className}>
      <h1>Stats</h1>
      <p>Total Todos: {totalTodosCount}</p>
      <p>Completed Todos: {completedTodosCount}</p>
      <p>Incompleted Todos: {incompletedTodosCount}</p>
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
  min-width: 25vwmin;
  width: 33vw;

  h1 {
    display: inline;
    font-size: calc(10px + 2vmin);
    width: 50%;
    color: #61dafb;;
    border-bottom: 2px solid #61dafb;
  }

  p {
    font-size: calc(8px + 2vmin);
  }
`;

export default TodoStats;