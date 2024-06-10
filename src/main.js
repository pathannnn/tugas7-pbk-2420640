import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useTodoStore } from '@/store';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia); // Inisialisasi Pinia di sini

const store = useTodoStore(pinia); // Gunakan Pinia di sini

// Panggil loadTodos setelah Pinia diinisialisasi
store.loadTodos();

app.mount('#app');
