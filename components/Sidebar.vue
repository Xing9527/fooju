<template>
    <div class="sidebar">
        <ul>
            <li>
                <i class="iconfont icon-richeng"></i>
                <p>日程</p>
                <div class="hint">
                    我的日程
                </div>
            </li>
            <li @click="goCare">
                <i class="iconfont icon-ban"></i>
                <p>关注</p>
                <div class="hint">
                    我的关注
                </div>
            </li>
            <li>
                <i class="iconfont icon-fangzi1"></i>
                <p>卖房</p>
                <div class="hint">
                    在线卖房
                </div>
            </li>
            <li>
                <i class="iconfont icon-gongju"></i>
                <p>工具</p>
                <div class="hint">
                    房贷计算器
                </div>
            </li>
            <li>
                <i class="iconfont icon-saoma"></i>
                <p>APP</p>
                <div class="app">
                    <img src="~/assets/img/app.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import cookies from "js-cookie"
    export default {
        methods:{
            goCare() {
                if(cookies.get("userid")) {
                    this.$router.push('/info')
                }else {
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped>
.sidebar{
    position: fixed;
    right: 0;
    top: 20px;
    width: 40px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    z-index: 998;
}
.sidebar i{
    font-size: 25px;
}
li{
    position: relative;
    padding: 5px 0;
    margin: 40px 0;
    height: 52px;
    box-sizing: border-box;
    cursor:pointer;
}
li:nth-of-type(1){
    margin-top:20px;
}
li:nth-of-type(5){
    margin-bottom:20px;
}
li:hover{
    background: #5f1985;
    color:#fff;
}
li:hover .hint {
    display: block;
}
li:nth-of-type(5) .app {
    display: none;
    position: absolute;
    right: 45px;
    top: -50%;
    width: 120px;
    height: 120px;
}
li:nth-of-type(5):hover .app{
    display: block;
}
.hint{
    display: none;
    position: absolute;
    right: 48px;
    top: 50%;
    width: 110px;
    height: 35px;
    line-height: 35px;
    color:#fff;
    border-radius: 5px;
    transform: translateY(-50%);
    background: #5f1985;
}
.hint::after{
    position:absolute;
    right: -6px;
    top:50%;
    content:"";
    width: 6px;
    height: 6px;
    border-bottom:6px solid #5f1985;
    border-right:6px solid #5f1985;
    transform:  translateY(-50%) rotateZ(-45deg);
}
</style>