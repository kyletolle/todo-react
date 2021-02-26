import TodoItem from './TodoItem';

function TodoList({todos, handleTodosChanged}) {
  const todoItems = todos.map((todoItem, todoIndex) => {
    const toggleCheckbox = _ => {
      const newChecked = !todoItem.checked;
      const newTodoItem = {
        ...todoItem,
        checked: newChecked,
      };
      const newTodos = [...todos];
      newTodos[todoIndex] = newTodoItem;
      handleTodosChanged(newTodos);
    };

    return <TodoItem index={todoIndex} text={todoItem.text} checked={todoItem.checked} toggleChecked={toggleCheckbox} />
  })

  const emptyStateMessage = <li><p>Try adding a Todo above!</p></li>;

  return (
    <ul>
      {todoItems.length > 0 ? todoItems : emptyStateMessage }
    </ul>
  );
}

export default TodoList;