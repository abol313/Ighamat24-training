<script>

export default {
    props: [
        'id',
        'title',
        'description',
        'created_at',
        'updated_at',
        'status',
    ],

    // data(){
    //     return {
    //         id: 1,
    //         title: 'Todo title',
    //         description: 'Todo description..',
    //         created_at: new Date(),
    //         updated_at: new Date(),
    //         done_at: null,

    //     };
    // },

    computed:{
        last_edit(){
            return this.updated_at || this.created_at;
        }
    },

    methods:{
        toggleStatus(){
            this.status = !this.status;
        }
    }
}
</script>

<template>
    <div class="todo-item">
        <h3 class="title">{{title}}</h3>
        <p class="description">{{description}}</p>
        <p class="last-edit">{{last_edit}}</p>
        <p class="status" @click="toggleStatus()">{{status}}</p>
    </div>
</template>

<style scoped>
    .todo-item >>> * {
        border:1px solid black;
    }
</style>