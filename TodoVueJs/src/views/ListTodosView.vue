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
            filterSearch: null,
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
        },
        reorderDesc(){
            this.filterOrderIsDesc = true;
        },
        reorder(){
            this.todos.sort(this.reorderFuncBaseOfLastEditTime);
        },
        reorderFuncBaseOfLastEditTime(todoA, todoB, isDesc=this.filterOrderIsDesc){
            let todoADate = new Date(todoA.updated_at || todoA.created_at);
            let todoBDate = new Date(todoB.updated_at || todoB.created_at);

            if(isDesc)
                return todoADate.getTime() > todoBDate.getTime() ? -1:1;
            else
                return todoADate.getTime() < todoBDate.getTime() ? -1:1;

        },

        setSearch(title){
            title = title.trim();
            this.filterSearch = title==''? null : title ;
        },
        search(){
            let regex = new RegExp(this.filterSearch.replaceAll(/\s/g,'').split('').join('.*'),'i');
            return this.todos.filter(todo=> regex.test(todo.title));
        },
        filter(filterCallback){
            console.log('filter...');
            this.todos = filterCallback(this.orgTodos);
        }
    },
    watch:{
        filterOrderIsDesc(isDescNew){
            this.reorder();
        },
        todos(){
            this.reorder();
        }
    },
    computed:{
        getTodos(){
            if(this.filterSearch == null)
                return this.todos;
            return this.search();
        }
    },
    emits:[
        'no-block',
        'done-block',
        'undone-block',

        'reorder-desc',
        'reorder-asc',

        'filter',
        'search',

        'change-todo-status',
    ],

}
</script>

<template>

    <FilterTodo 
    @filter="filter"

    @reorder-desc="reorderDesc"
    @reorder-asc="reorderAsc"

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
