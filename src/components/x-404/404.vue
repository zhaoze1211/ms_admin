<!-- 子组件   -->
<template>
	<div class="p404">
		<img src="../../assets/images/404.png"/>
		<div class="btn-bottom">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
	}
	require("../../assets/styles/components/datanull.less");
</script>