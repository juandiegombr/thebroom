<template>
	<div class="menu">
		<i class="fas fa-cog help-icon"></i>
	</div>
</template>

<script>
export default {
	name: 'Menu'
}
</script>
<style lang="scss">
.help-icon {
	position: fixed;
	bottom: 3rem;
	right: 3rem;
	font-size: 2rem;
	color: rgba(255, 212, 20, 0.2);
	cursor: pointer;
	transition: all .2s;
	z-index: 9;
	&:hover {
    color: rgba(255, 212, 20, 0.3);
    transform: rotate(50deg);
  }
}
</style>
