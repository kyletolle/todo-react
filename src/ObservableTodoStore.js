import { action, autorun, computed, makeObservable, observable } from "mobx";

class ObservableTodoStore {
  constructor() {
    this.todos = [];

    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      incompletedTodosCount: computed,
      addTodo: action,
    })
    /* eslint-disable-next-line no-console */
    autorun(() => console.info(this.report))
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get incompletedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === false
    )
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

  setTodos(newTodos) {
    this.todos = newTodos;
  }
}

const observableTodoStore = new ObservableTodoStore();
export { observableTodoStore as default, ObservableTodoStore };