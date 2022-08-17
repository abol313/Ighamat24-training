<script>
import CustomButton from './CustomButton.vue'

export default {
    components:{
        CustomButton
    }
}
</script>

<template>
    <router-link to="/gallery">
        <CustomButton class="go-on-gallery">
            Go To Gallery
        </CustomButton>
    </router-link>
</template>