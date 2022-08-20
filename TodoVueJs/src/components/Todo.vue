<script>
import TodoModel from '../scripts/TodoModel';


export default {


    props: {
        'todo':Object,
        'search':String,
    }
    ,

    data(){
        return {
            id:this.$props.todo.id,
            title:this.$props.todo.title,
            description:this.$props.todo.description,
            dueAt:this.$props.todo.due_at && new Date(this.$props.todo.due_at),
            doneAt:this.$props.todo.done_at && new Date(this.$props.todo.done_at),

            createdAt:this.$props.todo.created_at && new Date(this.$props.todo.created_at),
            updatedAt:this.$props.todo.updated_at && new Date(this.$props.todo.updated_at),

            shownExactTime: false,
        }
    },

    computed:{
        status(){
            
            console.log('status:',this.doneAt,!!this.doneAt);
            return !!this.doneAt;
        },
        lastEdit(){
            return this.dateToString(this.updatedAt || this.createdAt);
        },
        dueAtStr(){
            return this.dateToString(this.dueAt);
        },
        lastDoneAt(){
            return this.dateToString(this.doneAt);
        },
        getTitle(){
            if(this.search == null)
                return this.title;
            return this.styleSearchArea(this.title);
        },
        getEditLink(){
            return `/edit/${this.id}`;
        }
    },

    methods:{
        toggleStatus(){
            this.doneAt = this.doneAt? null: new Date();
            this.$emit('change-todo-status', this.todo, this.doneAt);
            TodoModel.update(this.id, {done_at: this.doneAt});

        },
        dateToString(date, exact=false){
            if(!date) return date;
            exact = this.shownExactTime;
            // console.log(date);
            if(exact)
                return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            let nowDate = new Date();
            
            let last_edit_out = '';
            switch(true){
                case nowDate.getFullYear() != date.getFullYear():
                    last_edit_out += `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
                    break;

                case nowDate.getMonth() != date.getMonth():
                    let diffMonth = nowDate.getMonth() - date.getMonth();
                    last_edit_out += `${Math.abs(diffMonth)} month${Math.abs(diffMonth)>1?'s':''} ${diffMonth<0? 'next':'ago'}`;
                    break;
                
                case nowDate.getDate() != date.getDate():
                    let diffDate = nowDate.getDate() - date.getDate();
                    last_edit_out += `${Math.abs(diffDate)} day${Math.abs(diffDate)>1?'s':''} ${diffDate<0? 'next':'ago'}`;
                    break;

                case nowDate.getHours() != date.getHours():
                    let diffHour = nowDate.getHours() - date.getHours();
                    last_edit_out += `${Math.abs(diffHour)} hour${Math.abs(diffHour)>1?'s':''} ${diffHour<0? 'next':'ago'}`;
                    break;

                case nowDate.getMinutes() != date.getMinutes():
                    let diffMinute = nowDate.getMinutes() - date.getMinutes();
                    last_edit_out += `${Math.abs(diffMinute)} minute${Math.abs(diffMinute)>1?'s':''} ${diffMinute<0? 'next':'ago'}`;
                    break;
                
                case nowDate.getSeconds() != date.getSeconds():
                    let diffSecond = nowDate.getSeconds() - date.getSeconds();
                    last_edit_out += `${Math.abs(diffSecond)} second${Math.abs(diffSecond)>1?'s':''} ${diffSecond<0? 'next':'ago'}`;
                    break;
                
                default:
                    last_edit_out+= 'now';
            }

            return last_edit_out;
        },

        styleSearchArea(text){
            if(!this.search)return text;
            let regex = new RegExp('('+this.search.split('').join(').*(')+')','g');
            let matches = text.matchAll(regex);

            let styledText = '';
            let pastIndex = 0;
            for(const match of matches){
                if(pastIndex===0){
                    pastIndex=match.index;
                    styledText=text.slice(0,pastIndex);
                }
                styledText += this.getStyleArea(text.slice(pastIndex, pastIndex+=match[0].length));

            }
            styledText+=text.slice(pastIndex)

            console.log(styledText);
            return styledText;
        },
        
        getStyleArea(text){
            return `<ins class="search-area">${text}</ins>`;
        }

    },

    watch:{
        todo(todo){
            this.id=todo.id;
            this.title=todo.title;
            this.description=todo.description;
            this.dueAt=todo.due_at && new Date(todo.due_at);
            this.doneAt=todo.done_at && new Date(todo.done_at);

            this.createdAt=todo.created_at && new Date(todo.created_at);
            this.updatedAt=todo.updated_at && new Date(todo.updated_at);
        },
    }


}
</script>

<template>
    <div class="todo-item" @mouseover="this.shownExactTime=true" @mouseout="this.shownExactTime=false">
        <h3 class="title" v-html="getTitle"></h3>
        <p class="description">{{description}}</p>
        <p class="due_at">Due at: {{dueAtStr}}</p>
        <p class="last-edit">Last edit: {{lastEdit}}</p>
        <router-link :to="getEditLink">
            <p class="edit">Edit</p>
        </router-link>

        <p :class="{'status':true, 'status-done':!!this.doneAt}" @click="toggleStatus()">{{lastDoneAt}}</p>
    </div>
</template>

<style scoped>
    .todo-item {
        border:1px solid black;
    }
</style>