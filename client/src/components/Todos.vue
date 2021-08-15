<template>
  <div>
    <h1>Todo application</h1>
    <div>
      <input type="text" v-model="title" @keydown.enter="createTodo">
      <button @click="createTodo" :disabled="!canCreateTodo()">Add</button>
    </div>
    <ul v-if="collection.length > 0">
      <div
        v-for="todo in collection"
        :key="todo._id"
      >
        <div>
          <input type="checkbox" :checked="todo.completed" @change="changeTodo(todo._id)">
          <span>{{ todo.title }}</span>
          <button @click="removeTodo(todo._id)">&times;</button>
        </div>
      </div>
    </ul>
    <div v-else>No todos</div>
  </div>
</template>

<script>
import api from "@/providers/api.js";

export default {
  data() {
    return {
      title: "",
      collection: [],
    }
  },
  async mounted() {
    this.fetchTodos();
  },
  methods: {
    canCreateTodo() {
      return this.title.trim().length > 0;
    },
    async fetchTodos() {
      const { data } = await api.getTodos();
      this.collection = data;
    },
    async createTodo() {
      if (!this.canCreateTodo()) return;

      await api.addTodo(this.title);
      this.fetchTodos();
      this.title = "";
    },
    async removeTodo(id) {
      await api.deleteTodo(id);
      this.fetchTodos();
    },
    async changeTodo(id) {
      await api.changeTodoState(id);
      this.fetchTodos;
    }
  }
}
</script>