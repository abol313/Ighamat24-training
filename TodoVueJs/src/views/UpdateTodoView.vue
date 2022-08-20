<script>
import FormUpdateTodo from "../components/FormUpdateTodo.vue";
import TodoModel from '../scripts/TodoModel.js';

export default {
    data(){
        return{
            todo: TodoModel.query().where('id', this.$route.params.id).get()[0]
        }
    },
    components:{
        FormUpdateTodo
    }
}

</script>

<template>
    <FormUpdateTodo :todo="todo"/>
</template>