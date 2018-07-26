<template>
    <div class="container">
        <MyHeader></MyHeader>
        <div class="content">
            <div class="page-nav">
                <nuxt-link to="/">
                    福居网</nuxt-link>
                <i class="iconfont icon-right"></i>
                <span>{{navText[showCode]}}</span>
            </div>
            <div class="per-center clear">
                <div class="side-bar">
                    <div class="user-info">
                        <img src="~/assets/img/head-img.jpg" alt="">
                        <span>{{username}}</span>
                    </div>
                    <ul>
                        <li :class="{active:showCode==1}" @click="showCode=1">首页</li>
                        <li :class="{active:showCode==2}" @click="showCode=2">看房日程</li>
                        <li :class="{active:showCode==3}" @click="showCode=3">看房记录</li>
                        <li :class="{active:showCode==4}" @click="showCode=4">我的关注</li>
                        <li :class="{active:showCode==5}" @click="showCode=5">我的经纪人</li>
                        <li :class="{active:showCode==6}" @click="showCode=6">修改资料</li>
                    </ul>
                </div>
                <div class="show-container">
                    <div class="state" v-if="showCode==1">
                        <h2>您关注的房源/小区最新动态</h2>
                        <span>全部</span>
                        <span>调价</span>
                        <span>成交</span>
                    </div>
                    <div class="state" v-if="showCode==2">
                        <h2>看房日程</h2>
                    </div>
                    <div class="state" v-if="showCode==3">
                        <h2>看房记录</h2>
                    </div>
                    <div class="state" v-if="showCode==4">
                        <h2>您关注的房源或小区</h2>
                        <span :class="{active:careID==1}" @click="getUsedHouse">二手房</span>
                        <span :class="{active:careID==2}" @click="getRetalHouse">租房</span>
                        <span>新房</span>
                        <span>小区</span>
                    </div>
                    <div class="show-data" v-for="item in data" v-if="showCode==4&&careID==1">
                        <nuxt-link :to="'/detail_used?id='+item.id">
                            <img :src="'http://www.fooju.cn'+item.pic" alt="">
                        </nuxt-link>
                        <div class="data-dec fll">
                            <h3>
                                <nuxt-link :to="'/detail_used?id='+item.id">{{item.title}}</nuxt-link>
                            </h3>
                            <p>{{item.village}} <span>|</span> {{item.bedroom}}室{{item.livingroom}}厅{{item.wc}}卫 <span>|</span> {{item.direction}}</p>
                            <p>{{item.floor}}/{{item.total_floor}}层 <span>|</span> {{item.decoration}}</p>
                            <p>2018年建 <span>|</span> {{item.type}}</p>
                        </div>
                        <div class="data-price">
                            <h3><span>{{item.total_price}}</span>万</h3>
                            <p>单价 {{item.unit_price}}元/平米</p>
                            <div class="overCare" @click="overCare(item.id)">
                                取消关注
                            </div>
                        </div>
                    </div>
                    <div class="retal-house-list">
                        <RetalHouseList :options="retalData" @getData="getRetalHouse" v-if="careID==2"></RetalHouseList>
                    </div>
                    <div class="state" v-if="showCode==5">
                        <h2>我的经纪人</h2>
                    </div>
                    <div class="broker" v-if="showCode==5">
                        <div class="broker-list clear">
                            <div class="broker-item clear" v-for="item in brokerList">
                                <label class="fll">
                                    <input type="checkbox" name="address" style="display:none" :value="item.id" v-model="brokerID">
                                    <span class="iconfont icon-duihao3"></span>
                                </label>
                                <nuxt-link :to="'/broker_detail?id=' + item.id" class="broker-info fll clear">
                                    <img class="fll" :src="'http://www.fooju.cn' + item.face" alt="">
                                    <div class="flr">
                                        <span>{{item.name}}</span>
                                        <p>所属门店：{{item.store}}</p>
                                    </div>
                                </nuxt-link>
                                <div class="score-msg">
                                    <div class="score">综合评分 {{item.avg_score}}</div>
                                    <p>评论 {{item.count}}条</p>
                                </div>
                                <div class="phone flr">
                                    <div>18600200610</div>
                                    <p>联系方式</p>
                                </div>
                            </div>
                            <div class="checked-all">
                                <label class="fll" >
                                    <input type="checkbox" name="address" style="display:none" @change="handleChange">
                                    <span class="iconfont icon-duihao3"></span>
                                    全选
                                </label>
                                <span class="close" @click="overBroker">取消关注</span>
                            </div>
                        </div>
                        <p>暂无收藏的经纪人</p>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter></MyFooter>
    </div>
</template>

