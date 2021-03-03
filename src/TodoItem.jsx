import React from 'react';
import styled from "@emotion/styled";
import PropTypes from 'prop-types';

function UnstyledTodoItem({
  className,
  index,
  text,
  checked,
  toggleChecked,
  handleTodoDeleted,
}) {
  const todoId = `todoItem${index}`;
  const todoKey = `${index}`;
  const todoItemClassName = checked ? "disabled" : "";

  const handleDelete = (event) => {
    event.preventDefault();
    handleTodoDeleted(index);
  };

  return (
    <li key={todoKey} className={`${className} ${todoItemClassName}`}>
      <label>
        <input
          type="checkbox"
          id={todoId}
          checked={checked}
          onChange={toggleChecked}
        />
        <span className="todoText">{text}</span>
        <button type="button" className="delete" onClick={handleDelete}>
          x
        </button>
      </label>
    </li>
  );
}

UnstyledTodoItem.propTypes = {
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  handleTodoDeleted: PropTypes.func.isRequired
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
  }

  label:hover {
    background: #c5ffff;
    cursor: pointer;
    color: #3c4048;
  }

  input[type="checkbox"] {
    margin-right: 1em;
    min-width: 2em;
    min-height: 2em;
  }

  label span.todoText {
    flex-grow: 2;
  }

  li.disabled label {
    color: grey;
    border: 1px solid grey;
  }

  li.disabled label:hover {
    background: #464a52;
    cursor: pointer;
  }

  li.disabled input[type="checkbox"] {
    border: 1px solid grey;
    opacity: 0.5;
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
`;

export default TodoItem;
