<!-- 子组件   -->
<template>
	<div class="datanull" :style="{'paddingTop':top,'paddingBottom':bottom}">
		<div class="msg fts-big">{{msg?msg:'暂无数据'}}</div>
		<div class="slot"><slot></slot></div>
	</div>
</template>

<script>
	export default {
		props: {
	      msg: String,
	      top: {
	        type: String,
	        default: '150px'
	      },
	      bottom: {
	        type: String,
	        default: '0'
	      },
	    },
	}
</script>
<style lang="less" scoped>
	@import "../../assets/styles/components/datanull.less";
</style>