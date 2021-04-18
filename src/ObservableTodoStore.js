import { action, autorun, computed, makeObservable, observable } from "mobx";

class ObservableTodoStore {
  constructor() {
    this.todos = [];

    makeObservable(this, {
      todos: observable,
      sortedTodos: computed,
      completedTodosCount: computed,
      incompletedTodosCount: computed,
      totalTodosCount: computed,
      loadTodos: action,
      addTodo: action,
      deleteTodoAt: action,
    })
    /* eslint-disable-next-line no-console */
    autorun(() => console.info(this.report))
    this.loadTodos();
    autorun(() => this.saveTodos());
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  get completedTodosCount() {
    return this.completedTodos.length;
  }

  get incompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  get incompletedTodosCount() {
    return this.incompletedTodos.length;
  }

  get totalTodosCount() {
    return this.todos.length;
  }

  get sortedTodos() {
    return this.incompletedTodos.concat(this.completedTodos);
  }

  get report() {
    if (this.todos.length ===  0) {
      return "<none>";
    }
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.text : "<none>"}". ` +
    `Progress: ${this.completedTodosCount}/${this.todos.length}}`;
  }

  addTodo(text) {
    this.todos.push({
      text,
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      assignee: null,
    });
  }

  loadTodos() {
    // Load from localstorage if data is there
    const existingTodoDataString = window.localStorage.getItem("tododata");
    if (!existingTodoDataString || existingTodoDataString === '') {
      return;
    }

    const existingTodoData = JSON.parse(existingTodoDataString);
    const loadedTodos = existingTodoData.todos;
    this.todos = loadedTodos;
  }

  deleteTodoAt(todoIndex) {
    const { sortedTodos } = this;
    const newTodos = [...sortedTodos];
    newTodos.splice(todoIndex, 1);
    this.setTodos(newTodos);
  }

  saveTodos() {
    const { sortedTodos } = this;
    window.localStorage.setItem("tododata", JSON.stringify({ todos: sortedTodos }));
  }

  setTodos(newTodos) {
    this.todos = newTodos;
  }
}

const observableTodoStore = new ObservableTodoStore();
export { observableTodoStore as default, ObservableTodoStore };