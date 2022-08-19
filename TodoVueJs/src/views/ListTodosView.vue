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
        :id="todo.id"
        :title="todo.title"
        :description="todo.description"
        :due-at="new Date(todo.due_at)"
        :done-at="new Date(todo.done_at)"
        
        :created-at="new Date(todo.created_at)"
        :updated-at="new Date(todo.updated_at)"
    />
</template>
