import React from 'react';
import styled from "@emotion/styled";

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
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
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

const TodoItem = styled(UnstyledTodoItem)`
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
