<script>
import TodoModel from '../scripts/TodoModel';
import TodoFormUpdateSubmitLogo from './icons/pen-to-square-solid.vue';
import TodoFormUpdateResetLogo from './icons/rotate.vue';

export default{
    components:{
        TodoFormUpdateResetLogo,
        TodoFormUpdateSubmitLogo,
    },
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
                new Alert(
                    "Wrong Inputs",
                    "Your inputs are wrong, fill the inputs and a due after now !",
                    "Ok",
                    "danger"
                )
                    .make()
                    .show();
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
            new Alert(
                    "Success Edit",
                    "Edited the todo",
                    "Ok",
                    "success"
                )
                .make()
                .show();

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
        <p class="form-title">Edit The Todo !</p>

        <label for="title">Todo's Title</label>
        <input id="title" class="title" v-model="title" required/>

        <label for="description">Todo's Description</label>
        <input id="description" class="description" v-model="description" required/>

        <label for="due">Todo's Due Date & Time</label>
        <input id="due" type="datetime-local" class="due_at" v-model="dueAt" required/>

        <div @click="updateTodo" class="submit">
            <p>Edit Todo</p>
            <TodoFormUpdateSubmitLogo class="submit-logo"/>
        </div>        
        <div @click="resetData" class="submit">
            <p>Reset Data</p>
            <TodoFormUpdateResetLogo class="submit-logo"/>
        </div>
    </form>
</template>