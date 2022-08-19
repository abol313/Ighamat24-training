<script>
import TodoModel from '../scripts/TodoModel';


export default {


    props: ['todo']
    ,

    data(){
        return {
            id:this.todo.id,
            title:this.todo.title,
            description:this.todo.description,
            dueAt:this.todo.due_at && new Date(this.todo.due_at),
            doneAt:this.todo.done_at && new Date(this.todo.done_at),

            createdAt:this.todo.created_at && new Date(this.todo.created_at),
            updatedAt:this.todo.updated_at && new Date(this.todo.updated_at),
        }
    },

    computed:{
        status(){
            return !!this.doneAt;
        },
        last_edit(){
            let date = this.updatedAt || this.createdAt;
            if(!date) return date;
            console.log(date);
            let nowDate = new Date();
            
            let last_edit_out = '';
            switch(true){
                case nowDate.getFullYear() != date.getFullYear():
                    last_edit_out += `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
                    break;

                case nowDate.getMonth() != date.getMonth():
                    let diffMonth = nowDate.getMonth() - date.getMonth();
                    last_edit_out += `${diffMonth} month${diffMonth>1?'s':''} ago`;
                    break;
                
                case nowDate.getDate() != date.getDate():
                    let diffDate = nowDate.getDate() - date.getDate();
                    last_edit_out += `${diffDate} day${diffDate>1?'s':''} ago`;
                    break;

                case nowDate.getHours() != date.getHours():
                    let diffHour = nowDate.getHours() - date.getHours();
                    last_edit_out += `${diffHour} hour${diffHour>1?'s':''} ago`;
                    break;

                case nowDate.getMinutes() != date.getMinutes():
                    let diffMinute = nowDate.getMinutes() - date.getMinutes();
                    last_edit_out += `${diffMinute} minute${diffMinute>1?'s':''} ago`;
                    break;
                
                case nowDate.getSeconds() != date.getSeconds():
                    let diffSecond = nowDate.getSeconds() - date.getSeconds();
                    last_edit_out += `${diffSecond} second${diffSecond>1?'s':''} ago`;
                    break;
                
                default:
                    last_edit_out+= 'now';
            }

            return last_edit_out;
        }
    },

    methods:{
        toggleStatus(){
            this.doneAt = this.doneAt? null: new Date();
            TodoModel.update(this.id, {done_at: this.doneAt});
        }
    },

}
</script>

<template>
    <div class="todo-item">
        <h3 class="title">{{title}}</h3>
        <p class="description">{{description}}</p>
        <p class="last-edit">{{last_edit}}</p>
        <p :class="{'status':true, 'status-done':this.status}" @click="toggleStatus()"></p>
    </div>
</template>

<style scoped>
    .todo-item {
        border:1px solid black;
    }
</style>