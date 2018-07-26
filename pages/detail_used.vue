<template>
    <div class="container">
        <UsedHouseHeader></UsedHouseHeader>
        <UsedHouseSecond></UsedHouseSecond>
        <MySidebar></MySidebar>
        <div class="box clear">
            <div class="header-nav clear">
                <div class="back-nav fll">
                    <nuxt-link to="/">福居网</nuxt-link><span> > </span>
                    <nuxt-link to="/used_houst_list">二手房</nuxt-link><span> > </span>
                    <nuxt-link to="">{{baseInfo.title}}</nuxt-link>
                </div>
                <div class="share-care">
                    <span v-if="baseInfo.shoucang == 0 || !baseInfo.shoucang" @click="care">
                        <i class="iconfont icon-xingxing"></i>
                        关注此房源
                    </span>
                    <span class="care" v-else @click="overCare">
                        <i class="iconfont icon-xingxing"></i>
                        已关注
                    </span>
                    <span @click="share">
                        <i class="iconfont icon-fenxiang"></i>
                        分享此房源
                    </span>
                    <div class="share" v-if="isShow" @click="overShare">
                        <img src="~/assets/img/share.png" alt="">
                    </div>
                </div>
            </div>
            <div class="base-info clear">
                <h1>{{baseInfo.title}}</h1>
                <div class="show-pic fll clear">
                    <ul class="clear">
                        <li v-for="item in picList">
                            <img :src="'http://www.fooju.cn'+item.pic" alt="">
                        </li>
                    </ul>
                    <div class="swiper clear">
                        <span class="fll"><i class="iconfont icon-left"></i></span>
                        <div class="swiper-container fll clear">
                            <div class="swiper-show clear">
                                <div class="swiper-content fll" v-for="item in picList" @click="checked()">
                                    <img :src="'http://www.fooju.cn'+item.pic" alt="">
                                </div>
                            </div>
                        </div>
                        <span style="float: right;"><i class="iconfont icon-xiangyou"></i></span>
                    </div>
                </div>
                <div class="right-info clear">
                    <div class="right-top-info clear">
                        <h3><span>{{baseInfo.total_price}}</span>万</h3>
                        <div class="right-price">
                            <p>{{baseInfo.unit_price}} 元/平米</p>
                            <p>首付 待定</p>
                        </div>
                    </div>
                    <div class="right-second-info">
                        <div class="second-item">
                            <span>{{baseInfo.bedroom}}室{{baseInfo.livingroom}}厅</span>
                            <p>{{baseInfo.floor}}|{{baseInfo.floor_totle}}层</p>
                        </div>
                        <div class="second-item">
                            <span>{{baseInfo.direction}}</span>
                            <p>{{baseInfo.decoration}}</p>
                        </div>
                        <div class="second-item">
                            <span>{{baseInfo.built_area}}平米</span>
                            <p>{{baseInfo.type}}</p>
                        </div>
                    </div>
                    <div class="right-third-info">
                        <div class="third-left fll">
                            <p>房源编号：<span>{{baseInfo.number}}</span></p>
                            <p>所在区域：<span></span></p>
                        </div>
                        <div class="third-right">
                            <p>小区名称：<span>{{baseInfo.village}}</span></p>
                            <p>看房时间：<span></span></p>
                        </div>
                    </div>
                    <div class="right-last-info clear">
                        <div class="last-left fll">
                            <nuxt-link :to="'/broker_detail?id=' + agent_info.id">
                                <img :src="'http://www.fooju.cn'+baseInfo.face" alt="">
                            </nuxt-link>
                        </div>
                        <div class="last-middle fll">
                            <nuxt-link :to="'/broker_detail?id=' + agent_info.id">{{baseInfo.name}}</nuxt-link>
                            <p>从业年限：{{baseInfo.congye_time}}年</p>
                            <div class="last-phone">
                                {{baseInfo.f_phone}} 转 {{baseInfo.phone}}
                            </div>
                        </div>
                        <div class="last-right">
                            评分：{{baseInfo.avg_score}}/{{baseInfo.c_num}}人评价
                        </div>
                        <div class="look-house">
                            <nuxt-link to="">预约看房</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <h1>基本信息</h1>
            <div class="detail-info clear">
                <div class="detail-left fll">
                    <p>房屋户型：<span>{{baseInfo.bedroom}}室{{baseInfo.livingroom}}厅{{baseInfo.wc}}卫</span></p>
                    <p>建筑面积：<span>{{baseInfo.built_area}}㎡</span></p>
                    <p>套内面积：<span>{{baseInfo.use_area}}㎡</span></p>
                    <p>房屋朝向：<span>{{baseInfo.direction}}㎡</span></p>
                    <p>装修情况：<span>{{baseInfo.decoration}}㎡</span></p>
                    <p>产权年限：<span>{{baseInfo.chanquannianxian}}年</span></p>
                    <p>交通情况：<span>{{baseInfo.traffic}}</span></p>
                    <p>挂牌时间：<span>{{baseInfo.guapai}}</span></p>
                </div>
                <div class="detail-right">
                    <p>所在楼层：<span>{{baseInfo.floor}}|{{baseInfo.floor_totle}}</span></p>
                    <p>房屋类型：<span>{{baseInfo.purpose}}</span></p>
                    <p>建筑类型：<span>{{baseInfo.type}}</span></p>
                    <p>建筑结构：<span>{{baseInfo.jianzhujiegou}}</span></p>
                    <p>梯户比例：<span>{{baseInfo.tihubili}}</span></p>
                    <p>配备电梯：<span>{{baseInfo.dianti}}</span></p>
                    <p>产权性质：<span>{{baseInfo.chanquanxingzhi}}</span></p>
                    <p>建造年代 ：<span></span></p>
                </div>
            </div>
            <h1>房源特色</h1>
            <div class="house-special">
                <p>房源标签：<span class="label" v-for="item in baseInfo.lable">{{item.name}}</span></p>
                <p>核心卖点：<span>{{baseInfo.highlights}}</span></p>
                <p>户型介绍：<span>{{baseInfo.house_introduce}}</span></p>
                <p>小区介绍：<span>{{baseInfo.village_introduce}}</span></p>
                <p>周边配套：<span>{{baseInfo.peripheral_matching}}</span></p>
            </div>
            <h1>房源照片</h1>
            <div class="house-pic clear">
                <div class="house-img fll" v-for="item in houseImgs" @click="showBigImg($event)">
                    <img :src="'http://www.fooju.cn'+item.lists[0].pic" alt="">
                    <span>{{item.lists[0].type}}</span>
                </div>
            </div>
            <div class="show-big-img" >
                <img src="" alt="">
                <span class="iconfont icon-x" @click="closeBigImg"></span>
            </div>
            <h1>周边配套</h1>
            <div class="map-arround clear">
                <div class="map-show fll" id="container"></div>
                <div class="map-search">
                    <ul class="clear">
                        <li :class="{active:isActive == 1}" @click="changeMap1">交通</li>
                        <li :class="{active:isActive == 2}" @click="changeMap2">商业</li>
                        <li :class="{active:isActive == 3}" @click="changeMap3">教育</li>
                        <li :class="{active:isActive == 4}" @click="changeMap4">医院</li>
                    </ul>
                    <div class="map-list" >
                        <p v-show="isActive==1" >两公里以内的 交通设施</p>
                        <p v-show="isActive==2" >两公里以内的 商业设施</p>
                        <p v-show="isActive==3" >两公里以内的 教育设施</p>
                        <p v-show="isActive==4" >两公里以内的 医院设施</p>
                        <div id="results"></div>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import UsedHouseHeader from "~/components/UsedHouse.vue"
    import UsedHouseSecond from "~/components/UsedHouseSecond.vue"
    import MyFooter from "~/components/Footer.vue"
    import MySidebar from '~/components/Sidebar.vue'
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import cookies from "js-cookie"
    import elementUI from "~/plugins/elementUI"

    export default {
        name: "used_house_detail",
        components: {
            UsedHouseHeader,
            UsedHouseSecond,
            MySidebar,
            MyFooter
        },
        data() {
            return {
                houseDetail:[],
                picList:[],
                agent_info:[],
                baseInfo:[],
                zIndex:998,
                bigPic:[],
                smallPic:[],
                marginLeft:0,
                houseImgs:[],
                isActive:1,
                mapArea:"",
                mapIcon:"公交站",
                userid:cookies.get("userid"),
                isShow:false
            }
        },
        methods: {
            getHouseDetail() {
                this.$axios.get(api.paramToUrl(api.used_detail,{id:this.$route.query.id,userid:cookies.get("userid") || ""})).then(res => {
                    this.picList = res.data.data.fangyuanzhaopian;
                    this.baseInfo = res.data.data.jibenxinxi;
                    this.mapArea = this.baseInfo.village;
                    this.agent_info = res.data.data.agent_lists[0];
                    this.getMap();
                    this.load.close();
                })
            },
            checked() {
                this.bigPic = document.querySelectorAll(".show-pic li");
                this.smallPic = document.querySelectorAll(".swiper-content");
            },
            getUsedHouseImgs() {
                this.$axios.get("/api.php?s=Product/used_pic",{id:this.$route.query.id,h_type:"used"}).then(res => {
                    this.houseImgs = res.data.data
                })
            },
            getMap() {
                this.loading();
                var map = new BMap.Map("container");          // 创建地图实例
                var point = new BMap.Point(111.749418, 40.848952);  // 创建点坐标
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(this.mapArea, function(point) {
                    if(point) {
                        map.centerAndZoom(point,15);
                        circleSearch(map,point)
                    }
                }, "呼和浩特市")
                let that = this;
                function circleSearch(map, mPoint, callback) {
                    var options = {
                        renderOptions: {
                            autoViewport: true,
                            panel:"results"
                        },
                        onSearchComplete: function(results) {
                            // 判断状态是否正确
                            if(local.getStatus() === BMAP_STATUS_SUCCESS) {
                                var s = [];
                                for(var i = 0; i < results.getCurrentNumPois(); i++) {
                                    s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                                    var pointB = results.getPoi(i).point
                                    var myIcon = new BMap.Icon("https://gss1.bdstatic.com/5eN1dDebRNRTm2_p8IuM_a/res/r/image/2015-09-16/5158508c9d04f5a0f4fe2d8de9da1dc0.png", new BMap.Size(46,38));
                                    var marker2 = new BMap.Marker(pointB,{icon:myIcon});  // 创建标注
                                    myIcon.imageSize = new BMap.Size(46,38)
                                    map.addOverlay(marker2);
                                    var sss = map.getDistance(mPoint, pointB).toFixed(2)
                                }
                            }
                        }
                    };
                    var circle = new BMap.Circle(mPoint, 1000, {
                        fillColor: "blue",
                        strokeWeight: 1,
                        fillOpacity: 0.3,
                        strokeOpacity: 0.3
                    });
                    map.addOverlay(circle);
                    var local = new BMap.LocalSearch(map, options);
                    local.searchNearby(that.mapIcon, mPoint,1000);
                }
                this.load.close();
            },
            showBigImg(event) {
                let img = document.querySelector(".show-big-img img");
                let showImg = document.querySelector(".show-big-img");
                img.src = event.target.src;
                showImg.style.display = "block";
            },
            closeBigImg() {
                let showImg = document.querySelector(".show-big-img");
                showImg.style.display = "none";
            },
            changeMap1() {
                this.isActive = 1;
                this.mapIcon = "公交站";
                this.getMap()
            },
            changeMap2() {
                this.isActive = 2;
                this.mapIcon = "商店";
                this.getMap()
            },
            changeMap3() {
                this.isActive = 3;
                this.mapIcon = "学校";
                this.getMap()
            },
            changeMap4() {
                this.isActive = 4;
                this.mapIcon = "医院";
                this.getMap()
            },
            care() {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollect",{type:1,user_id:cookies.get("userid"),house_id:this.$route.query.id}).then(res => {
                        this.getHouseDetail()
                    })
                }else {
                    this.$router.push("/login")
                }
            },
            overCare() {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollectCancel",{type:1,user_id:cookies.get("userid"),house_id:this.$route.query.id}).then(res => {
                        this.getHouseDetail()
                    })
                }
            },
            share() {
                this.isShow = true;
            },
            overShare() {
                this.isShow = false;
            },
            loading() {
                this.load = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }
        },
        created() {
            this.loading();
            this.getHouseDetail();
            this.getUsedHouseImgs();
        }
    }
