<script>
import { RouterLink, RouterView } from 'vue-router'


export default {
  data(){
    return {
      isNotFoundPage: false
    }
  },

  components:{
    RouterLink,
    RouterView,
  },
  watch:{
    $route(newRoute){
      // console.log(newRoute.redirectedFrom);
      
      this.isNotFoundPage = newRoute.name.startsWith('error');
    }
  },
}
</script>

<template>
  <header v-if="!this.isNotFoundPage">
    <h1>Welcome To Todo Proj !</h1>
  
  </header>
  <nav v-if="!this.isNotFoundPage">
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
