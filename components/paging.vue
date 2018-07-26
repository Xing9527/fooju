<template>
    <div class="fenye">
        <el-pagination
                background
                layout="prev, pager, next"
                :total="count"
                @current-change="pageChange">
        </el-pagination>
    </div>
</template>

<script>
    import elementUI from "~/plugins/elementUI"
    export default {
        name: "paging",
        props:{
            count:{
                type:Number,String
            }
        },
        data() {
            return {
                currentCount:this.count,
                pn:1
            }
        },
        methods: {
            pageChange(pn) {
                this.pn = pn;
            }
        },
        watch: {
            count(val) {
                this.currentCount = val;
            },
            pn(val) {
                this.$emit("getPn",val)
            }
        }
    }
</script>

<style scoped>

</style>