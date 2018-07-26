<template>
    <div class="select">
        <span @click="show">
            <slot v-if="value==0"></slot>
            {{title}}
            <i class="iconfont icon-down"></i>
        </span>
        <ul v-if="isShow">
            <li @click="handleClick" v-for="item in currentOptions" :value="item.value" :title="item.title" v-model="value">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "my-select",
        props:{
            options:{
                type:Array
            }
        },
        data() {
            return {
                currentOptions:this.options,
                value:0,
                title:"",
                isShow:false
            }
        },
        methods: {
            show() {
                if(!this.isShow) {
                    this.isShow = true;
                }else {
                    this.isShow = false;
                }
            },
            handleClick(ev) {
                this.isShow = false;
                this.title = ev.target.title;
                this.value = ev.target.value;
                // console.log(this.value)
            }
        },
        watch: {
            options(val) {
                this.currentOptions = val;
            },
            value(val) {
                this.$emit("getValue",val)
            }
        }
    }
</script>

<style scoped>
    .select {
        margin: 50px auto;
        width: 200px;
    }
span {
    display: block;
    width: 198px;
    line-height: 25px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
}
    span i {
        margin-right: 20px;
        float: right;
    }
    ul {
        transition: all linear .3s;
    }
    li {
        width: 198px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        background: #f4f4f4;
        cursor: pointer;
    }
    li:hover {
        background: #fff;
    }
</style>