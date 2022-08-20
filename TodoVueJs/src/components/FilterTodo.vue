<script>
export default {
    data(){
        return {
            noBlock: false,
            doneBlock: true, 
            undoneBlock: false, 
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
        }
    }
}
</script>

<template>
    <div class="filter-box">
        <p :class="{'status':true, 'status-done':this.noBlock}" @click="setBlock(0)">all</p>
        <p :class="{'status':true, 'status-done':this.doneBlock}" @click="setBlock(1)">minus dones</p>
        <p :class="{'status':true, 'status-done':this.undoneBlock}" @click="setBlock(2)">minus undones</p>
    </div>
</template>

<style scoped>
    .filter-box{
        border: 1px solid cyan;
    }
</style>