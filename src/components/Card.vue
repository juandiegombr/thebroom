<template>
<div class="card"
	:class="{'selected': card.selected, 'mobile': device === 'smartphone' && card.player !== 'player'}"
	:style="cardStyle">
		<div class="card-front" 
			:class="{
				'face-down': card.facedDown,
				'selected': card.selected}"
				@click="moveCard">
			<div class="card-border" :class="`${suitColor}-color`">
				<span class="card-value">
					{{card.value}}
				</span>
				<span class="card-value-down">
					{{card.value}}
				</span>
			</div>
		</div>
		<div class="card-back" :class="{'face-down': card.facedDown}">
			<img :src="back" alt="back">
		</div>
	</div>
</template>

<script>
import back from '@/assets/back.svg'

import { mapState } from 'vuex'

export default {
	name: 'Card',

	props: {
		card: {
			type: Object,
			required: true
		}
	},

	computed: {
		...mapState(['playerCards', 'dealerCards', 'commonCards', 'device']),

		suitColor () {
			const colors = {
				heart: 'red',
				sword: 'blue',
				gold: 'yellow',
				wood: 'green'
			}
			return colors[this.card.suit]
		},

		playersCards () {
			return this.playerCards.length + this.dealerCards.length
		},

		commonCardsInitialPosition () {
			if (this.isSmartphone) {
				if (this.commonCards.length > 4) {
					if (this.card.positionIndex < 4) {
						return ((4 / 2 * 6) + (4 - 1) / 2) * 0.8 + 0.6
					} else {
						return (((this.commonCards.length - 4) / 2 * 6) + (this.commonCards.length - 4 - 1) / 2) * 0.8 + 0.6
					}
				}
				return ((this.commonCards.length / 2 * 6) + (this.commonCards.length - 1) / 2) * 0.8 + 0.6
			}
			return ((this.commonCards.length / 2 * 6) + (this.commonCards.length - 1) / 2)
		},

		positionLeftGap () {
			const positionsLeftGap = {
				dealerDeck: 0,
				playerDeck: 0,
				deck: 3,
				common: this.commonCardsInitialPosition,
				dealer: this.device === 'smartphone' ? 8.6 : 10,
				player: 10
			}
			return positionsLeftGap[this.card.position]
		},

		gapBetweenCards () {
			const playingCardsPositions = ['dealer', 'player', 'common']
			if (this.device === 'smartphone') {
				if (this.card.position === 'player') {
					return 7
				}
				if (this.card.position === 'dealer' || this.card.position === 'common') {
					return 7 * 0.8
				}
				return 0.1
			}
			if (playingCardsPositions.includes(this.card.position)) {
				return 7
			}
			return 0.1
		},

		isSmartphone () {
			return this.device === 'smartphone'
		},
		
		isCommon () {
			return this.card.position === 'common'
		},
		
		cardStyle () {
			if (this.isSmartphone && this.isCommon) {
				let position = this.card.positionIndex
				if (position > 3) {
					position = position - 4
					return {
						top: `calc(${this.positions[this.card.position].top}% + 3.5rem)`,
						left: `calc(${this.positions[this.card.position].left}% - ${this.positionLeftGap - this.gapBetweenCards * position}rem)`,
						zIndex: position
					}
				}
				return {
					top: `calc(${this.positions[this.card.position].top}% - 4.5rem)`,
					left: `calc(${this.positions[this.card.position].left}% - ${this.positionLeftGap - this.gapBetweenCards * this.card.positionIndex}rem)`,
					zIndex: this.card.positionIndex
				}
			}
			return {
				top: `calc(${this.positions[this.card.position].top}% - 4.5rem)`,
				left: `calc(${this.positions[this.card.position].left}% - ${this.positionLeftGap - this.gapBetweenCards * this.card.positionIndex}rem)`,
				zIndex: this.card.positionIndex
			}
		}
	},

	watch: {
		commonCards (newCommonCards) {
			if (this.card.player !== 'common') return
			if (this.isSmartphone) {
				if (newCommonCards.length > 4) {
					this.positions.common.top = 30
				} else {
					this.positions.common.top = 40
				}
			}
		},

		device (newValue) {
			const mobilePositions = {
				deck: {top: 50, left: -40},
				common: {top: 40, left: 50},
				dealer: {top: 10, left: 50},
				dealerDeck: {top: 10, left: -40},
				player: {top: 70, left: 50},
				playerDeck: {top: 70, left: 140}
			}
			const regularPositions = {
				deck: {top: 50, left: 10},
				common: {top: 50, left: 50},
				dealer: {top: 20, left: 50},
				dealerDeck: {top: 20, left: 20},
				player: {top: 80, left: 50},
				playerDeck: {top: 80, left: 80}
			}
			if (newValue === 'smartphone') {
				console.log('smartphone')
				this.positions = mobilePositions
			} else {
				this.positions = regularPositions
			}
		}
	},

	methods: {
		moveCard () {
			if (this.card.selected) {
				this.$store.commit('deselectCard', this.card)
			} else {
				this.$store.commit('selectCard', this.card)
			}
		}
	},

	created () {
		const mobilePositions = {
			deck: {top: 50, left: -40},
			common: {top: 40, left: 50},
			dealer: {top: 10, left: 50},
			dealerDeck: {top: 10, left: -40},
			player: {top: 70, left: 50},
			playerDeck: {top: 70, left: 140}
		}

		if (window.outerWidth < 500) {
			this.positions = mobilePositions
		}
	},

	data () {
		return {
			back,
			cardSelected: false,
			positions: {
				deck: {top: 50, left: 10},
				common: {top: 50, left: 50},
				dealer: {top: 20, left: 50},
				dealerDeck: {top: 20, left: 20},
				player: {top: 80, left: 50},
				playerDeck: {top: 80, left: 80}
			}
		}
	}
}
</script>

