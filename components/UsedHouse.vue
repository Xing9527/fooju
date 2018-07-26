<template>
    <header>
        <div class="container">
            <ul class="fll">
                <nuxt-link to="/">
                    <li>首页</li>
                </nuxt-link>
                <nuxt-link to="/used_house_list" >
                    <li :class="{active:$route.name=='usedhouse_list'}">二手房</li>
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
                    <li>经纪人</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>百科</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>在线委托</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>工具</li>
                </nuxt-link>
                <nuxt-link to="">
                    <li>专题</li>
                </nuxt-link>
            </ul>
            <div class="login">
                <span>
                    <nuxt-link to=""  v-if="username">{{username}}</nuxt-link>
                    <nuxt-link to="/logIn" v-else>登录</nuxt-link>
                </span>
                <span class="line">|</span>
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
        name: "used-house",
        data() {
          return {
            username:cookies.get('username')
          }
        },
        methods: {
            getLoginStatus: common.getLoginStatus,
            logOut: common.logOut,
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
    .container {
        margin: 0 auto;
        width: 1100px;
    }
    header{
        height: 60px;
        box-sizing: border-box;
        z-index: 997;
        background: rgb(244,244,244);
    }
    li{
        margin-right:35px;
        float: left;
        height: 59px;
        font-size: 16px;
        line-height: 59px;
        color: #000;
    }
    li:hover{
        color:#D2101B;
        border-bottom:2px solid #D2101B;
        box-sizing:border-box;
    }
    ul .active {
        color:#D2101B;
        border-bottom:2px solid #D2101B;
        box-sizing:border-box;
    }
    .login{
        float: right;
        font-size:12px;
        height: 20px;
        line-height: 57px;
    }
    .login .line {
        color: #000;
        font-size: 18px;
    }
    .login img{
        width: 14px;
        height: 14px;
    }
    .login a{
        margin:0 10px;
    }
    .logout {
        cursor: pointer;
    }
</style>