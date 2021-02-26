import './App.css';
import { useEffect, useState }  from 'react'
import TodoItem from './TodoItem';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Load from localstorage if data is there
    const existingTodoDataString = window.localStorage.getItem('tododata');
    if (!existingTodoDataString) { return; }

    const existingTodoData = JSON.parse(existingTodoDataString);
    setTodos(existingTodoData.todos)
  }, []);

  useEffect(() => {
    // Write to localstorage when todos change
    window.localStorage.setItem('tododata', JSON.stringify({ todos: todos }));
  }, [todos])

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

    return <TodoItem index={todoIndex} text={todoItem.text} checked={todoItem.checked} toggleChecked={toggleCheckbox} />
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
