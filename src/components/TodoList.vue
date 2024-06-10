<template>
  <div class="container">
    <div class="content">
      <h1>Todo List</h1>
      <div class="input-container">
        <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add new todo" ref="todoInput">
        <button @click="addTodo" class="add-btn">Add</button>
      </div>
      <ul>
        <li v-for="(todo, index) in todos" :key="index" class="todo">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(index)">
          <span :class="{ 'completed-task': todo.completed }">{{ todo.title }}</span>
          <button @click="removeTodo(index)" class="delete-btn">Delete</button>
        </li>
      </ul>
      <p v-show="todos.length === 0" class="no-todos">No tasks remaining</p>
      <p class="remaining-todos">{{ remainingTodos }} remaining out of {{ todos.length }} tasks</p>
    </div>
  </div>
</template>

<script>
import { useTodoStore, watchTodos } from '@/store';

export default {
  data() {
    return {
      newTodo: ''
    };
  },
  computed: {
    todos() {
      const store = useTodoStore();
      return store.todos;
    },
    remainingTodos() {
      const store = useTodoStore();
      return store.remainingTodos;
    }
  },
  methods: {
    addTodo() {
      const store = useTodoStore();
      if (this.newTodo.trim() !== '') {
        store.addTodo({
          title: this.newTodo,
          completed: false
        });
        this.newTodo = '';
        this.$refs.todoInput.focus();
      }
    },
    removeTodo(index) {
      const store = useTodoStore();
      store.removeTodo(index);
    },
    toggleTodo(index) {
      const store = useTodoStore();
      store.toggleTodo(index);
    }
  },
  mounted() {
    const store = useTodoStore();
    store.loadTodos();
    watchTodos(store);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.content {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333333;
}

.input-container {
  display: flex;
  margin-bottom: 20px;
}

.input-container input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 1rem;
}

.input-container .add-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.input-container .add-btn:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

.todo {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.todo:hover {
  background-color: #e2e6ea;
}

.todo input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo span {
  flex: 1;
  font-size: 1.3rem;
  color: #333333;
}

.todo .completed-task {
  text-decoration: line-through;
  color: #888888;
}

.todo .delete-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo .delete-btn:hover {
  background-color: #c82333;
}

.remaining-todos {
  font-size: 1rem;
  color: #666666;
  margin-top: 20px;
}

.no-todos {
  font-size: 1rem;
  font-style: italic;
  color: #666666;
}
</style>
