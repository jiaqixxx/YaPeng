<template>
    <v-card>
        <v-card-title>
            <h2>客户列表</h2>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="newClientDialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">添加新客户</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline"></span>
                    </v-card-title>


                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="clients"
            :loading="loading"
            class="elevation-1"
        >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.created_at }}</td>
                <td class="text-xs-left">{{ props.item.updated_at }}</td>
                <td class="text-xs-center">
                    <v-btn dark color="cyan">
                        <v-icon dark>edit</v-icon>
                    </v-btn></td>
                <td class="text-xs-center">
                    <v-btn dark color="error">
                        <v-icon dark>delete_forever</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "ClientList",
        data: () => ({
            search: null,
            headers: [
                { text: '客户名称', align: 'left', value: 'name' },
                { text: '创建日期', value: 'created_at' },
                { text: '修改日期', value: 'updated_at' },
                { text: '修改', align: 'center', value: null, sortable: false},
                { text: '删除', align: 'center', value: null, sortable: false}
            ],
            clients: [],
            newClientDialog: false,
            loading: true,
        }),
        watch: {
            newClientDialog (val) {
                val || this.close()
            }
        },
        created () {
            this.init();
        },
        methods: {
            init(){
                let app = this;
                axios.get('clients')
                    .then(function(response){
                        app.clients = response.data;
                        setTimeout(() => {
                            app.loading = false;
                        }, 500)
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            close () {
                this.newClientDialog = false;
                // setTimeout(() => {
                //     this.editedItem = Object.assign({}, this.defaultItem)
                //     this.editedIndex = -1
                // }, 300)
            },

            // save () {
            //     if (this.editedIndex > -1) {
            //         Object.assign(this.desserts[this.editedIndex], this.editedItem)
            //     } else {
            //         this.desserts.push(this.editedItem)
            //     }
            //     this.close()
            // }
        }
    }
</script>

<style scoped>

</style>