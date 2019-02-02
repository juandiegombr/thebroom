<template>
	<div class="cards-wrapper">
		<Card v-for="(card, index) in deck" :key="index" :card="card"/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'

export default {
	name: 'cards-wrapper',
	computed: {
		...mapState(['deck'])
	},
	components: {
		Card
	}
}
</script>

<style lang="scss" scoped>
	.cards-wrapper {
		position: absolute;
		height: 100%;
		width: 100vw;
		overflow: hidden;
	}
</style>
