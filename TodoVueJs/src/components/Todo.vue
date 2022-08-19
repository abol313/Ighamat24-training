<script>

export default {


    // data(){
    //     return {
    //         id: 1,
    //         title: 'Todo title',
    //         description: 'Todo description..',
    //         created_at: new Date('2022-08-10T12:37:36.110Z'),
    //         updated_at: new Date('2022-08-16T12:37:36.110Z'),
    //         done_at: null,
    //         status: false,
    //     };
    // },

    props: [
        'id',
        'title',
        'description',
        'created_at',
        'updated_at',
        'status',
    ],

    computed:{
        last_edit(){
            let date = this.updated_at || this.created_at;
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
            this.status = !this.status;
        }
    },

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
    .todo-item {
        border:1px solid black;
    }
</style>