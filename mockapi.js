//获取商品列表
Mock.mock(basepath + "/mall/product/categquery",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":{
        "list":[
            {id:1,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:2,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:3,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:4,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:5,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:6,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:7,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:8,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:9,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800},
            {id:10,name:"苹果 iPhone7 plus 128G 移动联通电信4G",pics:["http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30093-13-400_400.jpg"],price:668800,tag_price:718800}
        ],
        "total_amount":50
    }
});

//获取商品详情
Mock.mock(basepath + "/mall/product/get",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":{
        "id":1,
        "name":"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",
        "tag_price":718800,
        "pics":[
            "http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",
            "http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-4-400_400.jpg",
            "http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-17-400_400.jpg",
            "http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-18-400_400.jpg",
            "http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-6-400_400.jpg",
        ],
        "product_detail":[
            {"pic":"http://img.goodsbag.cn/i/19349_800_800.jpg@750h_750w_1e_1c_0l_100q"},
            {"pic":"http://img.goodsbag.cn/i/19349_800_800.jpg@750h_750w_1e_1c_0l_100q"},
            {"pic":"http://img.goodsbag.cn/i/19349_800_800.jpg@750h_750w_1e_1c_0l_100q"}
        ]
    }
});

//获取商品SKU
Mock.mock(basepath + "/mall/product/sku/list",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":[
        {id:1, price:668800,stock:31,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",sku_str:"金色"},
        {id:2, price:688800,stock:0,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",sku_str:"玫瑰金"},
        {id:2, price:598800,stock:10,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",sku_str:"红色"}
    ]
});

//购物车查询接口
Mock.mock(basepath + "/mall/cart/query",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":[
        {id:1,count:2,total_amount:10,discount:1000,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",name:"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",product_desc:"存储容量：32G",sku_str:"机身颜色：黑色",price:668800},
        {id:2,count:2,total_amount:0,discount:10,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",name:"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",product_desc:"存储容量：32G",sku_str:"机身颜色：黑色",price:668800},
        {id:3,count:2,total_amount:10,discount:100,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",name:"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",product_desc:"存储容量：32G",sku_str:"机身颜色：黑色",price:668800},
    ]
});
//购物车查询接口
Mock.mock(basepath + "/mall/cart/query2",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":[
        {id:2,count:2,total_amount:0,discount:10,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",name:"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",product_desc:"存储容量：32G",sku_str:"机身颜色：黑色",price:668800},
        {id:3,count:2,total_amount:10,discount:100,pic:"http://img.minshengec.com/product/pics/2016/9/19/387350/387350-1-30094-16-400_400.jpg",name:"苹果 iPhone7 plus 128G 移动联通电信4G 赠：10400毫安移动电源+手机套+钢化膜 [黑色]",product_desc:"存储容量：32G",sku_str:"机身颜色：黑色",price:668800},
    ]
});

//购物车删除某一件商品
Mock.mock(basepath + "/mall/cart/delete",'post',{
    "code": "SUCCESS",
    "message": null,
    "result":null
});