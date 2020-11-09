<template>
    <div id="app">
        <v-app>
            <!-- Sizes your content based upon application components -->
            <v-main>
                <!-- Provides the application the proper gutter -->
                <v-container fluid>
                    <!-- If using vue-router -->
                    <router-view></router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: 'app',

        beforeRouteEnter( to, from , next )
        {
            console.log(this.$vuetify.application.top);

            next();
        }
    };
</script>
