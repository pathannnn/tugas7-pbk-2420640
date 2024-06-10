import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todo',
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
const store = useTodoStore();
store.$subscribe((mutation, state) => {
  localStorage.setItem('todos', JSON.stringify(state.todos));
});

export default useTodoStore; // tambahkan ini jika Anda ingin mengimpor store ini secara default
