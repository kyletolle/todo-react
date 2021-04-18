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


  p {
    padding-left: 1em;
    font-size: calc(8px + 1.5vmin);
  }

  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

export default TodoStats;