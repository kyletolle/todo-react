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
      <label>
        <input
          type={"checkbox"}
          id={todoId}
          checked={checked}
          onChange={toggleChecked}
        />
        <span className="todoText">{text}</span>
        <span className="delete" onClick={handleDelete}>
          x
        </span>
      </label>
    </li>
  );
}

const TodoItem = styled(UnstyledTodoItem)`
  span.delete {
    opacity: 0.75;
    display: block;
    background-color: darkred;
    border: 1px solid darkred;
    border-radius: 2px;
    padding: 0.25em;
    color: white;
  }
`;

export default TodoItem;
