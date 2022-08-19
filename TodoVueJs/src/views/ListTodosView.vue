<script>
import Todo from '../components/Todo.vue';
import TodoModel from '../scripts/TodoModel.js';
export default {
    data(){
        return {
            todos: TodoModel.all()

        };
    },
    components:{
        Todo
    }
}
</script>

<template>

    <Todo 
        v-for="todo in todos"
        :todo="todo"
    />
</template>
