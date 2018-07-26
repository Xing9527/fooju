<template>
    <div class="box">
        <div class="logo-nav clear">
            <nuxt-link to="/">
                <div class="nav-pic clear fll">
                    <img src="~/assets/img/logo.png" alt="">
                </div>
            </nuxt-link>
            <div class="nav-header fll">
                <nuxt-link to="" :class="{active:$route.name=='usedhouse_list'}">在售</nuxt-link>
                <nuxt-link to="">小区</nuxt-link>
                <nuxt-link to="">地图找房</nuxt-link>
                <nuxt-link to="">计算器</nuxt-link>
                <nuxt-link to="">去估价</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "used-house-second",
    }
</script>

<style scoped>
    .logo-nav {
        margin: 0 auto;
        width: 1100px;
        height: 81px;
    }
    .box {
        border-bottom:1px solid #ccc;
    }
    .nav-pic{
        margin-right: 30px;
        position: relative;
        height: 81px;
        width: 128px;
    }
    .nav-pic img {
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .nav-header {
        line-height: 81px;
    }
    .nav-header a{
        margin-left: 40px;
        font-size: 16px;
        color: #000;
    }
    .nav-header a:hover {
        color: #c30d23;
    }
    .nav-header .active {
        color: #c30d23;
    }
</style>