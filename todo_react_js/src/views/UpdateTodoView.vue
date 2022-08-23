<script>
import FormUpdateTodo from "../components/FormUpdateTodo.vue";
import TodoModel from '../scripts/TodoModel.js';

export default {
    data(){
        return{
            todo: this.getTodo(),
        }
    },
    components:{
        FormUpdateTodo
    },
    methods:{
        throw404Error(){
            this.$router.push({name:'error-404'});
        },
        getTodo(){
            let todo = TodoModel.query().where('id', this.$route.params.id).get()[0];
            if(!todo)
                this.throw404Error();

            return todo;
        }
    },
    beforeCreate(){
        if(TodoModel.query().where('id', this.$route.params.id).get()[0] === undefined)
            this.$router.push({name:'error-404'});

    }
}

</script>

<template>
    <FormUpdateTodo v-if="todo" :todo="todo"/>
</template>