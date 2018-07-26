<template>
    <div class="container">
        <used-house-header></used-house-header>
        <UsedHouseSecond></UsedHouseSecond>
        <my-sidebar></my-sidebar>
        <div class="box2">
            <div class="page-nav">
                <nuxt-link to="/">
                    福居网</nuxt-link>
                <i class="iconfont icon-right"></i>
                <span>二手房</span>
            </div>
            <div class="search-button clear">
                <input class="fll" type="text" placeholder="搜索" v-model="keywords" @keyup="keyUp">
                <span class="fll"  @click="searchHouse">搜索</span>
            </div>
            <div class="checkbox-search">
                <div class="address clear">
                    <div class="address-title fll">
                        区域
                    </div>
                    <div class="checked-container fll">
                        <div class="address-search fll" v-for="item in r_id">
                            <label>
                                <input type="checkbox" name="address" :value="item" style="display: none" v-model="checkedData.r_id">
                                <span class="iconfont icon-duihao3"></span>
                                {{item.title}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="address clear">
                    <div class="address-title fll">
                        价格
                    </div>
                    <div class="address-search fll" v-for="item in total_price">
                        <label>
                            <input type="checkbox" name="price" :value="item" style="display: none" v-model="checkedData.total_price">
                            <span class="iconfont icon-duihao3"></span>
                            {{item.title}}
                        </label>
                    </div>
                </div>
                <div class="address clear">
                    <div class="address-title fll">
                        户型
                    </div>
                    <div class="address-search fll" v-for="item in bedroom">
                        <label>
                            <input type="checkbox" name="type" :value="item" style="display: none" v-model="checkedData.bedroom">
                            <span class="iconfont icon-duihao3"></span>
                            {{item.title}}
                        </label>
                    </div>
                </div>
                <div class="address clear">
                    <div class="address-title fll" style="height:28px;line-height: 28px">
                        筛选分类
                    </div>
                    <div class="checked-del fll">
                        <div class="address-search fll" v-for="item in selectedData" :key="item.value">
                            <div class="del-container clear">
                                <div class="del-title fll">
                                    {{item.title}}
                                </div>
                                <span class="iconfont icon-delete fll" @click="delSelect(item)"></span>
                            </div>
                        </div>
                        <div class="clear-all fll" @click="delAll">
                            <span class="iconfont icon-del"></span>
                            清除全部
                        </div>
                    </div>

                </div>
            </div>
            <div class="more-choose">
                更多选项
                <i class="iconfont icon-down"></i>
            </div>
            <div class="sort-choose clear">
                <label>
                    <input type="radio" style="display: none" name="sort" value="1" v-model="checkedData.order">
                    <div class="sort-item">最新</div>
                </label>
                <label>
                    <input type="radio" style="display: none" name="sort" value="2" v-model="checkedData.order">
                    <div class="sort-item">
                        房屋总价
                        <i class="iconfont icon-55"></i>
                    </div>
                </label>
                <label>
                    <input type="radio" style="display: none" name="sort" value="6" v-model="checkedData.order">
                    <div class="sort-item">
                        房屋单价
                        <i class="iconfont icon-55"></i>
                    </div>
                </label>
                <label>
                    <input type="radio" style="display: none" name="sort" value="4" v-model="checkedData.order">
                    <div class="sort-item">
                        房屋面积
                        <i class="iconfont icon-55"></i>
                    </div>
                </label>
            </div>
            <div class="address clear">
                <div class="address-title fll">
                    筛选
                </div>
                <div class="checked-container fll">
                    <div class="address-search fll" v-for="item in label" :key="item.value">
                        <label>
                            <input type="checkbox" name="address" :value="item" style="display: none" v-model="checkedData.label">
                            <span class="iconfont icon-duihao3"></span>
                            {{item.title}}
                        </label>
                    </div>
                </div>
            </div>
            <div class="all-used-house">
                <h2>共找到<span>{{count}}</span>个 呼和浩特 二手房源</h2>
            </div>
            <div class="show-data" v-for="item in usedHouse">
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
                    <p>{{item.guanzhu_num}}人关注 <span>|</span> 共{{item.daikan_num}}次带看 <span>|</span> {{item.add_time}}发布</p>
                </div>
                <div class="data-price">
                    <h3><span>{{item.total_price}}</span>万</h3>
                    <p>单价 {{item.unit_price}}元/平米</p>
                    <div class="care" @click="attention(item.id)" v-if="item.guanzhu == 0 || !item.guanzhu">
                        关注
                    </div>
                    <div class="overCare" v-else @click="overCare(item.id)">
                        已关注
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
        <my-footer></my-footer>
    </div>
</template>

<script>
    import UsedHouseHeader from "~/components/UsedHouse.vue"
    import UsedHouseSecond from "~/components/UsedHouseSecond"
    import MySidebar from '~/components/Sidebar.vue'
    import MyFooter from '~/components/Footer.vue'
    import axios from "~/plugins/axios"
    import api from "~/mainApi/index"
    import elementUI from "~/plugins/elementUI"
    import timeTrans from "~/js/getDate"
    import cookies from "js-cookie"

    export default {
        name: "used_house_list",
        components: {
            UsedHouseHeader,
            MySidebar,
            MyFooter,
            UsedHouseSecond
        },
        data() {
            return {
                checkedData: {
                    r_id:[],
                    total_price:[],
                    bedroom:[],
                    label:[],
                    order:1
                },
                r_id:[
                    {
                        title:"不限 ",
                        value:0
                    },
                    {
                        title:"金桥开发区",
                        value:7
                    },
                    {
                        title:"如意开发区",
                        value:5
                    },
                    {
                        title:"玉泉区",
                        value:4
                    },
                    {
                        title:"回民区",
                        value:3
                    },
                    {
                        title:"赛罕区",
                        value:2
                    },
                    {
                        title:"新城区",
                        value:1
                    },
                ],
                total_price:[
                    {
                        title:"不限",
                        value:"0-999999"
                    },
                    {
                        title:"30万以下",
                        value:"0-30"
                    },
                    {
                        title:"30-40万",
                        value:"30-40"
                    },
                    {
                        title:"40-50万",
                        value:"40-50"
                    },
                    {
                        title:"50万以上",
                        value:"50-9999999"
                    },
                ],
                bedroom:[
                    {
                        title:"一室",
                        value:1
                    },
                    {
                        title:"两室",
                        value:2
                    },
                    {
                        title:"三室",
                        value:3
                    },
                    {
                        title:"四室",
                        value:4
                    },
                    {
                        title:"五室",
                        value:5
                    },
                ],
                label:[
                    {
                        title:"两年内" ,
                        value :"两年内"
                    },
                    {
                        title:"满两年",
                        value :"满两年"
                    },
                    {
                        title:"满五年" ,
                        value :"满五年"
                    },
                    {
                        title:"随时看房" ,
                        value :"随时看房"
                    }
                ],
                params:{
                    r_id:"",
                    page_num:1,
                    page_size:10,
                    order:1,
                    userid:cookies.get("userid")
                },
                usedHouse:[],
                count:0,
                load:null,
                keywords:""
            }
        },
        methods: {
            searchHouse() {
                this.$router.push({path:"/used_house_list",query:{q:this.keywords}})
                this.$router.go(0)
            },
            keyUp(key) {
                if(key.keyCode == 13) {
                    this.searchHouse()
                }
            },
            loading() {
                this.load = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            delSelect(item) {
                let index = this.checkedData[item._parentName].findIndex(val => {
                    if(val.value == item.value) {
                        return true
                    }
                })
                this.checkedData[item._parentName].splice(index,1);
                this.getData()
            },
            delAll() {
                for(let key in this.checkedData) {
                    if(this.checkedData[key] instanceof Array) {
                        this.checkedData[key].splice(0)
                    }
                }
                this.getData()
            },
            getData() {
                this.loading();
                let checkedData = this.checkedData;
                let params = this.params;
                for(let key in checkedData) {
                    if(checkedData[key] instanceof Array && checkedData[key].length > 0) {
                        params[key] = checkedData[key].map(item => item.value)
                    }
                }
                params.userid = cookies.get("userid") || "";
                params.order = this.checkedData.order;
                if(this.$route.query.q) {
                    this.params.title = this.$route.query.q;
                }
                axios.get(api.paramToUrl(api.used_lists,params)).then(res => {
                    res.data.data.forEach(item => {
                        item.add_time = timeTrans.transTime(item.add_time)
                    })
                    this.count = res.data.count;
                    this.usedHouse = res.data.data;
                    this.load.close()
                })
            },
            pageChange(pn) {
                this.params.page_num = pn;
                this.getData()
            },
            attention(house_id) {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollect",{type:1,user_id:cookies.get("userid"),house_id}).then(res => {
                        this.getData()
                    })
                }else {
                    this.$router.push("/login")
                }
            },
            overCare(house_id) {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollectCancel",{type:1,user_id:cookies.get("userid"),house_id}).then(res => {
                        this.getData()
                    })
                }
            }
        },
        computed: {
            selectedData() {
                let allData = [];
                for(let key in this.checkedData) {
                    if(this.checkedData[key] instanceof Array) {
                        this.checkedData[key].forEach(item => {
                            item._parentName = key;
                            allData.push(item)
                        })
                    }
                }
                return allData
            }
        },
        mounted(){
            this.loading();
            this.getData()
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

    .box2{
        margin: 0 auto;
        width: 1100px;
    }
    .page-nav{
        margin-top:10px;
        font-size: 14px;
    }
    .search-button {
        margin: 40px 0;
    }
    .search-button input {
        padding-left: 20px;
        background: #f4f4f4;
        font-size: 14px;
        width: 740px;
        height: 60px;
        color: #666666;
        border: none;
        box-sizing: border-box;
    }
    .search-button span {
        width: 160px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        color: #fff;
        background: #c30d23;
        cursor: pointer;
    }
    .address {
        font-size: 14px;
        line-height: 40px;
    }
    .address label {
        margin-right: 25px;
        cursor: pointer;
    }
    .address label span {
        margin-right: 5px;
        color: #fff;
        font-size: 17px;
        border: 1px solid #999;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .address input:checked + span {
        border: 1px solid #fff;
        color: #c30d23;
    }
    .address-title{
        width: 65px;
        margin-right: 35px;
        color: #333;
    }
    .checked-container {
        width: 530px;
    }
    .del-container {
        margin:0 20px 20px 0;
        border: 1px solid #bbb;
        cursor: pointer;
    }
    .del-title {
        width: 80px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        color: #c30d23;
    }
    .icon-delete{
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        font-weight: 700;
        background: #bbb;
        color: #fff;
        text-align: center;
    }
    .clear-all {
        width: 85px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
    }
    .clear-all:hover {
        color: #c30d23;
    }
    .clear-all span {
        font-size: 18px;
        height: 28px;
        line-height: 28px;
    }
    .checked-del{
        width: 530px;
    }
    .more-choose {
        padding: 30px 0;
        text-align: center;
        font-size: 16px;
        color: #999;
        cursor: pointer;
        border-bottom: 1px solid #999;
    }
    .icon-down {
        font-size: 16px;
    }
    .sort-choose label{
        float: left;
        margin: 40px 24px 15px 0;
        font-size: 18px;
        color: #c30d23;
        border: 1px solid #c30d23;
        border-radius: 18px;
        cursor: pointer;
    }
    .sort-item {
        padding: 8px 15px;
    }
    .sort-choose i {
        font-weight: 700;
    }
    .sort-choose input:checked + .sort-item {
        background: #c30d23;
        color: #fff;
        border-radius: 14px;
    }
    .all-used-house {
        margin: 40px 0;
    }
    .all-used-house h2{
        font-size: 30px;
        color: #333;
    }
    .all-used-house h2 span {
        color: #c30d23;
    }
    .show-data {
        margin-bottom: 40px;
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
    .care {
        float: right;
        width: 102px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border: 1px solid #c30d23;
        border-radius: 5px;
        font-size: 16px;
        color: #c30d23;
        cursor: pointer;
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
    .fenye {
        margin-bottom: 30px;
        text-align: center;
    }
</style>

<style>
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #c30d23;
    }
</style>




























