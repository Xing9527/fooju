<template>
    <div class="container">
        <login-header></login-header>
        <div class="content">
            <div class="register">
                <img src="~/assets/img/success.png" alt="">
                <p>恭喜你，注册成功，赶紧登录找房源吧！</p>
                <div class="login" @click="$router.push('/logIn')">
                    立即登录
                </div>
            </div>
            <p class="footer">北京福居网网络科技有限公司| Copyright © 2013-2017 FOOJU Corporation, All Rights Reserved 福居网 版权所有| 京ICP备13012924号-1</p>
        </div>
    </div>
</template>

<script>
    import LoginHeader from "~/components/LoginHeader"
    export default {
        name: "registerSuccess",
        components: {
            LoginHeader
        }
    }

</script>

<style scoped>
    .container {
         position: absolute;
         left: 0;
         right: 0;
         top: 0;
         bottom: 0;
         background: rgb(242,242,242);
     }
    .register {
        margin: 30px auto 0;
        padding: 40px 130px;
        width: 360px;
        background: #fff;
        text-align: center;
    }
    .register img {
        width: 136px;
        height: 136px;
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

    .register p {
        margin-top:40px;
        text-align: center;
        font-size: 14px;
    }
   .login {
       margin: 30px auto;
       width: 116px;
       height: 33px;
       text-align: center;
       line-height: 33px;
       font-size: 15px;
       color: #888;
       border: 1px solid rgba(255, 102, 51, 1);
       border-radius: 5px;
       cursor: pointer;
   }
    .footer {
        margin: 50px 0 30px;
        text-align: center;
        font-size: 14px;
    }
</style>





























