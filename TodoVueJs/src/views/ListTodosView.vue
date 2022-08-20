<script>
import Todo from '../components/Todo.vue';
import TodoModel from '../scripts/TodoModel.js';
import FilterTodo from '../components/FilterTodo.vue';
export default {
    data(){
        return {
            orgTodos: TodoModel.all(),
            todos: this.orgTodos
        };
    },
    mounted(){
        this.setDataUndones();
    },
    components:{
        Todo,
        FilterTodo
    },
    methods:{
        setDataDones(){
            console.log('set data dones...');
            this.todos = this.orgTodos.filter(todo=> todo.done_at!==null);
            console.log('setted.');
        },
        setDataUndones(){
            this.todos = this.orgTodos.filter(todo=> todo.done_at===null);
        },
        setDataAll(){
            this.todos = this.orgTodos;
        }
    },
    emits:[
        'no-block',
        'done-block',
        'undone-block',
    ],

}
</script>

<template>

    <FilterTodo @no-block="setDataAll()"
    @done-block="setDataUndones()"
    @undone-block="setDataDones()"
    />
    
    <Todo 
        v-for="todo in todos"
        :todo="todo"
        :todo-id="todo.id"
    />
</template>
