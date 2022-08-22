<script>
import FilterLogo from './icons/filter.vue';
import CheckLogo from './icons/check.vue';
export default {
    data() {
        return {
            searchText: null,

            filters:{
                /**
                 * filter :
                 * {
                 *     ! The order of filters in filters object is important
                 *     ! You should have either pipeItem or pipeAll of every filter
                 *     pipeEach: item=>item //gets every item and will be passed on every item and return piped item
                 *     pipeAll: items=>items //gets all items and returns piped items
                 *     enabled: true/false //this filter pass or not on filtering
                 *     isIncluded: true/false //use in pipeEach mode and include means in addition or plus others while exclude means just others
                 * }
                 */
                all:{
                    pipeEach: todo => true,
                    isIncluded: true,
                    enabled:false,
                },

                done:{
                    pipeEach: todo => todo.done_at!==null,
                    isIncluded: true,
                    enabled:false,
                },
  
                undone:{
                    pipeEach: todo => todo.done_at===null,
                    isIncluded: true,
                    enabled:true,

                },
  
                dead:{
                    pipeEach: todo =>!todo.done_at && new Date(todo.due_at) < new Date(),
                    isIncluded: true,
                    enabled:false,
                },

                search:{
                    pipeAll: todos => this.passSearch(todos),
                    enabled:false
                },

                sortAscLastEdit:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastEdit(a, b, false)),
                    enabled: false,
                },
                
                sortDescLastEdit:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastEdit(a, b, true)),
                    enabled: true,
                },


                sortAscLastDue:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastDue(a, b, false)),
                    enabled: false,
                },
                
                sortDescLastDue:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastDue(a, b, true)),
                    enabled: false,
                },


                sortAscLastDone:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastDone(a, b, false)),
                    enabled: false,
                },
                
                sortDescLastDone:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastDone(a, b, true)),
                    enabled: false,
                },


                
            }
        };
    },
    methods: {
        filter(){
            this.$emit('filter',this.filterCallback);
        },
        toggleFilterDone(){
            this.filters.done.enabled = !this.filters.done.enabled;
        },
        toggleFilterUndone(){
            this.filters.undone.enabled = !this.filters.undone.enabled;
        },
        toggleFilterDead(){
            this.filters.dead.enabled = !this.filters.dead.enabled;
        },
        toggleFilterAll(){
            if(this.filters.all.enabled = !this.filters.all.enabled){
                this.filters.done.enabled = false;
                this.filters.undone.enabled = false;
                this.filters.dead.enabled = false;
            }
        },

        setSort(sort){
            this.filters.sortAscLastDone.enabled = false;
            this.filters.sortDescLastDone.enabled = false;

            this.filters.sortAscLastDue.enabled = false;
            this.filters.sortDescLastDue.enabled = false;

            this.filters.sortAscLastEdit.enabled = false;
            this.filters.sortDescLastEdit.enabled = false;

            this.filters[sort].enabled = true
        },
        sortLastEdit(todoA, todoB, isDesc=true){
            let todoADate = new Date(todoA.updated_at || todoA.created_at);
            let todoBDate = new Date(todoB.updated_at || todoB.created_at);

            if(isDesc)
                return todoADate.getTime() > todoBDate.getTime() ? -1:1;
            else
                return todoADate.getTime() < todoBDate.getTime() ? -1:1;

        },
        sortLastDue(todoA, todoB, isDesc=true){
            let todoADate = new Date(todoA.due_at);
            let todoBDate = new Date(todoB.due_at);

            if(isDesc)
                return todoADate.getTime() > todoBDate.getTime() ? -1:1;
            else
                return todoADate.getTime() < todoBDate.getTime() ? -1:1;
        },
        sortLastDone(todoA, todoB, isDesc=true){
            let todoADate = new Date(todoA.done_at);
            let todoBDate = new Date(todoB.done_at);

            if(isDesc)
                return todoADate.getTime() > todoBDate.getTime() ? -1:1;
            else
                return todoADate.getTime() < todoBDate.getTime() ? -1:1;
        },
        passSearch(todos){
            // debugger;
            let regex = new RegExp(this.searchText.replaceAll(/\s/g,'').split('').join('.*'),'i');
            return todos.filter(todo => regex.test(todo.title));
        },

        filterCallback(orgTodos){
            let filteredTodos = [];
            let unfilteredTodos = [...orgTodos];

            // debugger;
            for(const filter of Object.values(this.filters)){
                if(!filter.enabled)continue;

                if(filter.pipeEach){

                    for(let i=0; i<unfilteredTodos.length ; i++){

                        let unfilteredTodo = unfilteredTodos[i];

                        let piped = filter.pipeEach(unfilteredTodo);
                        //if it is boolean handled existance of item else the returned value from piping will be passed
                        if(piped===true || piped===false){
                            if(piped===true){
                                if(filter.isIncluded)
                                    filteredTodos.push(unfilteredTodo);
                                unfilteredTodos.splice(i--,1);
                            }
                        }else{
                            filteredTodos.push(piped);
                            unfilteredTodos.splice(i--,1);
                        }

                    }

                    
                }else if(filter.pipeAll){
                    filteredTodos = filter.pipeAll(filteredTodos);
                }
            }


            return filteredTodos;

        },
 
    },
    watch: {
        searchText(newText, oldText) {
            if(this.filters.search.enabled = !!newText.trim() || oldText.trim()){
                this.$emit('search',this.searchText);
                this.filter();
            }
        },

        filters:{
            handler(){
                if(
                    this.filters.dead.enabled ||
                    this.filters.done.enabled ||
                    this.filters.undone.enabled 
                ){
                    this.filters.all.enabled = false;
                }
                this.filter();
            },
            deep:true
        }
    },
    components: {
        FilterLogo,
        CheckLogo,
    },
    mounted(){
        this.filter();
    }
}
</script>

<template>
    <div class="filter-box">
        <div class="block">
            <div class="title">
                <p>Filter</p>
                <FilterLogo class="filter-logo"/>
            </div>

            <div :class="{'status':true, 'status-done':this.filters.all.enabled}" @click="toggleFilterAll">
                <p>All</p>
                <CheckLogo class="check-logo" v-if="this.filters.all.enabled"/>
            </div>
            <div :class="{'status':true, 'status-done':this.filters.undone.enabled}" @click="toggleFilterUndone">
                <p>Undone todos</p>
                <CheckLogo class="check-logo" v-if="this.filters.undone.enabled"/>
            </div>
            <div :class="{'status':true, 'status-done':this.filters.done.enabled}" @click="toggleFilterDone">
                <p>Done todos</p>
                <CheckLogo class="check-logo" v-if="this.filters.done.enabled"/>
            </div>
            <div :class="{'status':true, 'status-done':this.filters.dead.enabled}" @click="toggleFilterDead">
                <p>Dead todos</p>
                <CheckLogo class="check-logo" v-if="this.filters.dead.enabled"/>
            </div>
        </div>

        <div class="order">
            <p class="title">Sort Todos</p>

            <p :class="{'status':true, 'status-done':this.filters.sortDescLastEdit.enabled}" @click="setSort('sortDescLastEdit')">Latest</p>
            <p :class="{'status':true, 'status-done':this.filters.sortAscLastEdit.enabled}" @click="setSort('sortAscLastEdit')">Oldest</p>
        </div>

        <div class="search">
            <p class="title">Search Todos</p>

            <input :value="searchText" @keyup="event => searchText=event.target.value"/>
        </div>
    </div>
</template>
