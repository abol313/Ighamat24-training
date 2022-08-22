<script>
import TodoModel from '../scripts/TodoModel';

import StatusStartLogo from './icons/hourglass-start-solid.vue';
import StatusHalfLogo from './icons/hourglass-half-solid.vue';
import StatusEndLogo from './icons/hourglass-end-solid.vue';
import StatusDoneLogo from './icons/todo-done.vue';
import StatusDeadLogo from './icons/skull-solid.vue';

import EditLogo from './icons/pen-to-square-solid.vue';
import DeleteLogo from './icons/trash-can-solid.vue';
import TodoBan from './icons/todo-ban.vue';
import Alert from '../modules/Alert/Alert';


export default {
    props: {
        "todo": Object,
        "search": String,
    },
    data() {
        return {
            id: this.$props.todo.id,
            title: this.$props.todo.title,
            description: this.$props.todo.description,
            dueAt: this.$props.todo.due_at && new Date(this.$props.todo.due_at),
            doneAt: this.$props.todo.done_at && new Date(this.$props.todo.done_at),
            createdAt: this.$props.todo.created_at && new Date(this.$props.todo.created_at),
            updatedAt: this.$props.todo.updated_at && new Date(this.$props.todo.updated_at),
            shownExactTime: false,
            searchText: this.search,
        };
    },
    computed: {
        status() {
            console.log("status:", this.doneAt, !!this.doneAt);
            return !!this.doneAt;
        },
        lastEdit() {
            return this.dateToString(this.updatedAt || this.createdAt);
        },
        dueAtStr() {
            return this.dateToString(this.dueAt);
        },
        lastDoneAt() {
            return this.dateToString(this.doneAt);
        },
        getTitle() {
            console.log(this.title);
            if (this.title)
                this.title = this.title.split(" ").map(word => word.trim() && word[0].toUpperCase() + word.slice(1)).join(" ");
            if (this.searchText == null)
                return this.title;
            return this.styleSearchArea(this.title);
        },
        getEditLink() {

            return this.isDead? '#':`/edit/${this.id}`;
        },

        isStarted(){
            return !this.doneAt && !this.isDead && !this.isExceededHalf;
        },
        isExceededHalf(){
            return !this.doneAt && !this.isDead && (new Date(this.createdAt).getTime() + new Date(this.dueAt).getTime())/2 <= new Date();
        },
        isDone(){
            return !!this.doneAt;
        },
        isDead() {
            return !this.doneAt && new Date(this.dueAt) < new Date();
        },
        getStatusTitle(){
            switch(true){
                case this.isStarted:
                    return "The todo is started";
                case this.isExceededHalf:
                    return "Exceeded half time until due!";
                case this.isDone:
                    return "Done todo";
                case this.isDead:
                    return "Dead todo";
            }
        }

    },
    methods: {
        toggleStatus() {
            if(this.isDead)return;
            this.doneAt = this.doneAt ? null : new Date();
            TodoModel.update(this.id, { done_at: this.doneAt });
            this.$emit("requery");
        },
        dateToString(date, exact = false) {
            if (!date)
                return date;
            exact = this.shownExactTime;
            // console.log(date);
            if (exact)
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            let nowDate = new Date();
            let last_edit_out = "";
            switch (true) {
                case nowDate.getFullYear() != date.getFullYear():
                    last_edit_out += `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                    break;
                case nowDate.getMonth() != date.getMonth():
                    let diffMonth = nowDate.getMonth() - date.getMonth();
                    last_edit_out += `${Math.abs(diffMonth)} month${Math.abs(diffMonth) > 1 ? "s" : ""} ${diffMonth < 0 ? "next" : "ago"}`;
                    break;
                case nowDate.getDate() != date.getDate():
                    let diffDate = nowDate.getDate() - date.getDate();
                    last_edit_out += `${Math.abs(diffDate)} day${Math.abs(diffDate) > 1 ? "s" : ""} ${diffDate < 0 ? "next" : "ago"}`;
                    break;
                case nowDate.getHours() != date.getHours():
                    let diffHour = nowDate.getHours() - date.getHours();
                    last_edit_out += `${Math.abs(diffHour)} hour${Math.abs(diffHour) > 1 ? "s" : ""} ${diffHour < 0 ? "next" : "ago"}`;
                    break;
                case nowDate.getMinutes() != date.getMinutes():
                    let diffMinute = nowDate.getMinutes() - date.getMinutes();
                    last_edit_out += `${Math.abs(diffMinute)} minute${Math.abs(diffMinute) > 1 ? "s" : ""} ${diffMinute < 0 ? "next" : "ago"}`;
                    break;
                case nowDate.getSeconds() != date.getSeconds():
                    let diffSecond = nowDate.getSeconds() - date.getSeconds();
                    last_edit_out += `${Math.abs(diffSecond)} second${Math.abs(diffSecond) > 1 ? "s" : ""} ${diffSecond < 0 ? "next" : "ago"}`;
                    break;
                default:
                    last_edit_out += "now";
            }
            return last_edit_out;
        },
        styleSearchArea(text) {
            if (!this.searchText)
                return text;
            if (this.searchText == text)
                return this.getStyleArea(text, true);
            // this.searchText = this.searchText.toLowerCase();
            let orgText = text;
            let regex = new RegExp("(" + this.searchText.replaceAll(/\s/g, "").split("").join(").*?(") + ")", "ig");
            let matches = text.matchAll(regex);
            let styledText = "";
            let pastIndex = 0;
            for (const match of matches) {
                console.log('match:',match);
                if (pastIndex !== match.index) {
                    styledText += orgText.slice(pastIndex, pastIndex = match.index);
                }
                styledText += this.getStyleArea(orgText.slice(pastIndex, pastIndex += match[0].length));
            }
            styledText += orgText.slice(pastIndex);
            console.log(regex);
            console.log("#", this.searchText, ":", this.title, "#", "Style as search..", styledText);
            return styledText;
        },
        getStyleArea(text, isExact = false) {
            return `<ins class="search-area${isExact ? "-exact" : ""}">${text}</ins>`;
        },
        delete(){
            TodoModel.delete(this.id);
            new Alert(
                'Delete Todo',
                'The todo deleted successfully!',
                'Ok',
                'success'
            ).make().show();
            this.$emit('requery');
        }
    },
    watch: {
        todo(todo) {
            this.id = todo.id;
            this.title = todo.title;
            this.description = todo.description;
            this.dueAt = todo.due_at && new Date(todo.due_at);
            this.doneAt = todo.done_at && new Date(todo.done_at);
            this.createdAt = todo.created_at && new Date(todo.created_at);
            this.updatedAt = todo.updated_at && new Date(todo.updated_at);
        },
        search(newSearch) {
            this.searchText = newSearch;
        }
    },
    components: {
    StatusStartLogo,
    StatusHalfLogo,
    StatusEndLogo,
    StatusDoneLogo,
    StatusDeadLogo,
    EditLogo,
    DeleteLogo,
    TodoBan
}
}
</script>

<template>
    <div class="todo-item" @mouseover="this.shownExactTime=true" @mouseout="this.shownExactTime=false" :disabled="isDead">
        <div class="banned" v-if="isDead" title="This todo have been dead and banned, you can not access except delete!">
            <TodoBan class="ban-logo"/>
        </div>
        
        <div class="nav">
            <h3 class="title" v-html="getTitle"></h3>

            <div class="settings">

                <div class="delete-logo" title="delete the todo" @click="this.delete()">
                    <delete-logo class="delete-logo"/>
                </div>
                

                <router-link :to="getEditLink" title="edit the todo" :disabled="isDead">
                    <edit-logo class="edit-logo" />
                </router-link>

                <div class="status-logo" :title="getStatusTitle">
                    <status-start-logo v-if="isStarted" class="status-logo status-logo-started" title="The todo is started"/>
                    <status-half-logo v-if="isExceededHalf" class="status-logo status-logo-halfed" title="Exceeded half time until due!"/>
                    <status-done-logo v-if="isDone" class="status-logo status-logo-done" title="Done todo"/>

                    <status-dead-logo v-if="isDead" class="status-logo status-logo-dead" title="Dead todo"/>
                    

                </div>
            </div>
        </div>
        
        <p class="description">{{description}}</p>

        <p class="due-at">Due at: {{dueAtStr}}</p>
        <p class="last-edit">Last edit: {{lastEdit}}</p>

        <p :class="{'done-at':true, 'status':true, 'status-done':!!this.doneAt}" @click="toggleStatus()" :disabled="isDead">{{lastDoneAt? 'Done at: '+lastDoneAt: isDead? 'Dead line, Dead todo can not to edit or done':'Waiting to done...'}}</p>
    </div>
</template>

