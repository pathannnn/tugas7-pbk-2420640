<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')
const input_content = ref('')
const post_title = ref('')
const users = ref([])  // To store fetched users
const filtered_users = ref([])  // To store filtered users for the dropdown
const show_dropdown = ref(false)
const selected_user = ref(null)  // To store the selected user

const todos_asc = computed(() => {
    return todos.value.slice().sort((a, b) => a.createdAt - b.createdAt)
})

watch(name, (newVal) => {
    localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
}, {
    deep: true
})

const addTodo = () => {
    if (input_content.value.trim() === '') {
        return
    }

    todos.value.push({
        id: Date.now(),
        content: input_content.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
    })
    input_content.value = ''
}

const addPost = () => {
    if (selected_user.value) {
        todos.value.push({
            id: selected_user.value.id,
            content: `${selected_user.value.name}`,
            done: false,
            editable: false,
            createdAt: new Date().getTime()
        })
        post_title.value = ''
        selected_user.value = null
        show_dropdown.value = false
    }
}

const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t.id !== todo.id)
}

const toggleLineThrough = (todo) => {
    todo.done = !todo.done
}

const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            users.value = data
        })
        .catch(error => {
            console.error('Error fetching users:', error)
        })
}

const filterUsers = (query) => {
    if (query) {
        filtered_users.value = users.value.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        show_dropdown.value = true
    } else {
        show_dropdown.value = false
    }
    selected_user.value = null  // Reset selected user when typing
}

const selectUser = (user) => {
    post_title.value = user.name
    selected_user.value = user
    show_dropdown.value = false
}

onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
        todos.value = JSON.parse(savedTodos)
    }
    fetchUsers()
})
</script>

<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title">
                What's up, <input type="text" id="name" placeholder="Name here" v-model="name">
            </h2>
        </section>

        <section class="create-todo">
            <h3>CREATE A TODO</h3>

            <form id="new-todo-form" @submit.prevent="addTodo">
                <h4>What's on your todo list?</h4>
                <input 
                    type="text" 
                    name="content" 
                    id="content" 
                    placeholder="Write your todo"
                    v-model="input_content" />
                <input type="submit" value="Add todo" />
            </form>
        </section>

        <section class="create-post">
            <form id="new-post-form" @submit.prevent="addPost">
                <h3>POST</h3>
                <input 
                    type="text" 
                    name="title" 
                    id="post-title" 
                    placeholder="Write your post "
                    v-model="post_title"
                    @input="filterUsers(post_title)" />
                <div v-if="show_dropdown" class="dropdown">
                    <ul>
                        <li v-for="user in filtered_users" :key="user.id" @click="selectUser(user)">
                            {{ user.name }}
                        </li>
                    </ul>
                </div>
                <input type="submit" value="Add post" />
            </form>
        </section>

        <section class="todo-list">
            <h3>List</h3>
            <div class="list" id="todo-list">
                <div 
                    v-for="todo in todos_asc" 
                    :key="todo.id" 
                    class="todo-item"
                    :class="{ done: todo.done }"
                    @click="toggleLineThrough(todo)">
                    <label>
                        <input type="checkbox" v-model="todo.done" />
                    </label>

                    <div class="todo-content" :class="{ 'line-through': todo.done }">
                        {{ todo.content }}
                    </div>

                    <div class="actions">
                        <button class="delete" @click="removeTodo(todo)">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.line-through {
    text-decoration: line-through;
}

.dropdown {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

.dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown li {
    padding: 8px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #f0f0f0;
}
</style>
