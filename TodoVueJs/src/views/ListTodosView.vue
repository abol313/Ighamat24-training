<script>
import Todo from '../components/Todo.vue';
import TodoModel from '../scripts/TodoModel.js';
import FilterTodo from '../components/FilterTodo.vue';
export default {
    data(){
        return {
            orgTodos: TodoModel.all(),
            todos: this.orgTodos,
            filterSearch: null,
        };
    },
    mounted(){

    },
    components:{
        Todo,
        FilterTodo
    },
    methods:{


        onChangeTodoStatus(todo, isDone){
            // todo.done_at = isDone? new Date(): null;
            // if(this.filterMode=='all')return;

            // if(this.filterMode=='dones' && !isDone){
            //     this.todos = this.todos.filter(aTodo=> aTodo!=todo);
            // }
            // if(this.filterMode=='undones' && isDone){
            //     console.log('changed todo statyus :',todo)
            //     this.todos = this.todos.filter(aTodo=> aTodo!=todo);
            // }
            
        },



        filter(filterCallback){
            console.log('filter...');
            this.todos = filterCallback(this.orgTodos);
        },
        setSearch(searchText){
            this.filterSearch = searchText;
        }
    },
    watch:{

    },
    computed:{
        getTodos(){
            return this.todos;
        }
    },
    emits:[
        'filter',
        'search',

        'change-todo-status',
    ],

}
</script>

<template>

    <FilterTodo 
    @filter="filter"

    @search="setSearch"
    />
    
    <div class="todos">
        <Todo 
            v-for="todo in getTodos"
            :todo="todo"
            @change-todo-status="onChangeTodoStatus"
            :search="filterSearch"
        />
    </div>

</template>
