<script>
import FilterLogo from './icons/filter.vue';
import CheckLogo from './icons/check.vue';
export default {
    data() {
        return {
            noBlock: false,
            doneBlock: true,
            undoneBlock: false,
            isDeskOrder: true,
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
        setBlock(mode) {
            this.noBlock = false;
            this.doneBlock = false;
            this.undoneBlock = false;
            switch (mode) {
                case 0:
                    this.noBlock = true;
                    this.$emit("no-block");
                    break;
                case 1:
                    this.doneBlock = true;
                    this.$emit("done-block");
                    break;
                case 2:
                    this.undoneBlock = true;
                    this.$emit("undone-block");
                    break;
            }
            return mode;
        },
        setOrder(isDeskOrder) {
            this.isDeskOrder = isDeskOrder;
            if (isDeskOrder)
                this.$emit("reorder-desc");
            else
                this.$emit("reorder-asc");
        },
        filterCallback(orgTodos){
            let filteredTodos = [];
            let unfilteredTodos = [...orgTodos];

            console.log('filtering....',orgTodos);
            debugger;
            for(const filter of Object.values(this.filters)){
                console.log('filter obj',filter, filter.enabled);
                if(!filter.enabled)continue;

                if(filter.pipeEach){

                    for(let i=0; i<unfilteredTodos.length ; i++){

                        let unfilteredTodo = unfilteredTodos[i];

                        let piped = filter.pipeEach(unfilteredTodo);
                        console.log('pipe',unfilteredTodo,piped,unfilteredTodo.done_at);
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
                    unfilteredTodos = filter.pipeAll(unfilteredTodos);
                }
            }

            console.log('filtered',filteredTodos);

            return filteredTodos;

        },
 
    },
    watch: {
        searchText(newText) {
            this.$emit("search", newText);
        },

        filters:{
            handler(){
                this.filter();
            },
            deep:true
        }
    },
    components: {
        FilterLogo,
        CheckLogo,
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

            <p :class="{'status':true}" @click="setBlock(0)">All</p>
            
            <div :class="{'status':true, 'status-done':this.filters.done.enabled}" @click="toggleFilterDone">
                <p>Done todos</p>
                <CheckLogo class="check-logo" v-if="this.filters.done.enabled"/>
            </div>
            <div :class="{'status':true, 'status-done':this.filters.undone.enabled}" @click="toggleFilterUndone">
                <p>Undone todos</p>
                <CheckLogo class="check-logo" v-if="this.filters.undone.enabled"/>
            </div>
        </div>

        <div class="order">
            <p class="title">Sort Todos</p>

            <p :class="{'status':true, 'status-done':this.isDeskOrder}" @click="setOrder(true)">Latest</p>
            <p :class="{'status':true, 'status-done':!this.isDeskOrder}" @click="setOrder(false)">Oldest</p>
        </div>

        <div class="search">
            <p class="title">Search Todos</p>

            <input :value="searchText" @keyup="event => searchText=event.target.value"/>
        </div>
    </div>
</template>
