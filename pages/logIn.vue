<template>
    <div class="container">
        <login-header></login-header>
        <div class="content">
            <div class="register">
                <div class="top clear">
                    <h2>登录</h2>
                    <nuxt-link to="/register">没有账号，立即注册</nuxt-link>
                </div>
                <div class="form">
                    <div class="input">
                        <input type="text" placeholder="请输入手机号" v-model="mobile">
                        <i class="iconfont icon-phone"></i>
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="pwd">
                        <i class="iconfont icon-suozi"></i>
                    </div>
                    <div class="btn" @click="login">
                        登录
                    </div>
                    <p>
                        <nuxt-link to="">忘记密码？</nuxt-link>
                    </p>
                    <div class="three-login">
                        <div class="item">
                            <img src="~/assets/img/u336.png" alt="">
                            <span>QQ登录</span>
                        </div>
                        <div class="item">
                            <img src="~/assets/img/u326.png" alt="">
                            <span>微信登录</span>
                        </div>
                        <div class="item">
                            <img src="~/assets/img/u331.png" alt="">
                            <span>新浪微博登录</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="footer">北京福居网网络科技有限公司| Copyright © 2013-2017 FOOJU Corporation, All Rights Reserved 福居网 版权所有| 京ICP备13012924号-1</p>
        </div>
    </div>
</template>

<script>
    import LoginHeader from "~/components/LoginHeader"
    import axios from "~/plugins/axios"
    import md5 from "blueimp-md5"
    import cookies from "js-cookie"
    import elementUI from "~/plugins/elementUI"

    export default {
        name: "register",
        components: {
            LoginHeader
        },
        data() {
            return {
                mobile:null,
                pwd:""
            }
        },
        methods: {
            login() {
                let params = {
                    mobile: this.mobile,
                    password: md5(md5(this.pwd))+"fujuwang"
                }
                this.$axios.post("/api.php?s=Login/login", params).then(res => {
                    if(res.data.code == 200){
                        cookies.set("userid", res.data.data.id, {expires: 10});
                        cookies.set("username", res.data.data.username, {expires: 10})
                        cookies.set("userpic", res.data.data.face, {expires: 10})
                        cookies.set("userphone", res.data.data.mobile, {expires: 10})
                        this.$message({
                            message: '登录成功，正在为您跳转',
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.go(-1)
                        },1000)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background: rgb(242,242,242);
    }
    .register {
        margin: 30px auto 0;
        padding: 40px 130px;
        width: 360px;
        background: #fff;
    }
    .top h2 {
        float: left;
        font-size: 28px;
        line-height: 28px;
    }
    .top a {
        margin-top:8px;
        float: right;
        font-size: 14px;
        color: #f90;
    }
    .top {
        margin-bottom: 35px;
    }
    .input {
        position: relative;
        margin-bottom: 30px;
    }
    .input i {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
    }
    input {
        padding-left: 30px;
        width: 360px;
        height: 54px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        font-size: 16px;
    }
    .btn {
        width: 360px;
        height: 54px;
        color: #fff;
        font-size: 16px;
        background: #c30d23;
        text-align: center;
        line-height: 54px;
        cursor: pointer;
    }
    .register p {
        padding-bottom: 15px;
        margin:30px auto 0;
        width: 300px;
        text-align: center;
        font-size: 13px;
        border-bottom: 1px solid #ccc;
    }
    .register p a {
        color: #666;
        font-size: 14px;
    }
    .register p a:hover {
        color: #333;
    }
    .three-login {
        padding: 0 10px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .three-login .item img {
        width: 40px;
        height: 40px;
    }
    .item {
        text-align: center;
        cursor:pointer;
    }
    .item span {
        display: block;
    }
    .footer {
        padding-bottom: 30px;
        margin: 50px 0 0;
        text-align: center;
        font-size: 14px;
    }
</style>





























