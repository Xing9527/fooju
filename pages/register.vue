<template>
    <div class="container">
        <login-header></login-header>
        <div class="content">
            <div class="register">
                <div class="top clear">
                    <h2>创建账号</h2>
                    <nuxt-link to="/logIn">已有账号，立即登录</nuxt-link>
                </div>
                <div class="form">
                    <div class="input">
                        <input type="text" placeholder="请输入手机号" v-model="formData.phoneNum" @keyup="testMobile">
                        <i class="iconfont icon-phone"></i>
                    </div>
                    <div class="err-msg">
                        {{errMsg}}
                    </div>
                    <div class="duanxin clear">
                        <div class="input fll" >
                            <input type="text" placeholder="请输入短信验证码" style="width: 238px;" v-model="formData.shortMsg">
                            <i class="iconfont icon-suozi"></i>
                        </div>
                        <div class="huoqu" @click="getShortMsg">
                            {{btnText}}
                        </div>
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入6-18位密码" v-model="formData.pwd">
                        <i class="iconfont icon-suozi"></i>
                    </div>
                    <div class="input">
                        <input type="text" placeholder="请输入昵称" v-model="formData.name">
                        <i class="iconfont icon-bianjiqianbixieshuru"></i>
                    </div>
                    <div class="btn" @click="submit">
                        立即注册
                    </div>
                    <p>
                        点击立即注册，则表示您阅读并同意遵守
                        <nuxt-link to="">福居网平台服务协议</nuxt-link>
                    </p>
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
    export default {
        name: "register",
        components: {
            LoginHeader
        },
        data() {
            return {
                formData:{
                    phoneNum:"",
                    shortMsg:"",
                    pwd:"",
                    name:""
                },
                errMsg:"",
                btnText:"获取验证码",
                isSend:true
            }
        },
        methods: {
            testMobile() {
                let mobileReg = /((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
                this.errMsg = mobileReg.test(this.formData.phoneNum)? "" : "请输入正确的手机号码！"
                return mobileReg.test(this.formData.phoneNum)
            },
            getShortMsg() {
                if(this.testMobile() && this.isSend) {
                    axios.get(`/api.php?s=Msg/send_msg/mobile/${this.formData.phoneNum}`).then(res => {
                        this.send()
                    }).catch(err => {
                        alert(err)
                    })
                }
            },
            send() {
                this.isSend = false;
                let time = 60;
                this.btnText = time + "s后重新发送";
                let timer = setInterval(() => {
                    time--;
                    this.btnText = time + "s后重新发送";
                    if(time<=0) {
                        clearInterval(timer)
                        this.btnText = "重新发送";
                        this.isSend = true;
                    }
                },1000)
            },
            submit() {
                axios.get(`/api.php?s=Msg/verify/mobile/${this.formData.phoneNum}/verify/${this.formData.shortMsg}`)
                    .then(res => {
                        console.log(res.data.code)
                        if(res.data.code!=200){
                            alert("验证码不正确或已失效")
                        }
                        else{
                                let params = {
                                    password: md5(md5(this.formData.pwd)) + "fujuwang",
                                    mobile: this.formData.phoneNum,
                                    username: this.formData.name

                                }
                                this.$axios.post("/api.php?s=Login/register",params).then(res => {
                                    if(res.data.code == 102) {
                                        alert("此手机号已被注册")
                                    }
                                    if(res.data.code==200) {
                                        this.$router.push("/registerSuccess")
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                    }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        background: rgb(242,242,242);
        min-height: 100vh;
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
        margin-bottom: 20px;
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
    .huoqu {
        float: right;
        width: 110px;
        height: 54px;
        text-align: center;
        line-height: 54px;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid #ccc;
        box-sizing:border-box;
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
        margin-top:30px;
        text-align: center;
        font-size: 13px;
    }
    .register p a {
        color: #000;
        font-weight: 700;
        font-size: 13px;
    }
    .register p a:hover {
        color: #333;
    }
    .footer {
        padding-bottom: 30px;
        margin: 50px 0 0;
        text-align: center;
        font-size: 14px;
    }
    .err-msg {
        margin-bottom: 20px;
        font-size: 16px;
        color: #c30d23;
    }
</style>





























