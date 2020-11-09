<template>
    <div class="about">
        <v-card class="overflow-hidden">
            <v-app-bar
                :collapse="!collapseOnScroll"
                :collapse-on-scroll="collapseOnScroll"
                absolute
                color="deep-purple accent-4"
                dark
                scroll-target="#scrolling-techniques-6"
            >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Collapsing Bar</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-checkbox
                    v-model="collapseOnScroll"
                    color="white"
                    hide-details
                ></v-checkbox>
            </v-app-bar>
            <v-sheet
                id="scrolling-techniques-6"
                class="overflow-y-auto"
                max-height="600"
            >
                <v-container style="height: 1000px"></v-container>
            </v-sheet>
        </v-card>

        <h1>This is an about page</h1>
    </div>
</template>

<script>
    export default {
        name: 'about',

        data: () => ({
            collapseOnScroll: true,
        }),
    };
</script>