<style lang="scss" scoped>

.card {
	user-select: none;
	position: absolute;
	cursor: pointer;
	height: 9rem;
	width: 6rem;
	justify-self: center;
	align-self: center;
	transition: all .8s;

	&.mobile {
		transform: scale(0.8);
	}
	
	.selected {
		transform: scale(1.1) !important;
		box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.23), 0 0 8px 3px rgba(255, 255, 255, 0.23), 0 0 4px 3px rgba(255, 255, 255, 0.23);
	}
	
	&-value {
		position: absolute;
    font-size: 1.5rem;
		font-weight: 700;
    top: 0.1rem;
    left: 0.4rem;
	}

	&-value-down {
		position: absolute;
    font-size: 1.5rem;
		font-weight: 700;
		bottom: 0.1rem;
		right: 0.4rem;
		transform: rotate(180deg)
	}
}

.card-border {
	width: 100%;
	height: 100%;
	border: 1px solid currentColor;
	border-radius: 0.3rem;
	box-sizing: border-box;
	position: relative;
}

.card-front {
	position: absolute;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 8%;
	background-color: white;
	border-radius: .5rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
	backface-visibility: hidden;
	transform: rotateY(0deg);
	transition: all .4s;
	
	&.face-down {
		transform: rotateY(180deg);
		backface-visibility: hidden;
		z-index: 9;
	}
	
	&.matched {
		transform: rotateY(0deg);
		backface-visibility: hidden;
		z-index: 9;
	}
	
	.suit-wrapper {
		position: absolute;
		left: 10%;
		top: 6%;
		width: 30%;
		height: 100%;
	}
}

.card-back {
	cursor: auto;
	position: absolute;
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	padding: 0;
	background-color: white;
	border-radius: .5rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	// box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
	transform: rotateY(180deg);
	backface-visibility: hidden;
	transition: all .4s;

	img {
		width: 100%;
		height: 100%;
	}
	
	&.face-down {
		transform: rotateY(0deg);
		z-index: 9;
	}
	
	&.matched {
		transform: rotateY(180deg);
		z-index: 9;
	}

}
</style>
