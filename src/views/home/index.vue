<template>
    <div class="home">
        <div class="home-logo">
            <img :src="require( '@/assets/image/logo/vuetify_logo.svg' )"
                 alt="vuetify logo"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
    };
</script>

<style lang="scss"
       scoped
>
    @import "style";
</style>
