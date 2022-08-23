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
            filterCallback: null,
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
            this.filterCallback = filterCallback;
            this.todos = this.filterCallback(this.orgTodos);
        },
        refilter(){
            this.todos = this.filterCallback(this.orgTodos);
        },
        setSearch(searchText){
            this.filterSearch = searchText;
        },

        requery(){
            console.log('requery');
            this.orgTodos = TodoModel.all();
            this.refilter();
        },
        rerender(){
            console.log('rerender');
            this.refilter();
            this.$forceUpdate();
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

        'requery',
        'rerender',

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
            @requery="this.requery()"
            @rerender="this.rerender()"
        />
    </div>

</template>
