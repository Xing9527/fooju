<template>
    <header>
        <div class="container">
            <img src="~/assets/img/logo.png" alt="">
            <nuxt-link to="/">
                返回福居网首页
                <i class="iconfont icon-right2"></i>
            </nuxt-link>
        </div>
    </header>
</template>

<script>
    export default {
        name: "login-header",

    }
</script>

<style scoped>
    header {
        background: #fff;
    }
    .container {
        position: relative;
        margin: 0 auto;
        width: 1100px;
        height: 80px;
        line-height: 80px;
    }
    .container img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .container a{
        margin-right: 25px;
        float: right;
        font-size: 14px;
        color: #777;
    }
    i {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-size: 22px;
    }
</style>




























