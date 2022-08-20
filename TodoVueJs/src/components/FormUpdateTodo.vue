<script>
import TodoModel from '../scripts/TodoModel';

export default{
    props:{
        todo:Object
    },
    data(){
        return{
            id: this.todo.id,
            title: this.todo.title,
            description: this.todo.description,
            dueAt: this.todo.due_at,
            doneAt: this.todo.done_at,

            createdAt: this.todo.created_at,
            updatedAt: this.todo.updated_at,
        }
    },

    methods:{
        updateTodo(){
            if(!this.isValidInputs){
                alert('Inputs are wrong!');
                return false;
            }
            this.updatedAt = new Date().toISOString();
            TodoModel.update(this.id,{
                title: this.title,
                description: this.description,
                due_at: this.dueAt,
                done_at: this.doneAt,
                
                updated_at: this.updatedAt,
            });
        },
        resetData(){
            this.title = this.todo.title;
            this.description = this.todo.description;
            this.dueAt = this.todo.due_at;
        },
        toggleStatus(){
            this.doneAt = this.doneAt? null: new Date().toISOString();
        },
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

        <p :class="{'status':true, 'status-done':!!this.doneAt}" @click="toggleStatus()">{{lastDoneAt}}</p>


        <button @click="updateTodo()" type="button">Edit</button>
        <button @click="resetData()" type="button">Reset</button>
    </form>
</template>