<script>
import CustomButton from './CustomButton.vue';

export default {
    components:{
        CustomButton
    }
}
</script>

<template>
    <h1>
        Welcome To Your Gallery !
    </h1>

    <router-link to="/home">
        <CustomButton class="go-on-gallery">
            Back To Home
        </CustomButton>
    </router-link>

    <div class="images-box">
        <div class="image"><img src="../assets/images/abol_roocket_profile.png" alt=""></div>
        <div class="image"><img src="../assets/images/abstract_example_shot.png" alt=""></div>
        <div class="image"><img src="../assets/images/css_css.png" alt=""></div>
        <div class="image"><img src="../assets/images/first_week_day_of_month.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation_custom_error_message.png" alt=""></div>
        <div class="image"><img src="../assets/images/abol_roocket_profile.png" alt=""></div>
        <div class="image"><img src="../assets/images/abstract_example_shot.png" alt=""></div>
        <div class="image"><img src="../assets/images/css_css.png" alt=""></div>
        <div class="image"><img src="../assets/images/first_week_day_of_month.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation_custom_error_message.png" alt=""></div>
        <div class="image"><img src="../assets/images/abol_roocket_profile.png" alt=""></div>
        <div class="image"><img src="../assets/images/abstract_example_shot.png" alt=""></div>
        <div class="image"><img src="../assets/images/css_css.png" alt=""></div>
        <div class="image"><img src="../assets/images/first_week_day_of_month.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation_custom_error_message.png" alt=""></div>
        <div class="image"><img src="../assets/images/abol_roocket_profile.png" alt=""></div>
        <div class="image"><img src="../assets/images/abstract_example_shot.png" alt=""></div>
        <div class="image"><img src="../assets/images/css_css.png" alt=""></div>
        <div class="image"><img src="../assets/images/first_week_day_of_month.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation_custom_error_message.png" alt=""></div>
        <div class="image"><img src="../assets/images/abol_roocket_profile.png" alt=""></div>
        <div class="image"><img src="../assets/images/abstract_example_shot.png" alt=""></div>
        <div class="image"><img src="../assets/images/css_css.png" alt=""></div>
        <div class="image"><img src="../assets/images/first_week_day_of_month.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation.png" alt=""></div>
        <div class="image"><img src="../assets/images/laravel_routing_validation_custom_error_message.png" alt=""></div>

    </div>
</template>

<style scoped>

    .images-box{
        margin-top:20px; 
        display:flex;
        flex-wrap:wrap;
        gap:20px;
    }

    .images-box .image{
        position: relative;
        width:300px;
        flex-grow: 1;
    }

    .images-box .image img{
        width: 100%;
    }
</style>