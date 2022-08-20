<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Welcome To Todo Proj !</h1>
  
  </header>
  <nav>
    <ul>
      <li>
        <router-link to="/new">
          <h2>Create A Todo</h2>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <h2>List Todos</h2>
        </router-link>
      </li>
    </ul>
  </nav>

  <RouterView />
</template>

<style scoped>

</style>
