
var api = {
    login:"api.php?s=Login/login",/*登录*/
    register:"api.php?s=Login/register",/*注册*/
    used_lists:"api.php?s=Product/used_lists",/*二手房列表*/
    retal_lists:"api.php?s=Product/retal_lists",/*租房房列表*/
    used_detail:"api.php?s=Product/used_detail",/*二手房详情*/
    adLists:"api.php?s=Advertisement/lists",/*广告列表*/
    adDetail:"api.php?s=Advertisement/detail",/*广告详情*/
    bottomLists:"api.php?s=Bottom/lists",/*底部网站管理列表*/
    bottomDetail:"api.php?s=Bottom/detail",/*底部网站管理详情*/
    regionLists:"api.php?s=Basics/region_lists",/*区域*/
    region_detail:"api.php?s=Basics/region_detail",/*区域详情*/
    Agentlists:"api.php?s=Agent/lists",/*经济人列表*/
    Agentdetail:"api.php?s=Agent/detail",/*经济人详情*/
    Userlists:"api.php?s=User/lists",/*会员列表*/
    Userdetail:"api.php?s=User/detail",/*会员详情*/
    Storelists:"api.php?s=Store/lists",/*门店列表*/
    Storedetail:"api.php?s=Store/detail",/*门店详情*/
    encyTop:"api.php?s=Ency/encyTop",/*门店详情*/
    linkData: "api.php?s=Ency/encyPcIndex", /*大链接标题*/
    indexLeaderboard:"api.php?s=Advertisement/indexLeaderboard",/*pc通栏广告*/
    usedDropdown:"api.php?s=Basics/drop_down_pc",/*二手房筛选条件*/
    agentCollect:"api.php?s=Operation/agentCollect",/*经济人收藏*/
    agentCollectCancel:"api.php?s=Operation/agentCollectCancel",/*取消经济人收藏*/
    userCollectAgent:"api.php?s=Operation/userCollectAgent",/*我的经济人*/
    agentLists:"api.php?s=Agent/lists",/*经纪人列表*/
    new_lists:"api.php?s=Product/new_lists",/*新房列表*/
    village_lists:"api.php?s=Village/lists",/*小区列表*/
    village_school:"api.php?s=Village/school",/*小区列表*/
    VillageDetail:"api.php?s=Village/detail",/*小区详情*/
    ProductRetal_detail:"api.php?s=Product/retal_detail",/*租房详情*/
    ProductNew_detail:"api.php?s=Product/new_detail",/*新房详情*/
    EncyEncyType:"api.php?s=Ency/encyType",/*百科分类*/
    EncyEncyList:"api.php?s=Ency/encyList",/*百科分类列表*/
    EncyEncyDetail:"api.php?s=Ency/encyDetail",/*百科详情*/
    EncyEncyTypeList:"api.php?s=Ency/encyTypeList",/*百科全部分类*/
    CalculatorNewHouseTax:"api.php?s=Calculator/newHouseTax",/*新房税率计算*/
    CalculatorUsedHouseTax:"api.php?s=Calculator/usedHouseTax",/*二手房税率计算*/
    CalculatorIndex:"api.php?s=Calculator/index",/*房贷计算*/
    OperationUser:"api.php?s=Operation/user",/*帮我找房*/
    OperationOwner:"api.php?s=Operation/owner",/*我是业主*/
    OperationAssess:"api.php?s=Operation/assess",/*房屋估价*/
    villageCollectList:"api.php?s=Operation/villageCollectList",/*小区收藏列表*/
    collectVillage:"api.php?s=Operation/villageCollect",/*收藏/取消小区收藏*/
    manyCollectCancel:"api.php?s=Operation/manyCollectCancel",/*收藏/取消小区收藏*/
    manyVillageCollectCancel:"api.php?s=Operation/manyVillageCollectCancel",/*批量取消小区收藏列表*/
    houseCollectCancel:"api.php?s=Operation/houseCollectCancel",/*取消房源关注*/
    houseCollect:"api.php?s=Operation/houseCollect",/*添加关注*/
    userCollect:"api.php?s=Operation/userCollect",/*我的关注*/
    mapHouseList:"api.php?s=Map/mapHouseList",/*地图找房*/
    mapHouseVillage:"api.php?s=Map/mapHouseVillage",/*地图找房,小区列表*/
    barrageAd:"api.php?s=Advertisement/barrageAd",/*弹幕广告*/
    rentLabelShaixuan:"api.php?s=Basics/label",/*租房筛选标签*/
    updateInfo:"api.php?s=Login/update",/*租房筛选标签*/
    t_login:"Login/t_login",/*三方登陆*/
    getUrl:"api.php?s=Msg/getUrl",/*三方登陆*/
    recommend:"api.php?s=Product/recommend/plat/2",/*推荐*/
    recommendNew:"api.php?s=Product/recommend_pc",/*推荐*/
    regionListCopy:"api.php?s=Basics/regionListCopy",/*推荐*/
    productRecommend: "api.php?s=Product/recommend",  /*推荐合并*/

    // http://114.215.83.139/fjw/api.php?api.php?s=Village/school/h_type/new
    paramToUrl:function(a,b){
        var str="";
        for (var o in b){
            if(b[o] instanceof Array){
                str+="/"+o+"/"+b[o].join();
            }else{
                str+="/"+o+"/"+b[o];
            }
        }
        return a+str
    },
    to:function (href) {
        if(href != ""){
            window.open(href);
        }
        // window.location.href=href
    }
};

export default api;