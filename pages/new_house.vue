<template>
    <div class="container">
        <MySelect :options="options" v-model="value" @getValue="getValue">不限</MySelect>

    </div>
</template>

<script>
    import MySelect from "~/components/MySelect"
    export default {
        name: "new_house",
        components: {
            MySelect
        },
        data() {
            return {
                options:[
                    {
                        title:"不限",
                        value:1
                    },
                    {
                        title:"嘻嘻",
                        value:2
                    },
                    {
                        title:"呵呵",
                        value:3
                    },
                    {
                        title:"哈哈",
                        value:4
                    }
                ],
                value:0
            }
        },
        methods: {
            getValue(val) {
                this.value = val;
            }
        }
    }
</script>

<style scoped>

</style>