<script>
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import MyHeader from '~/components/Header.vue'
    import MyFooter from '~/components/Footer.vue'
    import RetalHouseList from '~/components/RetalHouseList.vue'
    import cookies from 'js-cookie'

    export default {
        name: "info",
        components: {
            MyHeader,
            MyFooter,
            RetalHouseList
        },
        data() {
            return {
                username:cookies.get('username'),
                userpic:cookies.get('userpic'),
                showCode:1,
                careID:1,
                data:[],
                navText:[
                    "",
                    "个人中心首页",
                    "看房日程",
                    "看房记录",
                    "我的关注",
                    "我的经纪人",
                    "修改资料"
                ],
                retalData:[],
                brokerID:[]
            }
        },
        methods: {
            getUsedHouse() {
                this.careID = 1;
                if(cookies.get("userid")) {
                    axios.get(api.paramToUrl(api.userCollect,{type:1,user_id:cookies.get("userid")})).then(res => {
                        if(res.data.code==101) {
                            this.data = []
                        }else {
                            let allData = [];
                            res.data.datas.forEach(item => {
                                item.house.forEach(val => {
                                    allData.push(val)
                                })
                            })
                            this.data = allData;
                        }
                    })
                }
            },
            getRetalHouse() {
                this.careID = 2;
                if(cookies.get("userid")) {
                    axios.get(api.paramToUrl(api.userCollect,{type:3,user_id:cookies.get("userid")})).then(res => {
                        if(res.data.code==101) {
                            this.data = []
                        }else{
                            let allData = [];
                            res.data.datas.forEach(item => {
                                item.house.forEach(val => {
                                    allData.push(val)
                                })
                            })
                            this.retalData = allData;
                        }
                    })
                }
            },
            overCare(house_id) {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollectCancel",{type:this.careID,user_id:cookies.get("userid"),house_id}).then(res => {
                        this.getUsedHouse()
                    })
                }
            },
            getBrokerList() {
                this.$axios.post("/api.php?s=Operation/userCollectAgent",{user_id:cookies.get('userid')}).then(res => {
                    if(res.data.code==101) {
                        this.brokerList = []
                    }else {
                        this.brokerList = res.data.datas;
                        this.brokerList.forEach(item => {
                            if(item.face == null) {
                                item.face = "/fjw/uploads/user/748_1531299629.png"
                            }
                        })
                    }
                })
            },
            handleChange(ev) {
               if(ev.target.checked) {
                   this.brokerID.splice(0)
                   this.brokerList.forEach(item => {
                       this.brokerID.push(item.id)
                   })
               }else {
                   this.brokerID.splice(0)
               }
            },
            overBroker() {
                this.brokerID.forEach(item => {
                    if(this.brokerID != []) {
                        this.$axios.post("/api.php?s=Operation/agentCollectCancel",{user_id:cookies.get('userid'),agent_id:item}).then(res => {

                        })
                    }
                })
                this.getBrokerList()
            }
        },
        mounted() {
            this.getUsedHouse();
            this.getBrokerList()
        }
    }
</script>

<style scoped>
    .content {
        margin: 0 auto;
        width: 1100px;
    }
    .page-nav{
        margin-top:10px;
        font-size: 14px;
    }
    .per-center {
        margin: 40px 0 80px;
    }
    .side-bar {
        float: left;
        width: 200px;
        height: 771px;
        border: 1px solid #ccc;
    }
    .user-info {
        margin: 40px 0;
        text-align: center;
    }
    .user-info img {
        width: 98px;
        height: 98px;
    }
    .user-info span {
        display: block;
        margin: 20px 0;
        color: #333;
        font-size: 16px;
    }
    .side-bar li {
        padding-left: 60px;
        line-height: 60px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
    }
    .side-bar ul .active {
        border-left: 4px solid #c30d23;
        background: #f4f4f4;
    }
    .show-container {
        float: right;
        padding: 30px;
        width: 880px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    .show-container h2 {
        color: #333;
        font-size: 30px;
    }
    .state {
        padding-bottom: 30px;
        border-bottom: 1px solid #ccc;
    }
    .state span{
        display: inline-block;
        margin: 30px 30px 0 0;
        font-size: 16px;
        cursor: pointer;
    }
    .state span:hover {
        color: #D2101B;
    }
    .state .active {
        color: #D2101B;
    }
    .show-data {
        margin: 40px 0;
        height: 214px;
    }
    .show-data img{
        float: left;
        width: 285px;
        height: 214px;
    }
    .data-dec {
        margin-left: 30px;
    }
    .data-dec h3 {
        margin-bottom: 30px;
        font-size: 20px;
        color: #333;
    }
    .data-dec p {
        margin-bottom: 18px;
        font-size: 14px;
    }
    .data-dec span {
        font-size: 16px;
    }
    .data-price {
        float: right;
    }
    .data-price h3 {
        margin-bottom:28px;
        color: #c30d23;
        font-size: 20px;
        text-align: right;
    }
    .data-price span {
        font-size: 40px;
    }
    .data-price p {
        margin-bottom:40px;
        text-align: right;
        font-size: 14px;
    }
    .overCare {
        float: right;
        width: 102px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        color: #666;
        cursor: pointer;
    }
    .broker {
        /*padding-top: 30px;*/
    }
    .broker p {
        font-size: 14px;
        text-align: center;
    }
    .retal-house-list {
        margin-top: 40px;
    }
    .broker-item {
        position: relative;
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
    }
    .broker-item p {
        margin-top: 30px;
        font-size: 16px;
        color: #333;
    }
    .broker-info {
        margin-left: 60px;
    }
    .broker-info img {
        margin-right: 30px;
        width: 80px;
        height: 80px;
    }
    .broker-info span {
        font-size: 20px;
        font-weight: 700;
        color: #333;
    }
    .score-msg {
        position: absolute;
        left: 50%;
    }
    .score-msg p {
        text-align: center;
    }
    .score {
        font-size: 20px;
        color: #c30d23;
    }
    .phone div{
        font-size: 20px;
        color: #000;
    }
    .phone p {
        text-align: right;
    }
    label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        color: #333;
    }
    label span {
        margin-right: 5px;
        color: #fff;
        font-size: 17px;
        border: 1px solid #999;
        border-radius: 4px;
        box-sizing: border-box;
    }
    input:checked + span {
        border: 1px solid #fff;
        color: #c30d23;
    }
    .checked-all {
        position: relative;
        padding: 30px 0;
    }
    .close {
        display: inline-block;
        margin-left: 80px;
        padding: 10px 15px;
        color: #000;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
    .close:hover {
        color: #fff;
        background: #D2101B;
    }
</style>









