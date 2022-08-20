<script>
import TodoModel from '../scripts/TodoModel';

export default{
    data(){
        return{
            title:'',
            description:'',
            dueAt:null,
        }
    },
    methods:{
        createTodo(){
            TodoModel.create({
                title: this.title,
                description: this.description,
                due_at: this.dueAt,
                done_at: null,
                
                created_at: new Date().toISOString(),
                updated_at: null,
            });
        },
        resetData(){
            this.title = '';
            this.description = '';
            this.dueAt = null
        }
    }
}
</script>

<template>
    <form class="form-box">
        <input class="title" v-model="title" required/>
        <input class="description" v-model="description" required/>
        <input type="datetime-local" class="due_at" v-model="dueAt" required/>

        <button @click="createTodo" type="button"></button>
    </form>
</template>