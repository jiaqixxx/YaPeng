<template>
    <v-app id="inspire">
        <v-container fluid grid-list-xl>
            <v-layout row justify-space-between mt-5>
                <v-flex xs2></v-flex>
                <v-flex xs2 md3 mt-5>
                    <v-card>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-card-title>
                                <v-layout row wrap>
                                    <v-flex xs12 text-sm-center pb-0>
                                        <img :src="'/storage/image/logo.jpg'">
                                    </v-flex>
                                    <v-spacer>
                                        <h3>常州亚鹏百货有限公司</h3>
                                    </v-spacer>
                                </v-layout>
                            </v-card-title>
                            <input type="hidden" name="_token" :value="this.$csrfToken">
                            <v-card-text>
                                <v-text-field
                                        v-model="email"
                                        name="email"
                                        label="邮箱"
                                        :rules="emailRules"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        name="password"
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                        :rules="[rules.required]"
                                        :type="show1 ? 'text' : 'password'"
                                        label="密码"
                                        @click:append="show1 = !show1"
                                        v-on:keyup.13="login"
                                ></v-text-field>
                                <v-checkbox
                                        v-model="checkbox"
                                        name="remember"
                                        label="记住登录信息？"
                                ></v-checkbox>
                                <v-alert
                                    v-model="alert"
                                    type="error"
                                >
                                    邮箱和密码不匹配
                                </v-alert>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row>
                                    <v-flex xs4></v-flex>
                                    <v-flex xs4 text-sm-center>
                                        <v-btn
                                                color="primary"
                                                :disabled="!valid"
                                                @click="login"
                                        >登陆</v-btn>
                                    </v-flex>
                                    <v-flex xs4></v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-form>
                        <v-spacer>
                            <a href="/password/reset">忘记密码?</a>
                        </v-spacer>
                    </v-card>
                </v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            email: '',
            password: '',
            checkbox: false,
            show1: false,
            emailRules: [
                v => !!v || '请填写邮箱',
                v => /.+@.+/.test(v) || '请填写有效邮箱'
            ],
            rules: {
                required: value => !!value || '请输入密码',
            },
            alert: false
        }),
        computed: {

        },
        methods: {
            login () {
                let app = this;
                if (this.$refs.form.validate()) {
                    axios.post('login', {
                        email: this.email,
                        password: this.password,
                        checkbox: this.checkbox
                    })
                    .then(function (response) {
                        if(response.data.result == 'fail'){
                            app.alert = true;
                            app.password = '';
                        }else{
                            window.location.href = 'home';
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #inspire{
        background: url("/storage/image/login_background.jpg") no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    img{
        width: 200px;
        margin: auto;
    }
    .v-alert.error{
        padding: 1px;
    }
    .spacer{
        text-align: center;
        padding-bottom: 15px;
    }
    a{
        text-decoration: none;
    }
</style>