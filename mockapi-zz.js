//login
Mock.mock(basepath + "/seller/order/refund/query", 'post', {
    code: "SUCCESS",
    result: {
        list: {
            refund_id: '11',
            order_id: 'ORDER201705220000003',
            pay_amount: '1',// '最终支付的金额',
            status: 'DCL', //'DCL-待处理|TKTY-退款同意|TKQR-退款确认|TKWC-退款完成|TKGB-退款关闭',
            create_time: '2017-05-22 13:47:52',
            refund_type: '0',// '0仅退款|1退货退款',
            user_phone: '15840900664',// '买家电话',
            logistic_fee: '0',
            xvporderitems: [{
                id: '36',
                product_name: 'Apple iPhone 7 (A1660) 256G 移动联通电信4G手机',
                price: '698800',
                tag_price: '618800',
                sku_str: '金色',
                item_count: '1',// '购买数量',
                pic: "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
            }]
        },
        total_amount: 30,
    }
});

Mock.mock(basepath + "/seller/order/refund/get", "post", {
    code: "SUCCESS",
    result: {
        id: "123", //'退款单号',
        order_id: "ORDER201705220000003",//订单号,
        user_name: "张三",//买家姓名,
        user_phone: "15840900664",// 联系方式,
        amount: "1000",//退款金额,
        apply_reason: "没钱了",//退款原因,
        refund_type: "1",// 0仅退款 | 1退货退款,
        status: "TKTY",// DCL - 待处理 | TKTY - 退款同意 | TKQR - 退款确认 | TKWC - 退款完成 | TKGB - 退款关闭,
        create_time: '2017-05-22 13:47:52',//申请时间,
        records: [{
            detail: "发起退款申请，退款原因：不想买了",
            create_time: "2017-03-27 11:46:31",
            operator: "客户"
        }]
    }
})
Mock.mock(basepath + "/seller/order/refund/reject", "post", {
    code: "SUCCESS",
    result: {}
})
Mock.mock(basepath + "/seller/seller/login/check", "post", {"code": "SUCCESS", "result": {"flag": "yes"}})
Mock.mock(basepath + "/seller/order/query", "post", {
    "code": "SUCCESS",
    "result": {
        "list": [{
            "order_id": "ORDER201705270000020",
            "pay_amount": "77644366800",
            "order_status": "DFK",
            "create_time": "2017-05-27 11:20:57",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "0",
            "address_name": "我先维护一个收货地址",
            "address_phone": "18911112222",
            "xvporderitems": [{
                "id": "198",
                "product_id": "8",
                "product_name": "Apple iPhone 7 (A1660) 256G 红色特别版 移动联通电信4G手机",
                "price": "698800",
                "tag_price": "698800",
                "item_count": "111111",
                "sku_str": "红色",
                "sku_id": "75",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/99a33606-e955-4eaa-87c6-a7ef31fc3a31.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/a9d31e28-56f3-4fda-881e-9ef115adac65.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/10e6e37f-cd25-4508-a903-e1bd8413278c.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/4afbd642-3527-4684-8255-eedf9c62b828.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/afa21610-a924-4d75-8762-37574bb1a61a.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/99a33606-e955-4eaa-87c6-a7ef31fc3a31.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/a9d31e28-56f3-4fda-881e-9ef115adac65.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/10e6e37f-cd25-4508-a903-e1bd8413278c.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/4afbd642-3527-4684-8255-eedf9c62b828.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/afa21610-a924-4d75-8762-37574bb1a61a.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000019",
            "pay_amount": "103",
            "order_status": "YGB",
            "create_time": "2017-05-27 11:17:16",
            "refund_status": "退款成功",
            "refund_create_time": "1495855618000",
            "logistic_fee": "2",
            "address_name": "孙",
            "address_phone": "18210171793",
            "xvporderitems": [{
                "id": "196",
                "product_id": "2",
                "product_name": "Apple iPhone 7 (A1660) 128G 移动联通电信4G手机",
                "price": "100",
                "tag_price": "618800",
                "item_count": "1",
                "sku_str": "银色",
                "sku_id": "52",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "logistic_fee": null
            }, {
                "id": "197",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000018",
            "pay_amount": "103",
            "order_status": "YGB",
            "create_time": "2017-05-27 11:17:06",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "2",
            "address_name": "孙",
            "address_phone": "18210171793",
            "xvporderitems": [{
                "id": "194",
                "product_id": "2",
                "product_name": "Apple iPhone 7 (A1660) 128G 移动联通电信4G手机",
                "price": "100",
                "tag_price": "618800",
                "item_count": "1",
                "sku_str": "银色",
                "sku_id": "52",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "logistic_fee": null
            }, {
                "id": "195",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000017",
            "pay_amount": "100",
            "order_status": "YGB",
            "create_time": "2017-05-27 11:15:21",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "0",
            "address_name": "孙",
            "address_phone": "18210171793",
            "xvporderitems": [{
                "id": "193",
                "product_id": "1",
                "product_name": "Apple iPhone 7 (A1660) 32G  移动联通电信4G手机",
                "price": "100",
                "tag_price": "538800",
                "item_count": "1",
                "sku_str": "银色",
                "sku_id": "48",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/2f021ca8-66d8-413c-a2d2-8e32a5657452.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/7dc45e49-35ea-4fdf-9106-e94812e82e2e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/c5810777-c252-43da-8feb-e566cce2cafe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/344d5447-07d3-4ce9-a3a8-e11a6cdde97e.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5b599d86-9483-43fa-89f0-3cd257018b80.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000016",
            "pay_amount": "2",
            "order_status": "YSH",
            "create_time": "2017-05-27 11:04:09",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "0",
            "address_name": "我先维护一个收货地址",
            "address_phone": "18911112222",
            "xvporderitems": [{
                "id": "192",
                "product_id": "9",
                "product_name": "Apple iPhone 7 Plus (A1661)  128G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "718800",
                "item_count": "2",
                "sku_str": "红色",
                "sku_id": "76",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000015",
            "pay_amount": "5",
            "order_status": "YSH",
            "create_time": "2017-05-27 10:52:21",
            "refund_status": "退款失败",
            "refund_create_time": "1495854121000",
            "logistic_fee": "2",
            "address_name": "孙",
            "address_phone": "18210171793",
            "xvporderitems": [{
                "id": "190",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }, {
                "id": "191",
                "product_id": "9",
                "product_name": "Apple iPhone 7 Plus (A1661)  128G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "718800",
                "item_count": "2",
                "sku_str": "红色",
                "sku_id": "76",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000014",
            "pay_amount": "4",
            "order_status": "YGB",
            "create_time": "2017-05-27 10:47:27",
            "refund_status": "退款成功",
            "refund_create_time": "1495854893000",
            "logistic_fee": "2",
            "address_name": "我先维护一个收货地址",
            "address_phone": "18911112222",
            "xvporderitems": [{
                "id": "188",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }, {
                "id": "189",
                "product_id": "9",
                "product_name": "Apple iPhone 7 Plus (A1661)  128G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "718800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "76",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000013",
            "pay_amount": "698800",
            "order_status": "YGB",
            "create_time": "2017-05-27 10:41:50",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "0",
            "address_name": "陈楠",
            "address_phone": "15611039918",
            "xvporderitems": [{
                "id": "187",
                "product_id": "8",
                "product_name": "Apple iPhone 7 (A1660) 256G 红色特别版 移动联通电信4G手机",
                "price": "698800",
                "tag_price": "698800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "75",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/99a33606-e955-4eaa-87c6-a7ef31fc3a31.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/a9d31e28-56f3-4fda-881e-9ef115adac65.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/10e6e37f-cd25-4508-a903-e1bd8413278c.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/4afbd642-3527-4684-8255-eedf9c62b828.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/afa21610-a924-4d75-8762-37574bb1a61a.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/99a33606-e955-4eaa-87c6-a7ef31fc3a31.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/a9d31e28-56f3-4fda-881e-9ef115adac65.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/10e6e37f-cd25-4508-a903-e1bd8413278c.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/4afbd642-3527-4684-8255-eedf9c62b828.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/afa21610-a924-4d75-8762-37574bb1a61a.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000012",
            "pay_amount": "103",
            "order_status": "DFH",
            "create_time": "2017-05-27 10:27:31",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "2",
            "address_name": "陈楠",
            "address_phone": "15611039918",
            "xvporderitems": [{
                "id": "185",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }, {
                "id": "186",
                "product_id": "1",
                "product_name": "Apple iPhone 7 (A1660) 32G  移动联通电信4G手机",
                "price": "100",
                "tag_price": "538800",
                "item_count": "1",
                "sku_str": "玫瑰金色",
                "sku_id": "47",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/9da40fbc-6121-423e-aaa9-f595a7e76a60.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/20cff23b-18ad-4226-91ed-23559115697a.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/951366ba-533d-4845-94fd-0e5625dbe83d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/d54a4308-8197-4c5b-91cc-a4bdc5b8a0e3.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/9ee3a514-c667-4c02-af47-0f96acb4f778.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/9da40fbc-6121-423e-aaa9-f595a7e76a60.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/20cff23b-18ad-4226-91ed-23559115697a.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/951366ba-533d-4845-94fd-0e5625dbe83d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/d54a4308-8197-4c5b-91cc-a4bdc5b8a0e3.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/9ee3a514-c667-4c02-af47-0f96acb4f778.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000011",
            "pay_amount": "1",
            "order_status": "DSH",
            "create_time": "2017-05-27 10:17:06",
            "refund_status": "退款中",
            "refund_create_time": "1495851495000",
            "logistic_fee": "0",
            "address_name": "王二三生",
            "address_phone": "18911725624",
            "xvporderitems": [{
                "id": "184",
                "product_id": "9",
                "product_name": "Apple iPhone 7 Plus (A1661)  128G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "718800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "76",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000010",
            "pay_amount": "3",
            "order_status": "YGB",
            "create_time": "2017-05-27 10:13:36",
            "refund_status": "退款成功",
            "refund_create_time": "1495851276000",
            "logistic_fee": "2",
            "address_name": "王二三生",
            "address_phone": "18911725624",
            "xvporderitems": [{
                "id": "183",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000009",
            "pay_amount": "3",
            "order_status": "DFK",
            "create_time": "2017-05-27 10:13:26",
            "refund_status": null,
            "refund_create_time": null,
            "logistic_fee": "2",
            "address_name": "王二三生",
            "address_phone": "18911725624",
            "xvporderitems": [{
                "id": "182",
                "product_id": "10",
                "product_name": "Apple iPhone 7 Plus (A1661)  256G 红色特别版 移动联通电信4G手机",
                "price": "1",
                "tag_price": "798800",
                "item_count": "1",
                "sku_str": "红色",
                "sku_id": "77",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/435434f1-367c-4d79-8a6a-c36b32a5b57f.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b1d20a00-3ec4-4dcc-8134-06b41e0a7abe.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/124b4993-98d7-40da-b271-5fd610174a73.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/5169ce25-be5a-44d9-80ef-ee9ebc35391d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e7216302-8b0b-48c4-8ef7-399bd6fec992.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000008",
            "pay_amount": "100",
            "order_status": "DFH",
            "create_time": "2017-05-27 10:07:37",
            "refund_status": "退款中",
            "refund_create_time": "1495851009000",
            "logistic_fee": "0",
            "address_name": "刘纯昀",
            "address_phone": "15074560216",
            "xvporderitems": [{
                "id": "181",
                "product_id": "2",
                "product_name": "Apple iPhone 7 (A1660) 128G 移动联通电信4G手机",
                "price": "100",
                "tag_price": "618800",
                "item_count": "1",
                "sku_str": "金色",
                "sku_id": "50",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000007",
            "pay_amount": "100",
            "order_status": "DFH",
            "create_time": "2017-05-27 10:06:26",
            "refund_status": "退款中",
            "refund_create_time": "1495850931000",
            "logistic_fee": "0",
            "address_name": "刘纯昀",
            "address_phone": "15074560216",
            "xvporderitems": [{
                "id": "180",
                "product_id": "2",
                "product_name": "Apple iPhone 7 (A1660) 128G 移动联通电信4G手机",
                "price": "100",
                "tag_price": "618800",
                "item_count": "1",
                "sku_str": "金色",
                "sku_id": "50",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "logistic_fee": null
            }]
        }, {
            "order_id": "ORDER201705270000006",
            "pay_amount": "100",
            "order_status": "DFH",
            "create_time": "2017-05-27 10:03:56",
            "refund_status": "退款中",
            "refund_create_time": "1495851012000",
            "logistic_fee": "0",
            "address_name": "刘纯昀",
            "address_phone": "15074560216",
            "xvporderitems": [{
                "id": "179",
                "product_id": "2",
                "product_name": "Apple iPhone 7 (A1660) 128G 移动联通电信4G手机",
                "price": "100",
                "tag_price": "618800",
                "item_count": "1",
                "sku_str": "金色",
                "sku_id": "50",
                "pic": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "thumbnail": "[\"http://okxm1ge1z.bkt.clouddn.com/19b03687-878f-4a92-9286-4a04ce63f672.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/b54cfe25-177b-4b59-869d-cea2f2339e30.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/535ff9bc-ae8c-4d19-9732-2d7599ba465d.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/619ecb56-00fc-4c56-b901-6402697d57b6.jpg\",\"http://okxm1ge1z.bkt.clouddn.com/e2c621bd-7d30-47b2-8c44-7ea982a38324.jpg\"]",
                "logistic_fee": null
            }]
        }], "total_amount": 145
    }
})

//二版
Mock.mock(basepath + "/seller/account/balances/list", "post", {
    code: "SUCCESS",
    result: {
        list: [
            {
                "id": 1111,
                "transfer_id": "1111111111111",
                "card_no": "1234",
                "type": 0,//0结算|1 提现,
                "amount": "1000",
                "acount_amount": 2000,
                "commission": 1000,
                "create_time": "2017-01-09 15:07:51",
                "status": "TXSB",
                bank_name: "招商银行"
            },
            {
                "id": 1111,
                "transfer_id": "1111111111111",
                "card_no": "1234",
                "type": 1,//0结算|1 提现,
                "amount": "1000",
                "acount_amount": 2000,
                "commission": 1000,
                "create_time": "2017-01-09 15:07:51",
                "status": "TXSB",
                bank_name: "招商银行"
            }
        ],
        total_amount: 50
    }
});
Mock.mock(basepath + "/seller/account/getAccountAmount", "post", {
    code: "SUCCESS",
    result: {
        "withdrawals_amount": 10000,//（可提现金额(分)）
        "today_income_amount": 100000,//（今日收入金额(分）
        "income_amount": 1000000//（累计收入金额(分)）
    }
});

Mock.mock(basepath + "/seller/account/balances/detail", "post", {
    code: "SUCCESS",
    result: {
        list: [
            {
                "order_id": 123456789,
                "amount": 12500,
                "create_time": "2017-01-09 15:07:51"
            },
            {
                "order_id": 123456789,
                "amount": 12500,
                "create_time": "2017-01-09 15:07:51"
            }
        ],
        total_amount: 20
    }
});

Mock.mock(basepath + "/seller/account/createPerson", "post", {
    code: "SUCCESS",
    result: {}
});
Mock.mock(basepath + "/seller/account/createCompany", "post", {
    code: "SUCCESS",
    result: {}
});
Mock.mock(basepath + "/seller/account/getBankInfo", "post", {
    "code": "SUCCESS",
    "result": [{"bankcode": "102", "bankname": "中国工商银行"}, {"bankcode": "103", "bankname": "中国农业银行"}, {
        "bankcode": "104",
        "bankname": "中国银行"
    }, {"bankcode": "105", "bankname": "中国建设银行"}, {"bankcode": "301", "bankname": "交通银行"}, {
        "bankcode": "302",
        "bankname": "中信银行"
    }, {"bankcode": "303", "bankname": "中国光大银行"}, {"bankcode": "308", "bankname": "招商银行"}, {
        "bankcode": "309",
        "bankname": "兴业银行"
    }, {"bankcode": "310", "bankname": "上海浦东发展银行"}, {"bankcode": "403", "bankname": "中国邮政储蓄银行"}]
});
Mock.mock(basepath + "/seller/account/getBankCity", "post", {
    "code": "SUCCESS",
    "result": [{"code": "1000", "name": "北京市"}, {"code": "1100", "name": "天津市"}, {
        "code": "1200",
        "name": "河北省"
    }, {"code": "1600", "name": "山西省 "}, {"code": "1900", "name": "内蒙古自治区"}, {
        "code": "2200",
        "name": "辽宁省"
    }, {"code": "2400", "name": "吉林省"}, {"code": "2600", "name": "黑龙江省"}, {
        "code": "2900",
        "name": "上海市"
    }, {"code": "3000", "name": "江苏省"}, {"code": "3300", "name": "浙江省"}, {
        "code": "3600",
        "name": "安徽省"
    }, {"code": "3900", "name": "福建省"}, {"code": "4200", "name": "江西省"}, {
        "code": "4500",
        "name": "山东省"
    }, {"code": "4900", "name": "河南省"}, {"code": "5200", "name": "湖北省"}, {
        "code": "5500",
        "name": "湖南省"
    }, {"code": "5800", "name": "广东省"}, {"code": "6100", "name": "广西自治区"}, {
        "code": "6400",
        "name": "海南省"
    }, {"code": "6500", "name": "四川省"}, {"code": "6530", "name": "重庆市"}, {
        "code": "7000",
        "name": "贵州省"
    }, {"code": "7300", "name": "云南省"}, {"code": "7700", "name": "西藏自治区"}, {
        "code": "7900",
        "name": "陕西省"
    }, {"code": "8200", "name": "甘肃省"}, {"code": "8500", "name": "青海省"}, {
        "code": "8700",
        "name": "宁夏自治区"
    }, {"code": "8800", "name": "新疆自治区"}]
});
Mock.mock(basepath + "", "post", {
    "code": "SUCCESS",
    "result": [{"bankcode": "102100000388", "bankname": "中国工商银行股份有限公司北京八里庄支行"}, {
        "bankcode": "102100000415",
        "bankname": "中国工商银行股份有限公司北京东四支行"
    }, {"bankcode": "102100000423", "bankname": "中国工商银行股份有限公司北京和平里支行"}, {
        "bankcode": "102100000431",
        "bankname": "中国工商银行股份有限公司北京北新桥支行"
    }, {"bankcode": "102100000458", "bankname": "中国工商银行股份有限公司北京海淀西区支行营业室"}, {
        "bankcode": "102100000466",
        "bankname": "中国工商银行股份有限公司北京公主坟支行"
    }, {"bankcode": "102100000474", "bankname": "中国工商银行股份有限公司北京幸福街支行"}, {
        "bankcode": "102100000482",
        "bankname": "中国工商银行股份有限公司北京长辛店支行"
    }, {"bankcode": "102100000499", "bankname": "中国工商银行股份有限公司北京永定路支行"}, {
        "bankcode": "102100000562",
        "bankname": "中国工商银行股份有限公司北京英蓝中心支行"
    }, {"bankcode": "102100000587", "bankname": "中国工商银行股份有限公司北京北辛安支行"}, {
        "bankcode": "102100000595",
        "bankname": "中国工商银行股份有限公司北京顺义支行"
    }, {"bankcode": "102100000600", "bankname": "中国工商银行股份有限公司北京首都机场支行"}, {
        "bankcode": "102100000618",
        "bankname": "中国工商银行股份有限公司北京清河镇支行"
    }, {"bankcode": "102100000626", "bankname": "中国工商银行股份有限公司北京东升路支行"}, {
        "bankcode": "102100000634",
        "bankname": "中国工行银行股份有限公司北京惠新支行"
    }, {"bankcode": "102100000642", "bankname": "中国工商银行股份有限公司北京云岗支行"}, {
        "bankcode": "102100000659",
        "bankname": "中国工商银行股份有限公司北京东高地支行"
    }, {"bankcode": "102100000683", "bankname": "中国工商银行股份有限公司北京管庄支行"}, {
        "bankcode": "102100000763",
        "bankname": "中国工商银行股份有限公司北京紫竹院支行"
    }, {"bankcode": "102100000802", "bankname": "中国工商银行股份有限公司北京琉璃厂支行"}, {
        "bankcode": "102100000819",
        "bankname": "中国工商银行股份有限公司北京体育馆路支行"
    }, {"bankcode": "102100000886", "bankname": "中国工商银行股份有限公司北京百荣世贸路支行"}, {
        "bankcode": "102100001008",
        "bankname": "中国工商银行股份有限公司北京北太平庄支行"
    }, {"bankcode": "102100001145", "bankname": "中国工商银行股份有限公司北京大兴支行"}, {
        "bankcode": "102100001153",
        "bankname": "中国工商银行股份有限公司北京城关支行"
    }, {"bankcode": "102100001161", "bankname": "中国工商银行股份有限公司北京南口支行"}, {
        "bankcode": "102100001170",
        "bankname": "中国工商银行股份有限公司北京沙河支行"
    }, {"bankcode": "102100001188", "bankname": "中国工商银行股份有限公司延庆县支行"}, {
        "bankcode": "102100001196",
        "bankname": "中国工商银行股份有限公司北京平谷支行"
    }, {"bankcode": "102100001215", "bankname": "中国工商银行股份有限公司北京怀柔支行"}, {
        "bankcode": "102100001223",
        "bankname": "中国工商银行股份有限公司密云支行"
    }, {"bankcode": "102100001274", "bankname": "中国工商银行股份有限公司北京燕莎支行"}, {
        "bankcode": "102100001282",
        "bankname": "中国工商银行股份有限公司北京永顺潞苑支行"
    }, {"bankcode": "102100001320", "bankname": "中国工商银行股份有限公司北京张家湾支行"}, {
        "bankcode": "102100001338",
        "bankname": "中国工商银行股份有限公司北京灵境支行"
    }, {"bankcode": "102100001346", "bankname": "中国工商银行股份有限公司北京八角支行"}, {
        "bankcode": "102100001354",
        "bankname": "中国工商银行股份有限公司北京八大处支行"
    }, {"bankcode": "102100001442", "bankname": "中国工商银行股份有限公司北京石景山支行古城分理处"}, {
        "bankcode": "102100002003",
        "bankname": "中国工商银行股份有限公司北京白云路支行"
    }, {"bankcode": "102100000021", "bankname": "中国工商银行股份有限公司北京通州支行新华分理处"}, {
        "bankcode": "102100000048",
        "bankname": "中国工商银行股份有限公司北京方庄支行东铁匠营分理处"
    }, {"bankcode": "102100000056", "bankname": "中国工商银行股份有限公司北京崇文门外大街支行"}, {
        "bankcode": "102100000064",
        "bankname": "中国工商银行股份有限公司北京樱桃园支行"
    }, {"bankcode": "102100000072", "bankname": "中国工商银行股份有限公司北京王府井金街支行"}, {
        "bankcode": "102100000097",
        "bankname": "中国工商银行股份有限公司北京南中轴路支行"
    }, {"bankcode": "102100000101", "bankname": "中国工商银行股份有限公司北京东四南支行"}, {
        "bankcode": "102100000110",
        "bankname": "中国工商银行股份有限公司北京安定门支行"
    }, {"bankcode": "102100000128", "bankname": "中国工商银行股份有限公司北京左安门支行"}, {
        "bankcode": "102100000144",
        "bankname": "中国工商银行股份有限公司北京百万庄支行"
    }, {"bankcode": "102100000152", "bankname": "中国工商银行股份有限公司北京崇文支行永定门分理处"}, {
        "bankcode": "102100000169",
        "bankname": "中国工商银行股份有限公司北京燕山支行"
    }, {"bankcode": "102100000185", "bankname": "中国工商银行股份有限公司北京菜市口支行"}, {
        "bankcode": "102100000193",
        "bankname": "中国工商银行股份有限公司北京广安门支行"
    }, {"bankcode": "102100000208", "bankname": "中国工商银行股份有限公司北京门头沟支行龙泉分理处"}, {
        "bankcode": "102100000216",
        "bankname": "中国工商银行股份有限公司北京西河沿支行"
    }, {"bankcode": "102100000290", "bankname": "中国工商银行股份有限公司北京新街口支行"}, {
        "bankcode": "102100000312",
        "bankname": "中国工商银行股份有限公司北京珠市口支行"
    }, {"bankcode": "102100000329", "bankname": "中国工商银行股份有限公司北京鼓楼支行"}, {
        "bankcode": "102100000353",
        "bankname": "中国工商银行股份有限公司北京望京支行"
    }, {"bankcode": "102100000361", "bankname": "中国工商银行股份有限公司北京礼士路支行"}, {
        "bankcode": "102100002020",
        "bankname": "中国工商银行股份有限公司北京金台路支行"
    }, {"bankcode": "102100002038", "bankname": "中国工商银行股份有限公司北京太平桥支行"}, {
        "bankcode": "102100002222",
        "bankname": "中国工商银行股份有限公司北京高井支行"
    }, {"bankcode": "102100002239", "bankname": "中国工商银行股份有限公司北京六铺炕支行"}, {
        "bankcode": "102100002247",
        "bankname": "中国工商银行股份有限公司北京石油大厦支行"
    }, {"bankcode": "102100002271", "bankname": "中国工商银行股份有限公司北京潘家园支行"}, {
        "bankcode": "102100002335",
        "bankname": "中国工商银行股份有限公司北京铁道支行"
    }, {"bankcode": "102100002484", "bankname": "中国工商银行股份有限公司北京天宁寺支行"}, {
        "bankcode": "102100002556",
        "bankname": "中国工商银行股份有限公司北京学院路支行"
    }, {"bankcode": "102100002564", "bankname": "中国工商银行股份有限公司北京马甸支行"}, {
        "bankcode": "102100002597",
        "bankname": "中国工商银行股份有限公司北京房山支行东风分理处"
    }, {"bankcode": "102100002644", "bankname": "中国工商银行股份有限公司北京房山支行良乡分理处"}, {
        "bankcode": "102100002652",
        "bankname": "中国工商银行股份有限公司北京市分行房山支行西潞园分理处"
    }, {"bankcode": "102100004113", "bankname": "中国工商银行股份有限公司北京市分行房山支行政通路分理处"}, {
        "bankcode": "102100004121",
        "bankname": "中国工商银行股份有限公司北京中山街支行"
    }, {"bankcode": "102100004130", "bankname": "中国工商银行股份有限公司北京顺义支行牛栏山分理处"}, {
        "bankcode": "102100008333",
        "bankname": "中国工商银行北京长安支行建国门内大街分理处"
    }, {"bankcode": "102100009019", "bankname": "中国工商银行股份有限公司北京天竺支行"}, {
        "bankcode": "102100009027",
        "bankname": "中国工商银行股份有限公司北京回龙观支行"
    }, {"bankcode": "102100009051", "bankname": "中国工商银行股份有限公司北京新航站楼支行"}, {
        "bankcode": "102100009213",
        "bankname": "中国工商银行股份有限公司北京马连道茶城支行"
    }, {"bankcode": "102100009561", "bankname": "中国工商银行股份有限公司北京中关村支行"}, {
        "bankcode": "102100009570",
        "bankname": "中国工商银行股份有限公司北京中关村支行成府路分理处"
    }, {"bankcode": "102100009588", "bankname": "中国工商银行股份有限公司北京天通苑支行"}, {
        "bankcode": "102100009596",
        "bankname": "中国工商银行股份有限公司北京世纪村支行"
    }, {"bankcode": "102100009623", "bankname": "中国工商银行股份有限公司北京九龙山支行"}, {
        "bankcode": "102100009631",
        "bankname": "中国工商银行股份有限公司北京世纪坛支行"
    }, {"bankcode": "102100009640", "bankname": "中国工商银行股份有限公司北京新兴支行"}, {
        "bankcode": "102100009658",
        "bankname": "中国工商银行股份有限公司北京南湖中园支行"
    }, {"bankcode": "102100009666", "bankname": "中国工商银行股份有限公司北京国展支行"}, {
        "bankcode": "102100009682",
        "bankname": "中国工商银行股份有限公司北京南礼士路支行营业室"
    }, {"bankcode": "102100009703", "bankname": "中国工商银行股份有限公司北京中关村支行建材城东路分理处"}, {
        "bankcode": "102100009746",
        "bankname": "中国工商银行股份有限公司北京北苑家园支行"
    }, {"bankcode": "102100009754", "bankname": "中国工商银行股份有限公司北京光机电支行"}, {
        "bankcode": "102100009779",
        "bankname": "中国工商银行股份有限公司北京金地格林小镇支行"
    }, {"bankcode": "102100009787", "bankname": "中国工商银行股份有限公司北京公益桥支行"}, {
        "bankcode": "102100009795",
        "bankname": "中国工商银行股份有限公司北京中航油支行"
    }, {"bankcode": "102100009800", "bankname": "中国工商银行股份有限公司北京隆庆街支行"}, {
        "bankcode": "102100009818",
        "bankname": "中国工商银行股份有限公司北京亚运村支行"
    }, {"bankcode": "102100009826", "bankname": "中国工商银行股份有限公司北京官园支行"}, {
        "bankcode": "102100009980",
        "bankname": "中国工商银行北京市分行清算中心"
    }, {"bankcode": "102100014355", "bankname": "中国工商银行股份有限公司北京经济技术开发区天宝园支行"}, {
        "bankcode": "102100014744",
        "bankname": "中国工商银行股份有限公司北京天秀支行"
    }, {"bankcode": "102100014816", "bankname": "中国工商银行股份有限公司北京花园东路支行"}, {
        "bankcode": "102100014857",
        "bankname": "中国工商银行股份有限公司北京京奥嘉园支行"
    }, {"bankcode": "102100014865", "bankname": "中国工商银行股份有限公司北京学清路支行"}, {
        "bankcode": "102100015180",
        "bankname": "中国工商银行股份有限公司北京永丰支行"
    }, {"bankcode": "102100017005", "bankname": "中国工商银行股份有限公司北京荣华中路支行"}, {
        "bankcode": "102100018651",
        "bankname": "中国工商银行股份有限公司北京百旺新城支行"
    }, {"bankcode": "102100020165", "bankname": "中国工商银行股份有限公司北京和平门内支行"}, {
        "bankcode": "102100020270",
        "bankname": "中国工商银行北京海运仓支行"
    }, {"bankcode": "102100020307", "bankname": "中国工商银行股份有限公司北京和平里北街支行"}, {
        "bankcode": "102100020323",
        "bankname": "中国工商银行股份有限公司北京福地广场支行"
    }, {"bankcode": "102100020420", "bankname": "中国工商银行股份有限公司北京朗琴园支行"}, {
        "bankcode": "102100020438",
        "bankname": "中国工商银行股份有限公司北京青年湖支行"
    }, {"bankcode": "102100020454", "bankname": "中国工商银行股份有限公司北京星火西路支行"}, {
        "bankcode": "102100020462",
        "bankname": "中国工商银行股份有限公司北京新源里支行"
    }, {"bankcode": "102100020500", "bankname": "中国工商银行股份有限公司北京中海凯旋支行"}, {
        "bankcode": "102100020518",
        "bankname": "中国工商银行股份有限公司北京搜宝商务中心支行"
    }, {"bankcode": "102100020534", "bankname": "中国工商银行股份有限公司北京和平街支行"}, {
        "bankcode": "102100020647",
        "bankname": "中国工商银行股份有限公司北京嘉美风尚支行"
    }, {"bankcode": "102100020698", "bankname": "中国工商银行股份有限公司北京科学院支行"}, {
        "bankcode": "102100020786",
        "bankname": "中国工商银行股份有限公司北京玉东支行"
    }, {"bankcode": "102100020794", "bankname": "中国工商银行股份有限公司北京知春路支行"}, {
        "bankcode": "102100020850",
        "bankname": "中国工商银行股份有限公司北京麦子店支行"
    }, {"bankcode": "102100020913", "bankname": "中国工商银行股份有限公司北京万国城支行"}, {
        "bankcode": "102100020948",
        "bankname": "中国工商银行股份有限公司北京灯市口支行"
    }, {"bankcode": "102100020956", "bankname": "中国工商银行股份有限公司北京中环广场支行"}, {
        "bankcode": "102100021004",
        "bankname": "中国工商银行股份有限公司北京东坝支行"
    }, {"bankcode": "102100021029", "bankname": "中国工商银行股份有限公司北京大悦城支行"}, {
        "bankcode": "102100021037",
        "bankname": "中国工商银行股份有限公司北京西单北大街支行"
    }, {"bankcode": "102100021053", "bankname": "中国工商银行股份有限公司北京白塔寺支行"}, {
        "bankcode": "102100021070",
        "bankname": "中国工商银行股份有限公司北京东直门支行"
    }, {"bankcode": "102100021115", "bankname": "中国工商银行股份有限公司北京朝内大街支行"}, {
        "bankcode": "102100021166",
        "bankname": "中国工商银行股份有限公司北京甜水园支行"
    }, {"bankcode": "102100021174", "bankname": "中国工商银行股份有限公司北京夕照寺支行"}, {
        "bankcode": "102100021182",
        "bankname": "中国工商银行股份有限公司北京天坛东路支行"
    }, {"bankcode": "102100021211", "bankname": "中国工商银行股份有限公司北京东直门内大街支行"}, {
        "bankcode": "102100021246",
        "bankname": "中国工商银行股份有限公司北京十里堡支行"
    }, {"bankcode": "102100021254", "bankname": "中国工商银行股份有限公司北京常营支行"}, {
        "bankcode": "102100021262",
        "bankname": "中国工商银行股份有限公司北京龙潭支行"
    }, {"bankcode": "102100021334", "bankname": "中国工商银行股份有限公司北京阜成门支行"}, {
        "bankcode": "102100021359",
        "bankname": "中国工商银行股份有限公司北京安华桥西支行"
    }, {"bankcode": "102100021439", "bankname": "中国工商银行股份有限公司北京远洋风景支行"}, {
        "bankcode": "102100021455",
        "bankname": "中国工商银行股份有限公司北京华润大厦支行"
    }, {"bankcode": "102100021463", "bankname": "中国工商银行股份有限公司北京禄米仓支行"}, {
        "bankcode": "102100021519",
        "bankname": "中国工商银行股份有限公司北京南纬路支行"
    }, {"bankcode": "102100021527", "bankname": "中国工商银行股份有限公司北京虎坊路支行"}, {
        "bankcode": "102100021535",
        "bankname": "中国工商银行股份有限公司北京复内支行"
    }, {"bankcode": "102100021617", "bankname": "中国工商银行股份有限公司北京宣武支行菜百分理处"}, {
        "bankcode": "102100021625",
        "bankname": "中国工商银行股份有限公司北京马连道支行"
    }, {"bankcode": "102100021650", "bankname": "中国工商银行股份有限公司北京国防大学支行"}, {
        "bankcode": "102100021668",
        "bankname": "中国工商银行股份有限公司北京厢红旗支行"
    }, {"bankcode": "102100021676", "bankname": "中国工商银行股份有限公司北京北蜂窝路支行"}, {
        "bankcode": "102100021684",
        "bankname": "中国工商银行股份有限公司北京金融街支行营业室"
    }, {"bankcode": "102100021692", "bankname": "中国工商银行股份有限公司北京朝阳门支行"}, {
        "bankcode": "102100021844",
        "bankname": "中国工商银行股份有限公司北京三里屯支行"
    }, {"bankcode": "102100005382", "bankname": "中国工商银行股份有限公司北京方庄支行"}, {
        "bankcode": "102100005905",
        "bankname": "中国工商银行股份有限公司北京经济技术开发区宏达北路支行"
    }, {"bankcode": "102100005921", "bankname": "中国工商银行股份有限公司北京平谷支行滨河工业区分理处"}, {
        "bankcode": "102100005930",
        "bankname": "中国工商银行股份有限公司北京正阳门支行　"
    }, {"bankcode": "102100006295", "bankname": "中国工商银行股份有限公司北京日坛路支行"}, {
        "bankcode": "102100006300",
        "bankname": "中国工商银行股份有限公司北京玉泉路支行"
    }, {"bankcode": "102100006471", "bankname": "中国工商银行股份有限公司北京北京站支行"}, {
        "bankcode": "102100006480",
        "bankname": "中国工商银行股份有限公司北京安贞支行"
    }, {"bankcode": "102100006498", "bankname": "中国工商银行股份有限公司北京小汤山支行"}, {
        "bankcode": "102100006502",
        "bankname": "中国工商银行股份有限公司北京西直门支行"
    }, {"bankcode": "102100006609", "bankname": "中国工商银行股份有限公司北京西客站支行"}, {
        "bankcode": "102100006990",
        "bankname": "中国工商银行股份有限公司北京世纪金源支行"
    }, {"bankcode": "102100007777", "bankname": "中国工商银行股份有限公司北京市分行票据融资部"}, {
        "bankcode": "102100007816",
        "bankname": "中国工商银行北京清华园支行"
    }, {"bankcode": "102100008018", "bankname": "中国工商银行股份有限公司北京白广路支行"}, {
        "bankcode": "102100008026",
        "bankname": "中国工商银行股份有限公司北京太平路支行"
    }, {"bankcode": "102100008042", "bankname": "中国工商银行股份有限公司北京新世界支行"}, {
        "bankcode": "102100008059",
        "bankname": "中国工商银行股份有限公司北京四元桥支行"
    }, {"bankcode": "102100008067", "bankname": "中国工商银行股份有限公司北京商务中心区支行"}, {
        "bankcode": "102100008075",
        "bankname": "中国工商银行股份有限公司北京东城支行"
    }, {"bankcode": "102100008091", "bankname": "中国工商银行股份有限公司北京翠微路支行"}, {
        "bankcode": "102100021981",
        "bankname": "中国工商银行股份有限公司北京西便门支行"
    }, {"bankcode": "102100022099", "bankname": "中国工商银行股份有限公司北京酒仙桥支行"}, {
        "bankcode": "102100022146",
        "bankname": "中国工商银行股份有限公司北京琉璃井支行"
    }, {"bankcode": "102100022218", "bankname": "中国工商银行股份有限公司北京柳芳支行"}, {
        "bankcode": "102100022306",
        "bankname": "中国工商银行股份有限公司北京中石化小营大厦支行"
    }, {"bankcode": "102100022402", "bankname": "中国工商银行股份有限公司北京赵登禹路支行"}, {
        "bankcode": "102100022517",
        "bankname": "中国工商银行股份有限公司北京鼓楼外大街支行"
    }, {"bankcode": "102100022605", "bankname": "中国工商银行股份有限公司北京玉林支行"}, {
        "bankcode": "102100022793",
        "bankname": "中国工商银行股份有限公司北京国航大厦支行"
    }, {"bankcode": "102100022824", "bankname": "中国工商银行股份有限公司北京化信支行"}, {
        "bankcode": "102100022832",
        "bankname": "中国工商银行股份有限公司北京曙光支行"
    }, {"bankcode": "102100023042", "bankname": "中国工商银行股份有限公司北京京城支行"}, {
        "bankcode": "102100023219",
        "bankname": "中国工商银行股份有限公司北京玉渊潭支行"
    }, {"bankcode": "102100023456", "bankname": "中国工商银行股份有限公司北京华贸中心支行"}, {
        "bankcode": "102100023489",
        "bankname": "中国工商银行股份有限公司北京广顺支行"
    }, {"bankcode": "102100023528", "bankname": "中国工商银行股份有限公司北京电信大楼支行"}, {
        "bankcode": "102100023552",
        "bankname": "中国工商银行股份有限公司北京紫竹桥支行"
    }, {"bankcode": "102100023577", "bankname": "中国工商银行股份有限公司北京工体北路支行"}, {
        "bankcode": "102100023632",
        "bankname": "中国工商银行股份有限公司北京新东安支行"
    }, {"bankcode": "102100023657", "bankname": "中国工商银行股份有限公司北京东方梅地亚支行"}, {
        "bankcode": "102100024019",
        "bankname": "中国工商银行股份有限公司北京西三旗支行"
    }, {"bankcode": "102100024141", "bankname": "中国工商银行股份有限公司北京东苇路支行"}, {
        "bankcode": "102100024248",
        "bankname": "中国工商银行北京新中街支行"
    }, {"bankcode": "102100024310", "bankname": "中国工商银行股份有限公司北京定福庄支行"}, {
        "bankcode": "102100024457",
        "bankname": "中国工商银行股份有限公司北京大屯路支行"
    }, {"bankcode": "102100024553", "bankname": "中国工商银行股份有限公司北京地坛支行"}, {
        "bankcode": "102100024596",
        "bankname": "中国工商银行股份有限公司北京高速公路指挥中心支行"
    }, {"bankcode": "102100024631", "bankname": "中国工商银行股份有限公司北京科学园南路支行"}, {
        "bankcode": "102100024826",
        "bankname": "中国工商银行股份有限公司北京人民大学支行"
    }, {"bankcode": "102100025013", "bankname": "中国工商银行股份有限公司北京复兴门支行"}, {
        "bankcode": "102100025110",
        "bankname": "中国工商银行股份有限公司北京马连洼支行"
    }, {"bankcode": "102100025128", "bankname": "中国工商银行股份有限公司北京五棵松奥体支行"}, {
        "bankcode": "102100025185",
        "bankname": "中国工商银行股份有限公司北京苏州桥支行"
    }, {"bankcode": "102100025281", "bankname": "中国工商银行股份有限公司北京八里庄北里支行"}, {
        "bankcode": "102100025290",
        "bankname": "中国工商银行股份有限公司北京双桥路支行"
    }, {"bankcode": "102100025370", "bankname": "中国工商银行股份有限公司北京金台北里支行"}, {
        "bankcode": "102100025458",
        "bankname": "中国工商银行股份有限公司北京中关村南路支行"
    }, {"bankcode": "102100026170", "bankname": "中国工商银行股份有限公司北京新城支行"}, {
        "bankcode": "102100026483",
        "bankname": "中国工商银行股份有限公司北京府学路支行"
    }, {"bankcode": "102100026686", "bankname": "中国工商银行股份有限公司北京高碑店支行"}, {
        "bankcode": "102100026864",
        "bankname": "中国工商银行股份有限公司北京通州支行玉桥支行"
    }, {"bankcode": "102100027003", "bankname": "中国工商银行股份有限公司北京通马路支行"}, {
        "bankcode": "102100028102",
        "bankname": "中国工商银行股份有限公司北京六里桥支行"
    }, {"bankcode": "102100028127", "bankname": "中国工商银行股份有限公司北京世纪城支行"}, {
        "bankcode": "102100028225",
        "bankname": "中国工商银行股份有限公司北京羊坊店支行"
    }, {"bankcode": "102100028565", "bankname": "中国工商银行股份有限公司北京半岛国际支行"}, {
        "bankcode": "102100028604",
        "bankname": "中国工商银行股份有限公司北京青年路支行"
    }, {"bankcode": "102100028838", "bankname": "中国工商银行股份有限公司北京安慧支行"}, {
        "bankcode": "102100029113",
        "bankname": "中国工商银行股份有限公司北京双裕支行"
    }, {"bankcode": "102100029148", "bankname": "中国工商银行股份有限公司北京金树街支行"}, {
        "bankcode": "102100029189",
        "bankname": "中国工商银行股份有限公司北京东花市支行"
    }, {"bankcode": "102100029197", "bankname": "中国工商银行股份有限公司北京通朝支行"}, {
        "bankcode": "102100029531",
        "bankname": "中国工商银行股份有限公司北京万柳支行"
    }, {"bankcode": "102100029620", "bankname": "中国工商银行股份有限公司北京翠微路支行金四季分理处"}, {
        "bankcode": "102100029646",
        "bankname": "中国工商银行股份有限公司北京科技园支行"
    }, {"bankcode": "102100029679", "bankname": "中国工商银行股份有限公司北京望京科技园区支行"}, {
        "bankcode": "102100029742",
        "bankname": "中国工商银行股份有限公司北京广渠门支行"
    }, {"bankcode": "102100029759", "bankname": "中国工商银行股份有限公司北京丰汇园支行"}, {
        "bankcode": "102100029814",
        "bankname": "中国工商银行股份有限公司北京小营西路支行"
    }, {"bankcode": "102100029863", "bankname": "中国工商银行股份有限公司北京空港科技园支行"}, {
        "bankcode": "102100029978",
        "bankname": "中国工商银行股份有限公司北京西客站南路支行"
    }, {"bankcode": "102100029986", "bankname": "中国工商银行股份有限公司北京宣武门支行"}, {
        "bankcode": "102100030007",
        "bankname": "中国工商银行股份有限公司北京空港支行"
    }, {"bankcode": "102100030082", "bankname": "中国工商银行股份有限公司北京马驹桥支行"}, {
        "bankcode": "102100031681",
        "bankname": "中国工商银行股份有限公司北京经济技术开发区支行"
    }, {"bankcode": "102100031704", "bankname": "中国工商银行股份有限公司北京南站支行"}, {
        "bankcode": "102100033747",
        "bankname": "中国工商银行股份有限公司北京中电财支行"
    }, {"bankcode": "102100033755", "bankname": "中国工商银行股份有限公司北京中石化大厦支行"}, {
        "bankcode": "102100033763",
        "bankname": "中国工商银行股份有限公司北京地安门支行"
    }, {"bankcode": "102100034539", "bankname": "中国工商银行股份有限公司北京新国展支行"}, {
        "bankcode": "102100034555",
        "bankname": "中国工商银行股份有限公司北京北沙滩支行"
    }, {"bankcode": "102100034678", "bankname": "中国工商银行股份有限公司北京十八里店南桥支行"}, {
        "bankcode": "102100099988",
        "bankname": "中国工商银行股份有限公司新加坡人民币清算行"
    }, {"bankcode": "102100099996", "bankname": "中国工商银行总行清算中心"}, {
        "bankcode": "102100004148",
        "bankname": "中国工商银行股份有限公司北京会城门支行"
    }, {"bankcode": "102100004164", "bankname": "中国工商银行股份有限公司北京国贸大厦支行"}, {
        "bankcode": "102100004172",
        "bankname": "中国工商银行股份有限公司北京阜成路支行"
    }, {"bankcode": "102100004189", "bankname": "中国工商银行股份有限公司北京北辰路支行"}, {
        "bankcode": "102100004201",
        "bankname": "中国工商银行股份有限公司北京黄楼支行"
    }, {"bankcode": "102100004847", "bankname": "中国工商银行股份有限公司北京石门支行"}, {
        "bankcode": "102100004855",
        "bankname": "中国工商银行股份有限公司北京复外支行"
    }, {"bankcode": "102100004880", "bankname": "中国工商银行股份有限公司北京大栅栏支行"}, {
        "bankcode": "102100004919",
        "bankname": "中国工商银行股份有限公司北京陶然亭支行"
    }, {"bankcode": "102100004927", "bankname": "中国工商银行股份有限公司北京阜外大街支行"}, {
        "bankcode": "102100004935",
        "bankname": "中国工商银行股份有限公司北京四道口支行"
    }, {"bankcode": "102100004960", "bankname": "中国工商银行股份有限公司北京海淀支行营业部"}, {
        "bankcode": "102100004978",
        "bankname": "中国工商银行股份有限公司北京马家堡支行"
    }, {"bankcode": "102100004986", "bankname": "中国工商银行股份有限公司北京九棵树支行"}, {
        "bankcode": "102100005307",
        "bankname": "中国工商银行股份有限公司北京体育场支行"
    }, {"bankcode": "102100005331", "bankname": "中国工商银行股份有限公司北京运河迎宾支行"}, {
        "bankcode": "102100005340",
        "bankname": "中国工商银行股份有限公司北京东长安街支行"
    }, {"bankcode": "102100010022", "bankname": "中国工商银行股份有限公司票据营业部北京分部"}, {
        "bankcode": "102100001910",
        "bankname": "中国工商银行股份有限公司北京香河园支行"
    }, {"bankcode": "102100000030", "bankname": "中国工商银行股份有限公司北京市分行营业部"}, {
        "bankcode": "102100000089",
        "bankname": "中国工商银行股份有限公司北京南苑支行"
    }, {"bankcode": "102100000136", "bankname": "中国工商银行股份有限公司北京德外支行"}, {
        "bankcode": "102100000177",
        "bankname": "中国工商银行股份有限公司北京房山支行城关分理处"
    }, {"bankcode": "102100000281", "bankname": "中国工商银行股份有限公司北京西四支行"}, {
        "bankcode": "102100000345",
        "bankname": "中国工商银行股份有限公司北京朝阳支行"
    }, {"bankcode": "102100002669", "bankname": "中国工商银行股份有限公司北京房山支行二六六分理处"}, {
        "bankcode": "102100014873",
        "bankname": "中国工商银行股份有限公司北京回龙观西区支行"
    }, {"bankcode": "102100020044", "bankname": "中国工商银行股份有限公司北京范家胡同支行"}, {
        "bankcode": "102100020331",
        "bankname": "中国工商银行股份有限公司北京北三环支行"
    }, {"bankcode": "102100020487", "bankname": "中国工商银行股份有限公司北京白家庄支行"}, {
        "bankcode": "102100020680",
        "bankname": "中国工商银行股份有限公司北京团结湖支行"
    }, {"bankcode": "102100020868", "bankname": "中国工商银行股份有限公司北京光华路支行"}, {
        "bankcode": "102100023624",
        "bankname": "中国工商银行股份有限公司北京交大东路支行"
    }, {"bankcode": "102100024078", "bankname": "中国工商银行股份有限公司北京二里庄支行"}, {
        "bankcode": "102100024537",
        "bankname": "中国工商银行股份有限公司北京四季青支行"
    }, {"bankcode": "102100024914", "bankname": "中国工商银行股份有限公司北京鹿港支行"}, {
        "bankcode": "102100025177",
        "bankname": "中国工商银行股份有限公司北京北洼路支行"
    }, {"bankcode": "102100025388", "bankname": "中国工商银行股份有限公司北京安华支行"}, {
        "bankcode": "102100026856",
        "bankname": "中国工商银行股份有限公司北京北环西路支行"
    }, {"bankcode": "102100004197", "bankname": "中国工商银行股份有限公司北京建国路支行"}, {
        "bankcode": "102100004898",
        "bankname": "中国工商银行股份有限公司北京昌平支行"
    }, {"bankcode": "102100004951", "bankname": "中国工商银行总行营业部"}, {
        "bankcode": "102100005001",
        "bankname": "中国工商银行股份有限公司牡丹卡中心"
    }, {"bankcode": "102100005374", "bankname": "中国工商银行股份有限公司北京首都体育馆支行"}, {
        "bankcode": "102100000370",
        "bankname": "中国工商银行股份有限公司北京广渠路支行"
    }, {"bankcode": "102100000827", "bankname": "中国工商银行股份有限公司北京青塔支行"}, {
        "bankcode": "102100000337",
        "bankname": "中国工商银行股份有限公司北京长安支行"
    }, {"bankcode": "102100009607", "bankname": "中国工商银行股份有限公司北京祥普支行"}, {
        "bankcode": "102100018643",
        "bankname": "中国工商银行股份有限公司北京万寿路南口支行"
    }, {"bankcode": "102100020989", "bankname": "中国工商银行股份有限公司北京王府井支行"}, {
        "bankcode": "102100021836",
        "bankname": "中国工商银行股份有限公司北京甘石桥支行"
    }, {"bankcode": "102100008034", "bankname": "中国工商银行股份有限公司北京大都市支行"}, {
        "bankcode": "102100023962",
        "bankname": "中国工商银行股份有限公司北京索家坟支行"
    }, {"bankcode": "102100028313", "bankname": "中国工商银行股份有限公司北京花园桥支行"}, {
        "bankcode": "102100033634",
        "bankname": "中国工商银行股份有限公司北京上地支行"
    }, {"bankcode": "102100004943", "bankname": "中国工商银行股份有限公司北京十里河支行"}]
});