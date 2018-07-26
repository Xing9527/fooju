<template>
    <div class="container">
        <div class="show-data" v-for="item in currentOptions">
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
                <div class="care" @click="attention(item.id)" v-if="item.guanzhu == 0">
                    关注
                </div>
                <div class="overCare" v-if="item.guanzhu  != 0" @click="overCare(item.id)">
                    已关注
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cookies from "js-cookie"
    export default {
        name: "used-house-list",
        props:{
            options:{
                type:Array
            }
        },
        data() {
            return {
                currentOptions:this.options,
            }
        },
        methods: {
            attention(house_id) {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollect",{type:1,user_id:cookies.get("userid"),house_id}).then(res => {
                        this.$emit("getData")
                    })
                }
            },
            overCare(house_id) {
                if(cookies.get("userid")) {
                    this.$axios.post("/api.php?s=Operation/houseCollectCancel",{type:1,user_id:cookies.get("userid"),house_id}).then(res => {
                        this.$emit("getData")
                    })
                }
            }
        },
        watch: {
            options(val) {
                this.currentOptions = val;
            }
        }
    }
</script>

<style scoped>
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
</style>