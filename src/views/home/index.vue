<template>
    <div class="home">
        <div class="home-logo">
            <img :src="require( '@/assets/image/logo/vuetify_logo.svg' )"
                 alt="vuetify logo"
            />
        </div>

        <div class="home-link">
            <div class="home-link-item">
                <span v-for="homeLinkItem of homeLink"
                      :key="homeLinkItem.id"
                      @click="goRelated( homeLinkItem.url )"
                      class="home-link-item-list"
                >
                    {{ homeLinkItem.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',

        data: () => ( {
            homeLink: [
                {
                    id: 1,
                    name: 'about',
                    url: '/about',
                },
                {
                    id: 2,
                    name: 'bottom_navigation',
                    url: '/bottom-navigation'
                },
                {
                    id: 3,
                    name: 'buttons',
                    url: '/buttons',
                },
                {
                    id: 4,
                },
            ],
        } ),

        methods: {
            goRelated( link )
            {
                this.$router.push( {
                    path: link
                } );
            },
        },
    };
</script>

<style lang="scss"
       scoped
>
    @import "style";
</style>
