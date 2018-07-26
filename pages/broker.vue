<template>
    <div class="container">
        <MyHeader></MyHeader>
        <div class="box">
            <div class="page-nav">
                <nuxt-link to="/">
                    福居网
                </nuxt-link>
                <i class="iconfont icon-right"></i>
                <span>经纪人</span>
            </div>
            <div class="search">
                <div class="search-content clear">
                    <input type="text" v-model="name" @keyup="search" class="fll" placeholder="搜索">
                    <span class="search-button fll" @click="getNameData">
                        搜索
                    </span>
                    <span class="search-map">
                        <img src="~/assets/img/mapSearch.png" alt="">
                        地图找房
                    </span>
                </div>
            </div>
            <div class="search-checkbox">
                <div class="sort clear">
                    <span class="sort-title">区域</span>
                    <div class="sort-checked fll">
                        <my-checkbox class="fll" :options="all" v-model="checkedData.r_id" ></my-checkbox>
                        <my-checkbox :options="r_id" v-model="checkedData.r_id"></my-checkbox>
                    </div>
                </div>
                <div class="sort clear">
                    <span class="sort-title">筛选</span>
                    <div class="sort-checked fll">
                        <MyRadio class="fll" :options="defa" v-model="checkedData.order"></MyRadio>
                        <MyRadio :options="order" v-model="checkedData.order"></MyRadio>
                    </div>
                </div>
            </div>
            <div class="broker-list">
                <h2>共找到 <span>{{count}}</span> 名经纪人</h2>
                <div class="broker-item clear" v-for="item in brokerList">
                    <nuxt-link :to="'/broker_detail?id=' + item.id" class="broker-info fll clear">
                        <img class="fll" :src="'http://www.fooju.cn' + item.face" alt="">
                        <div class="flr">
                            <span>{{item.agent_name}}</span>
                            <p>所属门店：{{item.store_name}}</p>
                        </div>
                    </nuxt-link>
                    <div class="score-msg">
                        <div class="score">综合评分 {{item.avg_score}}</div>
                        <p>评论 {{item.comment_count}}条</p>
                    </div>
                    <div class="phone flr">
                        <div>{{item.f_phone}} 转 {{item.phone}}</div>
                        <p>联系方式</p>
                    </div>
                </div>
            </div>
            <div class="fenye">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="count"
                        @current-change="pageChange">
                </el-pagination>
            </div>
        </div>
        <MyFooter></MyFooter>
    </div>
</template>

<script>
    import MyHeader from "~/components/Header"
    import MyFooter from "~/components/Footer"
    import MyCheckbox from "~/components/myCheckbox"
    import MyRadio from "~/components/myRadio"
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import elementUI from "~/plugins/elementUI"

    export default {
        name: "broker_list",
        components: {
            MyCheckbox,
            MyHeader,
            MyRadio,
            MyFooter
        },
        data() {
            return {
                checkedData: {
                    r_id: [],
                    order:0
                },
                name:"",
                r_id: [
                    {
                        title: "金桥开发区",
                        value: 7
                    },
                    {
                        title: "如意开发区",
                        value: 5
                    },
                    {
                        title: "玉泉区",
                        value: 4
                    },
                    {
                        title: "回民区",
                        value: 3
                    },
                    {
                        title: "赛罕区",
                        value: 2
                    },
                    {
                        title: "新城区",
                        value: 1
                    },
                ],
                order:[
                    {
                        title:"综合评分由高到低" ,
                        value:1
                    },
                    {
                        title:"成交量由高到低" ,
                        value:2
                    },
                    {
                        title:"带看量由高到低" ,
                        value:3
                    },
                ],
                all:[
                    {
                        title:"不限",
                        value:0
                    }
                ],
                defa:[
                    {
                        title:"默认",
                        value:0
                    }
                ],
                count:0,
                brokerList:[],
                params:{
                    page_num:1,
                    page_size:10,
                    order:0,
                    r_id:""
                }
            }
        },
        methods:{
            getData() {
                this.loading();
                let checkedData = this.checkedData;
                let params = this.params;
                for(let key in checkedData) {
                    if(checkedData[key] instanceof Array && checkedData[key].length > 0) {
                        params[key] = checkedData[key].map(item => item.value)
                    }
                }
                params.order = this.checkedData.order;
                axios.get(api.paramToUrl(api.Agentlists,this.params)).then(res => {
                    if(res.data.code == 101) {
                        this.count = 0;
                    }else {
                        this.count = parseInt(res.data.count);
                    }
                    this.brokerList = res.data.data;
                    this.brokerList.forEach(item => {
                        if(item.face == null) {
                            item.face = "/fjw/uploads/user/748_1531299629.png"
                        }
                    })
                    this.load.close();
                })
            },
            getNameData() {
                this.loading();
                axios.get(api.paramToUrl(api.Agentlists,{page_num:1,page_size:10,name:this.name})).then(res => {
                    if(res.data.code == 101) {
                        this.count = 0;
                    }else {
                        this.count = parseInt(res.data.count);
                    }
                    this.brokerList = res.data.data;
                    this.brokerList.forEach(item => {
                        if(item.face == null) {
                            item.face = "/fjw/uploads/user/748_1531299629.png"
                        }
                    })
                    this.load.close();
                })
            },
            pageChange(pn) {
                this.params.page_num = pn;
                this.getData()
            },
            search(ev) {
                if(ev.keyCode == 13) {
                    this.getNameData()
                }
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
        computed: {
            selectedData() {
                let allData = [];
                for(let key in this.checkedData) {
                    if(this.checkedData[key] instanceof Array) {
                        this.checkedData[key].forEach(item => {
                            allData.push(item)
                        })
                    }
                }
                return this.checkedData
            }
        },
        created(){
            this.loading();
            this.getData();
        },
        watch: {
            selectedData(val) {
                this.getData()
            },
            deep:true
        }
    }
</script>

<style scoped>
    .box {
        margin: 0 auto;
        width: 1100px;
    }
    .page-nav {
        margin-top: 10px;
        font-size: 14px;
    }
    .search-content {
        margin: 40px 0;
    }
    .search-content input {
        padding: 0 15px;
        background: #f4f4f4;
        width: 540px;
        height: 60px;
        font-size: 16px;
        color: #999;
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
        color: #fff;
    }
    .search-map {
        margin-left: 20px;
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
        color: #fff;
    }
    .search-map img {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }
    .search-checkbox {
        border-bottom: 1px solid #ccc;
    }
    .sort {
        position: relative;
        width: 630px;
    }
    .sort-title {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 14px;
        color: #333;
    }
    .sort-checked {
        margin-left: 90px;
        width: 500px;
    }
    .broker-list {
        margin-top:80px;
    }
    .broker-list h2 {
        color: #333;
        font-size: 30px;
    }
    .broker-list h2 span {
        color: #c30d23;
    }
    .broker-item {
        position: relative;
        padding: 50px 0 30px;
        border-bottom: 1px solid #ccc;
    }
    .broker-item p {
        margin-top: 20px;
        font-size: 16px;
        color: #333;
    }
    .broker-info img {
        margin-right: 20px;
        width: 100px;
        height: 100px;
    }
    .broker-info span {
        font-size: 16px;
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
    .fenye {
        margin: 30px 0;
        text-align: center;
    }
</style>
<style>
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #c30d23;
    }
</style>