</script>

<style scoped>
    .box {
        margin: 0 auto;
        width: 1100px;
    }
    .header-nav {
        margin-top:20px;
        font-size: 14px;
        color: #999;
    }
    .back-nav a{
        color: #999;
        font-size: 14px;
    }
    .back-nav span {
        font-size: 16px;
    }
    .share-care span{
        margin-left: 30px;
        cursor: pointer;
    }
    .share-care {
        float: right;
    }
    .care {
        color: #D2101B;
    }
    .share {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0,0,0,.3);
        text-align: center;
        z-index:99999999;
    }
    .share img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    h1 {
        margin: 40px 0;
        font-size: 30px;
        color: #333;
    }
    .show-pic {
        position: relative;
        width: 592px;
        height: 548px;
    }
    .show-pic ul {
        height: 442px;
    }
    .show-pic li {
        position: absolute;
        left: 0;
        top: 0;
    }
    .show-pic li img {
        width: 592px;
        height: 442px;
    }
    .swiper {
        margin-top: 10px;
    }
    .swiper span {
        width: 30px;
        height: 88px;
        border: 1px solid #5f1985;
        text-align: center;
        line-height: 90px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .swiper i {
        font-size: 30px;
        color: #5f1985;
    }
    .swiper span:hover {
        background: #5f1985;
    }
    .swiper span:hover i {
        color: #fff;
    }
    .swiper-content {
        margin-right:10px;
    }
    .swiper-content img {
        width: 120px;
        height: 90px;
    }
    .swiper-container {
        margin-left:10px;
        width: 510px;
        overflow: hidden;
    }
    .swiper-show {
        width: 2000px;
        height: 90px;
    }
    .right-info {
        position: relative;
        float: right;
        width: 478px;
        height: 548px;
    }
    .right-top-info {
        padding: 20px 0 35px;
        border-bottom: 1px solid #ccc;
    }
    .right-top-info h3 {
        margin-top: 10px;
        float: left;
        color: #c30d23;
        font-size: 20px;
    }
    .right-top-info h3 span {
        font-size: 40px;
    }
    .right-price {
        float: right;
    }
    .right-price p {
        font-size: 14px;
    }
    .right-second-info {
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    .second-item span {
        color: #000;
        font-size: 20px;
    }
    .second-item p {
        font-size: 14px;
        color: #999;
        text-align: center;
    }
    .right-third-info {
        padding: 50px 0 20px;
        border-bottom: 1px solid #ccc;
    }
    .right-third-info .third-left {
        margin-right: 150px;
    }
    .right-third-info p {
        margin-bottom: 10px;
        color: #999;
        font-size: 14px;
    }
    .right-third-info span {
        font-size: 14px ;
        color: #333;
    }
    .right-last-info {
        padding-top: 30px;
    }
    .last-left {
        margin-right: 20px;
    }
    .last-left img {
        width: 82px;
        height: 82px;
    }
    .last-middle a {
        font-size: 24px;
    }
    .last-middle p {
        margin: 20px 0;
        font-size: 14px;
        color: #333;
    }
    .last-phone {
        font-size: 20px;
        color: #c30d23;
        font-weight: 700;
    }
    .last-right  {
        float: right;
        font-size: 14px;
        color: #333;
    }
    .look-house {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .look-house a{
        display: block;
        width: 150px;
        height: 48px;
        color: #c30d23;
        font-size: 16px;
        text-align: center;
        line-height: 48px;
        border: 1px solid #c30d23;
        border-radius: 5px;
    }
    .look-house a:hover {
        color: #fff;
        background: #c30d23;
    }
    .detail-info {
        width: 480px;
    }
    .detail-right {
        float: right;
    }
    .detail-info p {
        margin-bottom: 15px;
        font-size: 14px;
        color: #999;
    }
    .detail-info span {
        color: #333;
    }
    .house-special p {
        margin-bottom: 20px;
        font-size: 14px;
        color: #999;
    }
    .house-special span {
        color: #333;
    }
    .house-special .label {
        display: inline-block;
        padding: 4px;
        margin-right: 10px;
        color: #fff;
        border-radius: 4px;
        background: #5f1985;
    }
    .house-img {
        position: relative;
        margin:0 20px 20px 0;
        width: 540px;
        height: 405px;
        cursor: pointer;
    }
    .house-img:nth-of-type(2) {
        margin-right:0;
    }
    .house-img:nth-of-type(4) {
        margin-right:0;
    }
    .house-img:nth-of-type(6) {
        margin-right:0;
    }
    .house-img img {
        width: 540px;
        height: 405px;
    }
    .house-img span {
        position: absolute;
        left: 0;
        top: 0;
        width: 70px;
        height: 40px;
        background: rgba(0,0,0,.3);
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
    }
    .show-big-img {
        display: none;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index:1000;
    }
    .show-big-img img {
        display: block;
        margin: 0 auto;
        height: 100%;
    }
    .show-big-img span {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 40px;
        color: #fff;
        cursor: pointer;
    }
    .map-arround {
        margin-bottom: 80px;
        padding: 10px;
        border: 1px solid #ccc;
    }
    .map-show {
        width: 578px;
        height: 400px;
    }
    .map-search {
        float: right;
    }
    .map-search ul {
        border-bottom: 2px solid #c30d23;
    }
    .map-search li {
        float: left;
        width: 120px;
        height: 43px;
        font-size: 18px;
        text-align: center;
        line-height: 43px;
        cursor: pointer;
    }
    .map-search li:hover {
        background: #c30d23;
        color: #fff;
    }
    .map-search ul .active {
        background: #c30d23;
        color: #fff;
    }
    .map-list p {
        margin: 20px 0;
        font-size: 14px;
        color: #999;
    }
    #results {
        width: 480px;
        height: 300px;
        overflow: auto;
    }
</style>

























