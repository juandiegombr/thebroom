<template>
	<div class="card-position-mark"
		:class="{'mobile': isMobile && isDealer}"
		:style="positionStyle">
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'CardPositionMark',
	props: {
		positionIndex: {
			type: Number,
			required: true
		},
		position: {
			type: String,
			required: true
		}
	},
	computed: {
		...mapState(['device']),
		isMobile () {
			return this.device === 'smartphone'
		},
		isDealer () {
			return this.position === 'dealer'
		},
		positionStyle () {
			if (this.isMobile && this.isDealer) {
				return {
					top: `calc(${this.positions[this.position].top}% - 4.5rem)`,
					left: `calc(${this.positions[this.position].left}% - ${8.6 - 7 * 0.8 * this.positionIndex}rem)`
				}
			}
			return {top: `calc(${this.positions[this.position].top}% - 4.5rem)`, left: `calc(${this.positions[this.position].left}% - ${10 - 7 * this.positionIndex}rem)`}
		}
	},
	created () {
		const mobilePositions = {
			deck: {top: 50, left: -40},
			common: {top: 50, left: 50},
			dealer: {top: 10, left: 50},
			dealerDeck: {top: 20, left: -40},
			player: {top: 70, left: 50},
			playerDeck: {top: 80, left: 140}
		}
		if (window.innerWidth < 500) {
			this.positions = mobilePositions
		}
	},
	data () {
		return {
			positions: {
				deck: {top: 20, left: 5},
				common: {top: 50, left: 50},
				dealer: {top: 20, left: 50},
				dealerDeck: {top: 20, left: 80},
				player: {top: 80, left: 50},
				playerDeck: {top: 80, left: 80}
			}
		}
	}
}
</script>

<style lang="scss">
.card-position-mark {
	position: absolute;
	cursor: pointer;
	height: 9rem;
	width: 6rem;
	justify-self: center;
	align-self: center;
	transition: all .5s;
	border-radius: 10px;
	border: 0.1rem solid rgba(255, 212, 20, 0.2);
	box-sizing: border-box;
	z-index: -1;
	&.mobile {
		transform: scale(0.8)
	}
}
</style>
