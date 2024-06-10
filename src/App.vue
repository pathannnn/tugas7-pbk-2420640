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
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  computed: {
    remainingTodos() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          title: this.newTodo,
          completed: false
        });
        this.newTodo = '';
        this.$refs.todoInput.focus();
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  mounted() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  },
  watch: {
    todos: {
      handler(newTodos) {
        localStorage.setItem('todos', JSON.stringify(newTodos));
      },
      deep: true
    }
  }
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  margin-left: 28rem;
  min-height: 10rem;
}

.content {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: black;
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
}

.input-container .add-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-container .add-btn:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

.todo input[type="checkbox"] {
  margin-right: 10px;
}

.todo span {
  flex: 1;
  color: black;
}

.todo .completed-task {
  flex: 1;
  color: black;
  text-decoration: line-through;
}

.todo .delete-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo .delete-btn:hover {
  background-color: #c82333;
}

.remaining-todos {
  font-size: 14px;
  text-align: right;
  color: black; 
}

.no-todos {
  font-size: 14px;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
  color: black;
}
</style>
