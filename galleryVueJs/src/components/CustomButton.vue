<script>
export default{
    data(){
        return{
            style: '',

        }
    },
    methods:{
        getClass(){
            return 'custom-button'+' '+this.class+' '+this.style;
        }
    },
    props:['class']
}
</script>

<template>
    <button :class="getClass()" @click="$emit('go')" >
        <slot/>
    </button>
</template>

<style scoped>
    .custom-button {
        border-radius: 10px;
        padding: 20px;
        font-size: 2em;
        border: none;
        box-shadow: 0 0 20px #151515, 0 0 200px #151515;
        transition: box-shadow 100ms;
    }
    .custom-button:hover {
        box-shadow: 0 0 50px #151515, 0 0 200px #151515;
    }
</style>


