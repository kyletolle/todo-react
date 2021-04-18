import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import todoStore from "./ObservableTodoStore";


const UnstyledTodoItem = observer(({
  className,
  index,
  todo,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const { completed, text } = todo;
  const todoId = `todoItem${index}`;
  const todoKey = `${index}`;
  const todoItemClassName = completed ? "disabled" : "";

  const toggleCompleted = () => {
    /* eslint-disable no-param-reassign */
    todo.completed = !todo.completed
    if (todo.completed) {
      todo.completedAt = Date.now();
    } else {
      todo.completedAt = null;
    }
    todo.updatedAt = Date.now();
    /* eslint-enable no-param-reassign */
  };

  const handleDelete = (event) => {
    event.preventDefault();
    todoStore.deleteTodoAt(index)
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
          onChange={toggleCompleted}
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
  todo: PropTypes.shape({ text: PropTypes.string.isRequired, completed: PropTypes.bool.isRequired}).isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

const TodoItem = styled(UnstyledTodoItem)`
  width: 100%;

  label {
    border: 1px solid #61dafb;
    padding: 1em;
    margin: 0 0 1em;
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
