<template>
    <footer>
        <div class="friendly-link">
            <div class="link-content">
                <h2>友情链接</h2>
                <ul class="clear">
                    <li>二手房网</li>
                    <li>福居网资讯</li>
                    <li>呵呵呵呵</li>
                    <li>呼和浩特</li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <div class="link-one">
                <nuxt-link to="">关于我们</nuxt-link>
                <nuxt-link to="">联系方式</nuxt-link>
                <nuxt-link to="">隐私声明</nuxt-link>
                <nuxt-link to="">版权声明</nuxt-link>
                <nuxt-link to="">法律保障</nuxt-link>
            </div>
            <p>温馨提示：呼和浩特房地产网最新购房信息请及时查看呼和浩特房地产业网官方网站【福居网】</p>
            <p>地 址： 呼和浩特市赛罕区恩和大厦1909室 电 话:400-898-1018</p>
            <p>北京福居网网络科技有限公司 Copyright © 2013-2017 FOOJU Corporation, All Rights Reserved 福居网 版权所有| 京ICP备13012924号-1</p>
            <div class="pic-link">
                <img src="~/assets/img/u1081.png" alt="">
                <img src="~/assets/img/u1083.png" alt="">
                <img src="~/assets/img/u1087.png" alt="">
            </div>
        </div>
    </footer>
</template>

<style scoped>
    .friendly-link {
        background: rgb(244, 244, 244);
    }

    .link-content {
        margin: 0 auto;
        padding: 65px 0;
        width: 1100px;
    }

    .link-content h2 {
        color: #000;
        font-size: 30px;
        font-weight: 700;
    }

    .link-content li {
        float: left;
        margin: 30px 60px 0 0;
        font-size: 14px;
        cursor: pointer;
    }

    .footer {
        padding: 60px 0 110px;
        height: 444px;
        background-image: url("../assets/img/footerBg.png");
        box-sizing: border-box;
        text-align: center;
    }
    .footer a{
        margin-left: 105px;
        color: #fff;
        font-size: 16px;
    }
    .footer a:nth-of-type(1){
        margin: 0;
    }
    .footer p{
        margin: 30px 0;
        color: #fff;
        font-size: 14px;
    }
    .pic-link img:nth-of-type(3){
        height: 47px;
    }
    .pic-link img {
        margin: 40px 2px 0;
        cursor: pointer;
    }
</style>
