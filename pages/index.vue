<template>
    <div class="container">
        <my-header></my-header>
        <my-sidebar></my-sidebar>
        <div class="big-img" v-banner>
            <img class="img" src="http://www.fooju.cn/fjw/uploads/ad/20170818/5996bc3f76b2a.jpg" alt="">
            <div class="up-search">
                <div class="search">
                    <ul class="clear">
                        <li class="item" :class="{active:index == 0}" @click="index=0">找二手房</li>
                        <li class="item" :class="{active:index == 1}" @click="index=1">找新房</li>
                        <li class="item" :class="{active:index == 2}" @click="index=2">找租房</li>
                        <li class="item" :class="{active:index == 3}" @click="index=3">找学区房</li>
                        <li class="item" :class="{active:index == 4}" @click="index=4">找小区</li>
                    </ul>
                    <div class="search-content clear">
                        <input type="text" class="fll" :placeholder="placeholderText" v-model="keywords" @keyup="keyUp">
                        <span class="search-button fll" @click="searchHouse">
                            搜索
                        </span>
                        <span class="search-map">
                        <img src="~/assets/img/mapSearch.png" alt="">
                            地图找房
                        </span>
                    </div>
                    <div class="header-msg clear">
                        <img src="~/assets/img/toutiao.png" alt="">
                        <ul v-swiperText>
                            <li>二手房交易流程详解</li>
                            <li>“租”生活让时代镜像更精彩</li>
                            <li>买房攻略:二手房看房容易忽视哪些细节?</li>
                            <li>新房和二手房的区别到底有哪些？</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="pic-nav">
            <div class="four-nav clear">
                <div class="four-item fll">
                    <img src="~/assets/img/store.png" alt="">
                    <h3>查门店</h3>
                    <p>查优质门店</p>
                </div>
                <div class="four-item fll">
                    <img src="~/assets/img/entrust.png" alt="">
                    <h3>在线委托</h3>
                    <p>有问题我们帮你</p>
                </div>
                <div class="four-item fll">
                    <img src="~/assets/img/mapBlue.png" alt="">
                    <h3>地图找房</h3>
                    <p>地图找房</p>
                </div>
                <div class="four-item fll">
                    <img src="~/assets/img/encyclopedias.png" alt="">
                    <h3>福居百科</h3>
                    <p>看百科了解更多</p>
                </div>
            </div>
            <div class="three-nav">
                <div class="three-item">
                    <img src="~/assets/img/zsfy.png" alt="">
                </div>
                <div class="three-item">
                    <img src="~/assets/img/dbf.png" alt="">
                </div>
                <div class="three-item">
                    <img src="~/assets/img/feature.png" alt="">
                </div>
            </div>
        </div>
        <div class="content-nav">
            <div class="house-container">
                <div class="house-item clear">
                    <h2 class="fll">精品新房</h2>
                    <nuxt-link to="" style="float: right">
                        <span class="fll">更多新房</span>
                        <i class="iconfont icon-right fll"></i>
                    </nuxt-link>
                </div>
                <p class="house-header-msg">在这里为您寻觅一个新家</p>
                <div class="house-list">
                    <div class="house-list-item" v-for="item in newHouse" :key="item.id">
                        <img :src="'http://www.fooju.cn'+item.pic" alt="">
                        <p><span class="fll"></span>{{item.title}}<span
                                style="float: right">{{item.average_price}}元 /平</span></p>
                    </div>
                </div>
            </div>
            <div class="house-container">
                <div class="house-item clear">
                    <h2 class="fll">二手优品</h2>
                    <nuxt-link to="/used_house_list" style="float: right">
                        <span class="fll">更多二手房</span>
                        <i class="iconfont icon-right fll"></i>
                    </nuxt-link>
                </div>
                <p class="house-header-msg">生活因为宽广，才会不断延伸</p>
                <div class="two-hand">
                    <div class="two-hand-item" v-for="item in usedHouse" :key="item.id">
                        <div class="used-house-pic" @click="$router.push({path:'/detail_used',query:{id:item.id}})">
                            <img :src="'http://www.fooju.cn'+item.pic" alt="">
                        </div>
                        <div class="used-house-price">
                            <img src="~/assets/img/pricetag.png" alt="">
                            <span>{{item.total_price}}万</span>
                        </div>
                        <h3 class="used-house-title">{{item.village}} {{item.property_right}} {{item.decoration}}</h3>
                        <p class="used-house-dec">{{item.bedroom}}室{{item.livingroom}}厅{{item.wc}}卫
                            {{item.built_area}}㎡</p>
                    </div>
                </div>
            </div>
            <div class="ad">
                <img src="~/assets/img/guanggaowei.png" alt="">
                <h2>通栏广告位</h2>
            </div>
            <div class="house-container">
                <div class="house-item clear">
                    <h2 class="fll">精品租房</h2>
                    <nuxt-link to="" style="float: right">
                        <span class="fll">更多租房</span>
                        <i class="iconfont icon-right fll"></i>
                    </nuxt-link>
                </div>
                <p class="house-header-msg">与其等待，不如坐享繁华</p>
                <div class="two-hand">
                    <div class="two-hand-item" v-for="item in retHouse" :key="item.id">
                        <div class="used-house-pic">
                            <img :src="'http://www.fooju.cn'+item.pic" alt="">
                        </div>
                        <h3 class="used-house-title">{{item.village}} {{item.property_right}} {{item.decoration}}</h3>
                        <p class="used-house-dec">{{item.bedroom}}室{{item.livingroom}}厅{{item.wc}}卫 {{item.built_area}}㎡
                            <span class="ret-house-right">{{item.rent}}{{item.rent_type}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import MyHeader from '~/components/Header.vue'
    import MySidebar from '~/components/Sidebar.vue'
    import MyFooter from '~/components/Footer.vue'
    import elementUI from "~/plugins/elementUI"



    export default {
        data() {
            return {
                index: 0,
                placeholderText: "输入小区名查找二手房",
                newHouse:[],
                usedHouse:[],
                retHouse:[],
                load:null,
                keywords:""
            }
        },
        components: {
            MyHeader,
            MySidebar,
            MyFooter
        },
        methods: {
            loading() {
                this.load = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            getData() {
                axios.get(api.paramToUrl(api.recommend,{type:0,position:0})).then(res => {
                    this.newHouse = res.data.new.slice(0,3);
                    this.usedHouse = res.data.used;
                    this.retHouse = res.data.retal;
                    this.load.close();
                })
            },
            searchHouse() {
                this.$router.push({path:"/used_house_list",query:{q:this.keywords}});
            },
            keyUp(key) {
                if(key.keyCode == 13) {
                    this.searchHouse()
                }
            },
            handleScroll() {
                console.log(111);
            }
        },
        mounted() {
            window.addEventListener('scroll',this.handleScroll)
            this.loading();
            this.getData();
        },
        directives: {
            swiperText: {
                inserted(el) {
                    let sText = document.querySelectorAll(".header-msg li");
                    let sUl = document.querySelector(".header-msg ul");
                    let sTop = 0;
                    setInterval(() => {
                        sTop += 30;
                        if(sTop >= sText.length*30){
                            sUl.style.transition = "none";
                            sTop = 0;
                        }else {
                            sUl.style.transition = "all linear .5s"
                        }
                        sUl.style.marginTop = -sTop + "px";
                    },2000)
                }
            },
            banner: {
                inserted(el) {
                    function bannerSize() {
                        let bannerHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 80;
                        let bannerWidth = document.documentElement.clientWidth || document.body.clientWidth;
                        let bannerRate = bannerWidth / bannerHeight;
                        let img = document.querySelector(".img");
                        let imgWidth = img.offsetWidth;
                        let imgHeight = img.offsetHeight;
                        let imgRate = imgWidth / imgHeight;
                        if (bannerRate > imgRate) {
                            img.style.width = bannerWidth + "px";
                            img.style.height = "auto";
                            img.style.marginTop = -(img.offsetHeight - bannerHeight) / 2 + "px";
                        } else {
                            img.style.height = bannerHeight + "px";
                            img.style.width = "auto";
                            img.style.marginLeft = -(img.offsetWidth - bannerWidth) / 2 + "px";
                        }
                    }

                    bannerSize();
                    window.onresize = bannerSize;
                },
                unbind(el) {
                    window.onresize = null;
                }
            }
        },
        watch: {
            index(val) {
                switch (val) {
                    case 0:
                        this.placeholderText = "输入小区名查找二手房";
                        break;
                    case 1:
                        this.placeholderText = "输入楼盘名进行搜索";
                        break;
                    case 2:
                        this.placeholderText = "输入小区名可以查找出租的房屋";
                        break;
                    case 3:
                        this.placeholderText = "输入小区名搜索学区房";
                        break;
                    case 4:
                        this.placeholderText = "找小区要输入小区名";
                        break;

                }
            }
        }
    }
</script>
<style scoped>
    .big-img {
        position: relative;
        background: #000;
    }

    .big-img img {
        display: block;
        width: 100%;
        opacity: .7;
    }

    .up-search {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
    }

    .search {
        margin: 0 auto;
        width: 1100px;
        color: #fff;
        opacity: 1;
    }

    .search .item {
        position: relative;
        float: left;
        margin-right: 20px;
        height: 48px;
        font-size: 16px;
        cursor: pointer;
    }

    .search .item:hover {
        font-weight: 700;
    }

    ul .active {
        font-weight: 700;
    }

    .active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-bottom: 10px solid #fff;
    }

    .search-content input {
        padding: 0 15px;
        background: #fff;
        width: 720px;
        height: 60px;
        font-size: 16px;
        color: #666;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
    }

    .search-button {
        display: inline-block;
        background: #c30d23;
        font-size: 16px;
        height: 60px;
        width: 160px;
        text-align: center;
        line-height: 60px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        cursor: pointer;
    }

    .search-map {
        float: right;
        position: relative;
        display: inline-block;
        background: #5f1985;
        font-size: 16px;
        height: 60px;
        width: 160px;
        text-align: center;
        line-height: 60px;
        border-radius: 5px;
        cursor: pointer;
    }

    .search-map img {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }

    .header-msg {
        margin: 70px 0 0;
        height: 30px;
        overflow: hidden;
    }

    .header-msg ul {
        margin-left: 10px;
        float: left;
        width: 300px;
        font-size: 16px;
        line-height: 30px;
    }

    .header-msg img {
        width: 100px;
        height: 30px;
        float: left;
    }

    .header-msg li {
        width: 300px;
        height: 30px;
    }

    .pic-nav {
        margin: 40px auto;
        width: 1100px;
    }

    .four-nav {
        margin-bottom: 40px;
    }

    .four-item {
        margin: 0 40px;
        width: 195px;
        height: 162px;
        text-align: center;
        cursor: pointer;
    }

    .four-item h3 {
        margin: 20px 0 10px;
        font-size: 18px;
        color: #333;
    }

    .four-item p {
        font-size: 13px;
    }

    .three-nav {
        margin: 40px 0;
        display: flex;
        justify-content: space-between;
    }

    .three-item {
        cursor: pointer;
        width: 300px;
        height: 225px;
    }

    .content-nav {
        margin: 0 auto;
        width: 1100px;
    }

    .house-container {
        margin-bottom: 40px;
    }

    .house-item h2 {
        font-size: 30px;
        font-weight: 700;
        color: #111;
    }

    .house-item a {
        color: #666;
        font-size: 16px;
    }

    .house-item i {
        font-size: 22px;
    }

    .house-header-msg {
        margin: 20px 0 30px;
        font-size: 16px;
    }

    .house-list {
        display: flex;
        justify-content: space-between;
    }

    .house-list-item {
        position: relative;
        width: 342px;
        height: 257px;
        cursor: pointer;
        perspective: 1000px;
        overflow: hidden;
    }

    .house-list-item:hover img {
        transform: translateZ(100px);
    }

    .house-list-item img {
        width: 342px;
        height: 257px;
        transition: all linear .5s;
    }

    .house-list-item p {
        padding: 3px 8px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
        color: #fff;
        font-size: 16px;
    }

    .used-house-pic {
        position: relative;
        width: 342px;
        height: 257px;
        cursor: pointer;
        perspective: 1000px;
        overflow: hidden;
    }

    .used-house-pic:hover img {
        transform: translateZ(100px);
    }

    .used-house-pic img {
        width: 342px;
        height: 257px;
        transition: all linear .5s;
    }

    .two-hand {
        display: flex;
        justify-content: space-between;
    }

    .two-hand-item {
        position: relative;
    }

    .used-house-price {
        position: absolute;
        top: 10px;
        left: 0;
    }

    .used-house-price span {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 20px;
    }

    .used-house-title {
        margin: 20px 0;
        font-size: 16px;
        color: #333;
    }

    .used-house-dec {
        font-size: 14px;
    }

    .ret-house-right {
        float: right;
        color: #c30d23;
    }

    .ad {
        position: relative;
        margin-bottom: 40px;
        height: 180px;
    }

    .ad img {
        display: block;
        width: 100%;
        height: 180px;
    }

    .ad h2 {
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 30px;
    }

</style>
