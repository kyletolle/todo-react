import './App.css';
import { useEffect, useState }  from 'react'
import TodoList from './TodoList';
import AddTodo from './AddTodo';

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

  const handleTodosChanged = newTodos => {
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form" onSubmit={handleAddTodo}>
          <AddTodo />
          <hr />

          <TodoList todos={todos} handleTodosChanged={handleTodosChanged} />
        </form>
      </header>
    </div>
  );
}

export default App;
