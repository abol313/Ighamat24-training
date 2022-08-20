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
            filterOrderIsDesc: true,
        };
    },
    mounted(){
        this.setDataUndones();
        this.reorderDesc();
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

        },
        reorderAsc(){
            this.filterOrderIsDesc = false;
            this.todos.sort(this.reorderFuncBaseOfLastEditTime);
        },
        reorderDesc(){
            this.filterOrderIsDesc = true;
            this.todos.sort(this.reorderFuncBaseOfLastEditTime);
        },
        reorderFuncBaseOfLastEditTime(todoA, todoB, isDesc=this.filterOrderIsDesc){
            let todoADate = new Date(todoA.updated_at || todoA.created_at);
            let todoBDate = new Date(todoB.updated_at || todoB.created_at);

            if(isDesc)
                return todoADate.getTime() > todoBDate.getTime() ? -1:1;
            else
                return todoADate.getTime() < todoBDate.getTime() ? -1:1;

        }
    },
    emits:[
        'no-block',
        'done-block',
        'undone-block',

        'reorder-desc',
        'reorder-asc',

        'change-todo-status',
    ],

}
</script>

<template>

    <FilterTodo @no-block="setDataAll()"
    @done-block="setDataUndones()"
    @undone-block="setDataDones()"

    @reorder-desc="reorderDesc"
    @reorder-asc="reorderAsc"
    />
    
    <Todo 
        v-for="todo in todos"
        :todo="todo"
        @change-todo-status="onChangeTodoStatus"
    />
</template>
