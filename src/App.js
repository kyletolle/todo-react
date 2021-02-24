import './App.css';
import { useState }  from 'react'


function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (event) => {
    const todoElement = document.getElementById('addTodo')
    const todoText = todoElement.value;

    const todo = {
      text: todoText,
      checked: false,
    }

    setTodos([todo, ...todos]);
    todoElement.value = '';
    event.preventDefault();
  }

  const todoElements = todos.map((todoItem, todoIndex) => {
    const todoId = `todoItem${todoIndex}`;
    const todoKey = `${todoIndex}`;

    const handleChange = (event) => {
      const isChecked = event.target.value === 'on';
      const newTodoItem = {
        ...todoItem,
        checked: isChecked
      };
      const newTodos = [...todos];
      newTodos[todoIndex] = newTodoItem;
      setTodos(newTodos);
    };

    return (
      <div key={todoKey}>
        <label>
          <input type={"checkbox"} id={todoId} checked={todoItem.checked} onChange={handleChange} />
          {todoItem.text}
        </label>
      </div>
    );
  })

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form" onSubmit={handleAddTodo}>
          <div>
            <input type={"text"} id="addTodo" placeholder="Add a Todo"></input>
          </div>
          <hr />
          {todoElements.length > 0 ? todoElements :
          (
            <div>Try adding a Todo above!</div>
          )}
        </form>
      </header>
    </div>
  );
}

export default App;
