<template>
    <v-app id="inspire">
        <notifications group="logoutInfo" position="top center"/>
        <v-navigation-drawer
                stateless
                value="true"
        >
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <img :src="'/storage/image/logo.jpg'">
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <a href="/home">常州市亚鹏百货有限公司</a>
                    </v-list-tile-title>
                </v-list-tile>

                <v-list-group
                        prepend-icon="account_circle"
                        value="true"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>{{ adminName }}</v-list-tile-title>
                    </v-list-tile>

                    <v-list-group
                            sub-group
                            no-action
                            value="true"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-title>查看功能</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile
                                v-for="(check, i) in checks"
                                :key="i"
                        >
                            <router-link :to="check[2]" id="router-link">
                                <v-list-tile-title v-text="check[0]"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-icon v-text="check[1]" color="blue-grey"></v-icon>
                                </v-list-tile-action>
                            </router-link>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-group
                            no-action
                            sub-group
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-title>帐号管理</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile
                                v-model="account"
                                @click="manageAccount"
                        >
                            <v-list-tile-title v-text="account[0]"></v-list-tile-title>
                            <v-list-tile-action>
                                <v-icon v-text="account[1]" color="blue-grey"></v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <input type="hidden" name="_token" :value="this.$csrfToken">
    </v-app>
</template>

<script>
    export default {
        name: "NavBar",
        props: ['adminName'],
        data: () => ({
            account: ['退出', 'exit_to_app'],
            checks: [
                ['客户列表', 'people_outline', '/clients_list'],
                ['发票记录', 'insert_drive_file', '/invoices']
            ]
        }),
        methods: {
            manageAccount(){
                let app = this;
                axios.post('logout')
                .then(function (response) {
                    if(response.data.result == 'success'){
                        window.location = '/';
                    }else{
                        app.$notify({
                            group: 'logoutInfo',
                            text: 'Failed to Logout',
                            duration: 5000,
                            type: 'warn'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: black;
    }
    img{
        width:50px;
    }
    #router-link{
        width: 100%;
        display: inherit;
    }
</style>