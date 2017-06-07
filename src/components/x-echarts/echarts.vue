<!-- 子组件   -->
<template>
	<div class="xecharts">
		<div :style="{height:height,width: width}" ref="echart"></div>
	</div>
</template>

<script>
	import echarts from 'echarts/dist/echarts.min.js';
	export default {
		mounted() {
			this.$nextTick(function () {
				let that = this;
				that.myChart = echarts.init(that.$refs.echart);
				that.myChart.setOption(that.option);
				that.$emit("echarts",that.myChart);
				$(window).resize(function(){
					that.myChart.resize();
				});
			});
		},
		props: {
			option:{
				type: Object,
				required:true
			},
			height:{
				type:String,
				default:"500px"
			},
			width:{
				type:String,
				default:"100%"
			}
		},
		data(){
			return{
				myChart:null
			}
		},
		watch:{
			option(newOption){
				if(this.myChart){
					this.myChart.clear();
					this.myChart.setOption(this.option);
				}
			}
		},
		destroyed(){
			$(window).unbind("resize");
		}

	}
</script>