<template>
    <header>
        <div class="header">
            <div class="left fll">
                <nuxt-link to="/" class="fll" >
                    <img src="~/assets/img/logo.png" alt=""  class="logo">
                </nuxt-link>
                <div class="header-map fll">
                    <img src="~/assets/img/map.png" alt="">
                    新城区
                </div>
            </div>
            <ul class="fll">
                <nuxt-link to="/">
                    <li :class="{active:$route.name=='index'}">首页</li>
                </nuxt-link>
                <nuxt-link to="/used_house_list">
                    <li>二手房</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>新房</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>租房</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>学区房</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>小区</li>
                </nuxt-link>
                <nuxt-link to="/broker">
                    <li  :class="{active:$route.name=='broker'}">经纪人</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>百科</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li class="slide-container">在线委托
                        <div class="slide">
                            <span>我是业主</span>
                            <span>帮我找房</span>
                        </div>
                    </li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>工具</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>专题</li>
                </nuxt-link>
            </ul>
            <div class="login">
                <img src="~/assets/img/login_user.png" alt="">
                <nuxt-link to="" v-if="username">{{username}}</nuxt-link>
                <nuxt-link to="/logIn" v-else>登录</nuxt-link>
                <span></span>
                <a  v-if="username" @click="logout" class="logout">退出</a>
                <nuxt-link to="/register" v-else>立即注册</nuxt-link>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from "vuex"
    import common from "~/js/common"
    import cookies from "js-cookie"
    export default {
        data() {
            return {
                username:cookies.get("username")
            }
        },
        methods: {
            getLoginStatus:common.getLoginStatus,
            logOut:common.logOut,
            logout() {
                this.logOut();
                this.$router.go(0)
            }
        },
        computed: {
            ...mapState([
                'userid',
                'userpic',
                'userphone'
            ])
        },
        created() {
            this.getLoginStatus()
        }
    }
</script>

<style scoped>
header{
    position: relative;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 1px solid #D2101B;
    z-index: 997;
    background: #fff;
    clear: both;
}
.header{
    position:absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 1100px;
}
.left{
    margin-top:10px;
}
.logo{
    width: 120px;
    height: 37px;
}
.header-map{
    margin: 0 20px 0 20px;
    padding: 8px;
    width: 79px;
    height: 36px;
    box-sizing: border-box;
    text-align: center;
    font-size: 13px;
    border: 1px solid #D2101B;
    border-radius:19px;
}
.header-map img {
    float: left;
    width: 20px;
    height: 20px;
}
li{
    margin: 0 10px;
    float: left;
    height: 57px;
    font-size: 18px;
    line-height: 57px;
}
li:hover{
    color:#D2101B;
    border-bottom:3px solid #D2101B;
    box-sizing:border-box;
}
ul .active {
    color:#D2101B;
    border-bottom:3px solid #D2101B;
    box-sizing:border-box;
}
.login{
    float: right;
    font-size:14px;
    height: 20px;
    line-height: 57px;
}
.login img{
    width: 14px;
    height: 14px;
}
.login a{
    margin-left:8px;
}
.logout {
    cursor: pointer;
}
.slide-container {
    position: relative;
}
.slide {
    display: none;
    position: absolute;
    top: 58px;
    background: #fff;
}

.slide span {
    display: block;
    margin-top: 5px;
    line-height: 25px;
    color: #333;
}
.slide span:hover {
    color: #D2101B;
}
.slide-container:hover .slide {
    display: block;
}
</style>