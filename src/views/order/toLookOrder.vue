<template>
  <div class="to_look_order">
    <div class="">
      <div class="order_big_right">
        <div class="rightTitle bg-gray pd-top10 pd-bottom10 pd-left pd-right">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="tab-first">订单状态</div>
            </el-col>
            <el-col :span="16">
              &nbsp;
            </el-col>
            <el-col :span="4">
              <div class="text-right" @click='toLookAllOrder' style="cursor: pointer;">
                返回订单列表　>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="pd">
          当前订单状态：{{adStatusView(result.order_status).httxt}}
          <span style="color: #e31c2f;">
                 			{{result.refund_status=="退款中"?',退款中':''}}
                 		</span>
        </div>
        <div style='background-color: gainsboro;' class="pd-left10 pd-top10 pd-bottom10">
          订单信息
        </div>
        <div class="layout-body pd-left10 pd-top">
          <dl class="grid01 float-left pd-bottom">
            <dd>订单编号： {{result.order_id}}</dd>
            <dd>订单来源： 商城订单</dd>
            <dd>买家姓名： {{result.address_name}}</dd>
            <dd>联系方式： {{result.address_phone}}</dd>
            <dd>收货信息： {{result.address}}</dd>
            <dd>配送时间： {{result.distribution}}</dd>
            <dd>发票名称： {{result.invoice_type==1?"个人":result.invoice_name}}</dd>
            <div v-if='adStatusView(result.order_status).httxt=="等待买家收货"||adStatusView(result.order_status).httxt=="交易完成"'>
              <dd>物流公司： {{result.logistics_company_name}}</dd>
              <dd>物流单号： {{result.logistics_num}}</dd>
            </div>

          </dl>
					<dl class="grid01 float-right pd-right">
            <dd v-if='result.create_time'>下单时间：    {{result.create_time=='1980-01-01 00:00:00'?'':result.create_time}}</dd>
            <dd v-if='result. pay_time'>付款时间：   {{result. pay_time=='1980-01-01 00:00:00'?"":result. pay_time}}</dd>
            <dd v-if='result.deliver_time'>发货时间：    {{result.deliver_time=='1980-01-01 00:00:00'?"":result.deliver_time}}</dd>
            <dd v-if='result.confirm_receive_time'>收货时间：    {{result.confirm_receive_time=='1980-01-01 00:00:00'?"":result.confirm_receive_time}}</dd>
          </dl>
          <!-- 商品信息 -->
          <div class="grid01">
            <table width="100%">
              <tbody>
                <tr>
                  <th width="35%">
                    商品名称
                  </th>
                  <th width="20%">商品名称</th>
                  <th width="15%">单价（元）</th>
                  <th>数量</th>
                  <th width="15%">小计</th>
                  <th width="10%">运费</th>
                </tr>
                <tr v-for='item in result.xvporderitems'>
                  <td> <span :title="item.product_name">{{item.product_name}}</span>
                  </td>
                  <td>
                    {{item.sku_str}}
                  </td>
                  <td>
                    ￥{{item.price|formatPrice}}
                  </td>
                  <td>{{item.item_count}}</td>
                  <td>
                    ￥{{item.price*item.item_count|formatPrice}}
                  </td>
                  <td>
                    {{item.logistic_fee|formatPrice}}
                  </td>
                </tr>
                <tr>
                  <td class="tr" colspan="6">
                    <ul class="user-order-total">
                      <li>&nbsp;商品总价：<span class="total-price">￥{{result.items_total_fee|formatPrice}}</span></li>
                      <li>已优惠：<span class="total-price">-￥{{result.seller_discount_fee|formatPrice}}</span></li>
                      <li>运费合计：<span class="total-price">￥{{result.logistic_fee|formatPrice}}</span></li>
                      <li>实收金额：<span class="fs14 total-price">￥{{result.pay_amount|formatPrice}}</span></li>
                    </ul>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../libs/utils.js';
  import constants from '../../libs/constants.js';
  export default {
    data() {
        return {
          result: {}
        }
      },
      mounted: function() {
        this.$nextTick(function() {
          let that = this;
          utils.ajax({
            url: "/seller/order/get",
            data: {
              "order_id": that.$route.params.id
            },
            success: function(res) {
              if(res.result) {
                that.result = res.result;
              }
            }
          });
        })
      },
      methods: {
        adStatusView(state) {
          return constants.adStatusView(state);
        },
        toLookAllOrder() {
          // 查看全部订单
          utils.go('/order/orderList', this.$router);
        },
        goUrl(url) {
          let that = this;
          utils.go(url, that.$router);

        }
      },
      computed: {
        navAct() {
          return this.$route.path;
        },
      },
      components: {
        "elMenu": require('../../components/menu/menu.vue'),
        "elSubmenu": require('../../components/menu/submenu.vue'),
        "elMenuItem": require('../../components/menu/menu-item.vue'),
        "elMenuItemGroup": require('../../components/menu/menu-item-group.vue'),
        "rButton": require('../../components/button/button.vue'),
        "elRow": require("../../components/row/row.vue"),
        "elCol": require("../../components/col/col.vue"),
        "elPagination": require('../../components/pagination/pagination.vue'),
      }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/styles/views/toLookOrder.less";
  
</style>