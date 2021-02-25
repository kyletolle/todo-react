import './App.css';
import { useState }  from 'react'


function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (formSubmitEvent) => {
    const todoElement = document.getElementById('addTodo')
    const todoText = todoElement.value;

    const todo = {
      text: todoText,
      checked: false,
    }

    setTodos([todo, ...todos]);
    todoElement.value = '';
    formSubmitEvent.preventDefault();
  }

  const todoElements = todos.map((todoItem, todoIndex) => {
    const todoId = `todoItem${todoIndex}`;
    const todoKey = `${todoIndex}`;

    const toggleCheckbox = (toggleCheckboxEvent) => {
      console.info("checkbox target...", toggleCheckboxEvent.target);
      console.info("checkbox target value...", toggleCheckboxEvent.target.value);
      const newChecked = !todoItem.checked;
      console.info("isChecked", newChecked)
      const newTodoItem = {
        ...todoItem,
        checked: newChecked,
      };
      const newTodos = [...todos];
      newTodos[todoIndex] = newTodoItem;
      setTodos(newTodos);
    };

    const todoItemClassName = todoItem.checked ? 'disabled' : '';
    return (
      <li key={todoKey} className={todoItemClassName}>
        <label>
          <input type={"checkbox"} id={todoId} checked={todoItem.checked} onChange={toggleCheckbox} />
          {todoItem.text}
        </label>
      </li>
    );
  })

  const emptyStateMessage = <li><p>Try adding a Todo above!</p></li>;
  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form" onSubmit={handleAddTodo}>
          <div>
            <input type={"text"} id="addTodo" placeholder="Add a Todo"></input>
          </div>
          <hr />
          <ul>
            {todoElements.length > 0 ? todoElements : emptyStateMessage }
          </ul>
        </form>
      </header>
    </div>
  );
}

export default App;
