import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';


const UnstyledTodoItem = observer(({
  className,
  index,
  text,
  completed,
  toggleChecked,
  handleTodoDeleted,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const todoId = `todoItem${index}`;
  const todoKey = `${index}`;
  const todoItemClassName = completed ? "disabled" : "";

  const handleDelete = (event) => {
    event.preventDefault();
    handleTodoDeleted(index);
  };

  return (
    <li
      key={todoKey}
      className={`${className} ${todoItemClassName}`}
      draggable
      data-position={index}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >

      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label>
        <span className="dragIcon">≔</span>
        <input
          type="checkbox"
          id={todoId}
          checked={completed}
          onChange={toggleChecked}
        />
        <span className="todoText">{text}</span>
        <button type="button" className="delete" onClick={handleDelete}>
          x
        </button>
      </label>
    </li>
  );
});

UnstyledTodoItem.propTypes = {
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  handleTodoDeleted: PropTypes.func.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

const TodoItem = styled(UnstyledTodoItem)`
  label {
    border: 1px solid #61dafb;
    padding: 1em;
    margin: 0 0 1em;
    width: 15em;
    display: flex;
    flex-direction: row;
    align-items: center;

    :hover {
      background: #c5ffff;
      cursor: pointer;
      color: #3c4048;
    }

    span.todoText {
      flex-grow: 2;
    }
  }

  input[type="checkbox"] {
    margin-right: 1em;
    min-width: 2em;
    min-height: 2em;
  }

  &.disabled {
    label {
      color: grey;
      border: 1px solid grey;

      :hover {
        background: #464a52;
        cursor: pointer;
      }
    }

    input[type="checkbox"] {
      border: 1px solid grey;
      opacity: 0.5;
    }
  }

  .delete {
    opacity: 0.75;
    background-color: darkred;
    border: 1px solid red;
    border-radius: 2px;
    height: 2em;
    width: 2em;
    color: white;
    text-align: center;
  }

  .dragIcon {
    cursor: grab;
  }
`;

export default TodoItem;
