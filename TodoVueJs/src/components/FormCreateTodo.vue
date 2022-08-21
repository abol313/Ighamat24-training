<script>
import TodoModel from '../scripts/TodoModel';
import TodoFormCreateSubmitLogo from './icons/todo-form-create-submit-logo.vue';

export default{
    data() {
        return {
            title: "",
            description: "",
            dueAt: null,
        };
    },
    methods: {
        createTodo() {
            if (!this.isValidInputs) {
                alert("Inputs are wrong!");
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
        resetData() {
            this.title = "";
            this.description = "";
            this.dueAt = null;
        }
    },
    computed: {
        isValidInputs() {
            switch (true) {
                case this.title == "" || this.description == "" || this.dueAt == null:
                    return false;
                case !this.isDueAtAfterNow:
                    return false;
            }
            return true;
        },
        isDueAtAfterNow() {
            return new Date().getTime() < new Date(this.dueAt).getTime();
        },
    },
    components: { TodoFormCreateSubmitLogo }
}
</script>

<template>
    <form class="form-box">
        <p class="form-title">Create A Todo !</p>

        <label for="title">Todo's Title</label>
        <input id="title" class="title" v-model="title" required/>

        <label for="description">Todo's Description</label>
        <input id="description" class="description" v-model="description" required/>

        <label for="due">Todo's Due Date & Time</label>
        <input id="due" type="datetime-local" class="due_at" v-model="dueAt" required/>

        <div @click="createTodo" class="submit">
            <p>Create Todo</p>
            <TodoFormCreateSubmitLogo class="submit-logo"/>
        </div>
    </form>
</template>