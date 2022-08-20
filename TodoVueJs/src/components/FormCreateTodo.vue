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
            if(!this.isValidInputs){
                alert('Inputs are wrong!');
                return false;
            }
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
    },
    computed:{
        isValidInputs(){
            switch(true){
                case this.title == '' || this.description == '' || this.dueAt==null:
                    return false;
                
                case !this.isDueAtAfterNow:
                    return false;
            }
            return true;
        },
        isDueAtAfterNow(){
            return new Date().getTime()< new Date(this.dueAt).getTime();
        },

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