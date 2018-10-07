<template>
	<div class="the-cards">
		<Card v-for="(card, index) in deck" :key="index" :card="card"/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
export default {
	name: 'TheCards',
	computed: {
		...mapState(['deck'])
	},
	components: {
		Card
	}
}
</script>

<style lang="scss">
	.the-cards {
		position: absolute;
		height: 100%;
		width: 100vw;
		overflow: hidden;
	}
</style>
