<template>
    <div>
      <h2>Todos</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todos: [
          { id: 1, title: 'Todo 1' },
          { id: 2, title: 'Todo 2' },
          // Add more todos here
        ]
      }
    }
  }
  </script>