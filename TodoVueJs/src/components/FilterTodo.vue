<script>
export default {
    data(){
        return {
            noBlock: false,
            doneBlock: true, 
            undoneBlock: false, 

            isDeskOrder: true,
            searchText: null,
        };
    },
    methods:{
        setBlock(mode){
            this.noBlock=false;
            this.doneBlock=false;
            this.undoneBlock=false;
            switch(mode){
                case 0:
                    this.noBlock=true;
                    this.$emit('no-block');
                    break;
                case 1:
                    this.doneBlock=true;
                    this.$emit('done-block');
                    break;
                case 2:
                    this.undoneBlock=true;
                    this.$emit('undone-block');
                    break;
            }

            return mode;
        },
        setOrder(isDeskOrder){
            this.isDeskOrder = isDeskOrder;
            if(isDeskOrder)
                this.$emit('reorder-desc');
            else
                this.$emit('reorder-asc');
        }
    },
    watch:{
        searchText(newText){
            this.$emit('search',newText);
        }
    }
}
</script>

<template>
    <div class="filter-box">
        <div class="block">
            <p class="title">Show All Todos Except </p>

            <p :class="{'status':true, 'status-done':this.noBlock}" @click="setBlock(0)">No todo (all)</p>
            <p :class="{'status':true, 'status-done':this.doneBlock}" @click="setBlock(1)">Dones todo</p>
            <p :class="{'status':true, 'status-done':this.undoneBlock}" @click="setBlock(2)">Undones todo</p>
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
