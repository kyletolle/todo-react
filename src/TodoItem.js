
function TodoItem({index, text, checked, toggleChecked}) {
    const todoId = `todoItem${index}`;
    const todoKey = `${index}`;
    const todoItemClassName = checked ? 'disabled' : '';

    return (
      <li key={todoKey} className={todoItemClassName}>
        <label>
          <input type={"checkbox"} id={todoId} checked={checked} onChange={toggleChecked} />
          <span>
            {text}
          </span>
        </label>
      </li>
    );
}

export default TodoItem;