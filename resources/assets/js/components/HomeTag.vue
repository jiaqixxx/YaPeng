<template>
    <v-app id="inspire">
        <vue-progress-bar></vue-progress-bar>
        <v-container fluid>
            <v-layout row>
                <NavBar v-bind:admin-name="adminName"></NavBar>
                <v-flex xs12>
                    <router-view></router-view>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import NavBar from './Navbar.vue';

    export default {
        name: "HomeTag",
        props: ['adminName'],
        components: {
            NavBar
        },
        mounted () {
            this.$Progress.finish();
        },
        created () {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start();
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress;
                    // parse meta tags
                    this.$Progress.parseMeta(meta)
                }
                //  start the progress bar
                this.$Progress.start();
                //  continue to next page
                next()
            });
            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish();
            })
        },
        methods: {

        }
    }
</script>

<style scoped>
    .container{
        padding: 0;
    }
</style>