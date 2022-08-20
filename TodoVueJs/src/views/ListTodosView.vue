<script>
import Todo from '../components/Todo.vue';
import TodoModel from '../scripts/TodoModel.js';
import FilterTodo from '../components/FilterTodo.vue';
export default {
    data(){
        return {
            orgTodos: TodoModel.all(),
            todos: this.orgTodos,
            filterMode: 'undones',
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
            this.todos = this.orgTodos.filter(todo=> todo.done_at!==null);
            this.filterMode = 'dones';
        },
        setDataUndones(){
            this.todos = this.orgTodos.filter(todo=> todo.done_at===null);
            this.filterMode = 'undones';
        },
        setDataAll(){
            this.todos = this.orgTodos;
            this.filterMode = 'all';
        },
        onChangeTodoStatus(todo, isDone){
            todo.done_at = isDone? new Date(): null;
            if(this.filterMode=='all')return;

            if(this.filterMode=='dones' && !isDone){
                this.todos = this.todos.filter(aTodo=> aTodo!=todo);
            }
            if(this.filterMode=='undones' && isDone){
                console.log('changed todo statyus :',todo)
                this.todos = this.todos.filter(aTodo=> aTodo!=todo);
            }

        }
    },
    emits:[
        'no-block',
        'done-block',
        'undone-block',
        'change-todo-status'
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
        @change-todo-status="onChangeTodoStatus"
    />
</template>
