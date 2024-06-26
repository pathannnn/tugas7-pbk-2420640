import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  getters: {
    remainingTodos: (state) => {
      return state.todos.filter(todo => !todo.completed).length;
    }
  },
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  }
});

// Watcher untuk menyimpan state ke localStorage
export const watchTodos = (store) => {
  store.$subscribe((mutation, state) => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  });
};
