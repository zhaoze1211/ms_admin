<template>
	<div class="my_order">
		<div class="xv-block10 orderBox pd-top10 pd-bottom10 pd-left">
		  <el-row :gutter="10">
		  	<el-col :span='5'>
		  		<div class="orderId" v-if="showaction=== 0">
		  			<div>
		  				{{orderId}}
			  		</div>
					<div>
						{{createTime|formatTime}}
					</div>
		  		</div>
		  		&nbsp;
		  	</el-col>
		    <el-col :span="4">
		      <div>
		         {{title}} <br />
		         规格：{{skuStr}}
		      </div>
		    </el-col>
		    <el-col :span="3">
		      <div class="text-center pd-bottom10">
		        <div>
		          ￥{{nowPrice|formatPrice}}({{count}}件)
		        </div>
		      </div>
		    </el-col>
		    <el-col :span="2">
		      <div class="text-center order_status" v-if="showaction=== 0">
		        {{customerService=='退款中'?'退款中':''}}
		      </div>
		      &nbsp
		    </el-col>
		    <el-col :span="2" v-if="showaction=== 0">
		      <div class="text-center address_mount">
		        {{addressName}}<br />
		        {{addressPhone}}
		      </div>
		    </el-col>
		    <el-col :span="3" v-if="showaction=== 0">
		      <div class="text-center oder_mount">
		        ￥{{payAmount|formatPrice}} <br />
		        （含运费:{{logistic_fee|formatPrice}}）
		      </div>
		    </el-col>
		    <el-col :span="3" v-if="showaction=== 0">
		      <div class="text-center order_status">
		        {{adStatus}}
		      </div>
		      &nbsp
		    </el-col>
		    <el-col :span="2" v-if="showaction=== 0">
		      <div class="pd-left pd-right pd-10 btn">
		        <div class="text-center order_tips">
		          <!--<span @click='tolook'>查看详情</span>-->
		          <a :href="getTitleHref" target="_blank">查看详情</a>
		        </div>
		      </div>
		    </el-col>
		  </el-row>
		</div>
	</div>
</template>

<script>
  export default {
    props: {
    	id:[String,Number],
    	orderId:[String,Number],
    	createTime:[String,Number],
    	customerService:String,
    	orderTime:[String,Number],
    	orderNum:[String,Number],
    	title:String,
    	prePrice:[String,Number],
    	nowPrice:[String,Number],
    	count:[String,Number],
    	payAmount:[String,Number],
    	adStatus:String,
    	btnText:String,
    	btnHide:Boolean,
    	addressName:[String,Number],
    	addressPhone:[String,Number],
    	skuStr:String,
    	showaction:Number,
    	logistic_fee:[String,Number]

    },
    data() {
      return {
      }
    },
    mounted: function() {
        this.$nextTick(function() {

        })
     },
    methods: {
    	toCancel(){
    		let orderDetail = {
	          "orderNum": this.orderNum,
	          "adStatus": this.adStatus,
	          "btnText":this.btnText
	        };
    		this.$emit("toCancel", orderDetail);
    	},
    	toHandle(){
    		let orderDetail = {
	          "orderNum": this.orderNum,
	          "adStatus": this.adStatus,
	          "btnText":this.btnText
	        };
    		this.$emit("toHandle", orderDetail);
    	},
    	toCollect(){
    		let orderDetail = {
	          "orderNum": this.orderNum,
	          "adStatus": this.adStatus,
	          "btnText":this.btnText
	        };
    		// 去确认收货
    		this.$emit("toCollect", orderDetail);
    	},
    	tolook(){
    		let orderDetail = {
	          "orderNum": this.orderNum,
	          "adStatus": this.adStatus,
	          "btnText":this.btnText
	       	};
    		this.$emit("tolook", orderDetail);
    	}
    },
	computed: {
	    getTitleHref: function() {
	    	let orderDetail = {
	          "orderNum": this.orderNum,
	          "adStatus": this.adStatus,
	          "btnText":this.btnText
	       	};
	        return  "#/order/toLookOrder/" + orderDetail.orderNum
	    }
	},
    components: {
      "elRow": require("../../components/row/row.vue"),
      "elCol": require("../../components/col/col.vue"),
      "rButton": require('../../components/button/button.vue'),

    }
  };
</script>
<style lang="less">
.my_order{


	.rightTitle{
		height: 40px;

		.tab-first{
			border-left: 3px solid #e84555;
		}

	}
	.orderBox{

		img{
			width: 100%;
			height: 100%;
		}
		.orderTitle{
			overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 3;
	    margin-left: 65px;
	    height: 100%;
		}
		.pre-price{
			text-decoration: line-through;
			color: #7e7d7d;
		}
		.order_status{
			color: #e84555;
		}
		.order_tips > span{
			color: #3333FF;
			cursor: pointer;
		}
	}

}


</style>