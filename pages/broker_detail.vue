<template>
    <div>
        <MyHeader></MyHeader>
        <MySidebar></MySidebar>
        <div class="container">
            <div class="page-nav">
                <nuxt-link to="/">
                    福居网
                </nuxt-link>
                <i class="iconfont icon-right"></i>
                <span>经纪人详情</span>
                <span class="flr care" v-if="isCare == 0" @click="care"><i class="iconfont icon-ban"></i>收藏此经纪人</span>
                <span class="flr overCare" v-else @click="overCare"><i class="iconfont icon-ban"></i>已收藏</span>
            </div>
            <div class="broker-info clear"  v-for="item in brokerData">
                <img :src="'http://www.fooju.cn' + item.face" alt="">
                <div class="content flr">
                    <div class="name-score clear">
                        <h2>{{item.name}} <span>（经纪人）</span></h2>
                        <div class="flr">综合评分 {{item.avg_score}}</div>
                    </div>
                    <div class="job-info clear">
                        <div class="job-left fll">
                            <p>所属门店：<span class="store">{{item.store_name}} <i class="iconfont icon-map"></i></span></p>
                            <p>联系电话：<span>{{item.f_phone}} 转 {{item.phone}}</span></p>
                        </div>
                        <div class="job-middle">
                            <p>历史成交套数：<span>{{item.chengjiao_count}}套</span></p>
                            <p>平均成交周期：<span>{{item.avg_chengjiao}}天</span></p>
                        </div>
                        <div class="job-right flr">
                            <p>入职年数：<span>{{item.congye_time}}年</span></p>
                            <p>近30天带看次数：<span>{{item.nearly_daikan}}次</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="broker-house">
                <h2>经纪人房源</h2>
                <div class="broker-house-nav">
                    <span :class="{active:state == '二手房'}" @click="brokerUsedHouse">二手房</span>
                    <span :class="{active:state == '租房'}" @click="brokerRetalHouse">租房</span>
                </div>
            </div>
            <UsedHouseList v-if="state == '二手房'" @getData="brokerUsedHouse" class="used-house-list" :options="usedHouse"></UsedHouseList>
            <div v-if="state == '二手房'">
                <paging :count="usedCount" @getPn="getUsedPn"></paging>
            </div>
            <RetalHouseList v-if="state == '租房'" @getData="brokerRetalHouse" class="used-house-list" :options="retalHouse"></RetalHouseList>
            <div v-if="state == '租房'">
                <paging :count="retalCount" @getPn="getRetalPn"></paging>
            </div>
        </div>
        <MyFooter></MyFooter>
    </div>
</template>

