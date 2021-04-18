import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { observer } from 'mobx-react-lite';
import TodoList from "./TodoList";
import TodoStats from "./TodoStats";
import AddTodo from "./AddTodo";

const UnstyledApp = observer(({ className }) => (
    <div className={className}>
      <AddTodo />

      <hr />

     <div className="sideBySide">
        <TodoList />

      <TodoStats />
     </div>
    </div>
  ));

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
  font-size: calc(10px + 1.5vmin);
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

  h1 {
    font-size: calc(10px + 1.5vmin);
    width: 50%;
    color: #61dafb;;
    border-bottom: 2px solid #61dafb;
  }

  @media screen and (max-width: 480px) {
    border-right: 0px;
    border-bottom: 5px solid #61dafb;

    .sideBySide {
      flex-direction: column;
    }
  }
`;

export default App;