<script>
    import MySidebar from '~/components/Sidebar.vue'
    import MyFooter from '~/components/Footer.vue'
    import MyHeader from "~/components/Header"
    import UsedHouseList from "~/components/UsedHouseList"
    import RetalHouseList from "~/components/RetalHouseList"
    import paging from "~/components/paging"
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import cookies from "js-cookie"
    import timeTrans from "~/js/getDate"


    export default {
        name: "broker_detail",
        components: {
            MyFooter,
            MyHeader,
            MySidebar,
            UsedHouseList,
            paging,
            RetalHouseList
        },
        data() {
            return {
                isCare:0,
                brokerData:[],
                state:"二手房",
                pn_used:1,
                pn_retal:1,
                usedHouse:[],
                usedCount:50,
                retalHouse:[],
                retalCount:50
            }
        },
        methods: {
            getData() {
                axios.get(api.paramToUrl(api.Agentdetail,{id:this.$route.query.id,userid:cookies.get("userid") || ""})).then(res => {
                    this.brokerData = res.data.data.data;
                    this.isCare = this.brokerData[0].guanzhu;
                    this.brokerData.forEach(item => {
                        if(item.face == null) {
                            item.face = "/fjw/uploads/user/748_1531299629.png"
                        }
                    })
                    this.load.close()
                })
            },
            care() {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/agentCollect",{user_id:cookies.get("userid"),agent_id:this.$route.query.id}).then(res => {
                        this.getData()
                    })
                }else {
                    this.$router.push("/logIn")
                }
            },
            overCare() {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/agentCollectCancel",{user_id:cookies.get("userid"),agent_id:this.$route.query.id}).then(res => {
                        this.getData()
                    })
                }
            },
            brokerUsedHouse() {
                this.loading();
                this.state = "二手房";
                this.$axios.get("/api.php?s=Product/used_lists",{page_num:this.pn_used,page_size:10,agent_id:this.$route.query.id,userid:cookies.get("userid") || ""}).then(res => {
                    res.data.data.forEach(item => {
                        item.add_time = timeTrans.transTime(item.add_time);
                        item.title = item.title.slice(0,30)
                    })
                    this.usedHouse = res.data.data;
                    this.usedCount = res.data.count;
                    this.load.close();
                })
            },
            brokerRetalHouse() {
                this.loading();
                this.state = "租房";
                this.$axios.get("/api.php?s=Product/retal_lists",{page_num:this.pn_retal,page_size:10,agent_id:this.$route.query.id,userid:cookies.get("userid") || ""}).then(res => {
                    res.data.data.forEach(item => {
                        item.add_time = timeTrans.transTime(item.add_time);
                        item.title = item.title.slice(0,30)
                    })
                    this.retalHouse = res.data.data;
                    this.retalCount = res.data.count;
                    this.load.close();
                })
            },
            getUsedPn(pn) {
                this.pn_used = pn;
                this.brokerUsedHouse()
            },
            getRetalPn(pn) {
                this.pn_retal = pn;
                this.brokerRetalHouse()
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
        mounted() {
            this.loading();
            this.getData();
            this.brokerUsedHouse();
        }
    }
</script>

<style scoped>
    .container {
        margin: 0 auto;
        width: 1100px;
    }
    .page-nav {
        margin-top: 10px;
        font-size: 14px;
    }
    .icon-ban {
        font-size: 14px;
        margin-right: 6px;
    }
    .care {
        cursor: pointer;
    }
    .overCare {
        color: #D2101B;
        cursor: pointer;
    }
    .broker-info {
        margin: 80px 0;
    }
    .broker-info img {
        float: left;
        width: 272px;
        height: 336px;
    }
    .content {
        width: 808px;
    }
    .name-score {
        padding: 10px 0 30px;
        border-bottom: 1px solid #ccc;
    }
    .name-score h2 {
        float: left;
        font-size: 40px;
        color: #333;
    }
    .name-score h2 span {
        font-size: 14px;
        color: #5f1985;
    }
    .name-score div {
        font-size: 24px;
        color: #c30d23;
        margin-top: 10px;
    }
    .job-info {
        position: relative;
        font-size: 20px;
        color: #999;
        padding-bottom: 90px;
        border-bottom: 1px solid #ccc;
    }
    .job-info p {
        margin-top:50px;
    }
    .job-info p span {
        color: #333;
    }
    .job-info p .store {
        color: #c30d23;
    }
    .store i {
        font-size: 18px;
    }
    .job-middle {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .job-right {
        text-align: right;
    }
    .broker-house {
        border-bottom: 1px solid #ccc;
    }
    .broker-house h2 {
        font-size: 30px;
        color: #333;
    }
    .broker-house-nav {
        margin: 30px 0 20px;
    }
    .broker-house-nav span {
        display: inline-block;
        margin-right: 20px;
        padding: 15px 20px;
        color: #333;
        font-size: 20px;
        cursor: pointer;
    }
    .broker-house-nav .active {
        color: #D2101B;
        border: 1px solid #D2101B;
        border-radius: 25px;
    }
    .used-house-list {
        margin: 40px 0;
    }
    .fenye {
        margin-bottom: 40px;
        text-align: right;
    }
</style>

<style>
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #c30d23;
    }
</style>