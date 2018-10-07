<template>
<div class="card"
	:class="{'selected': card.selected, 'mobile': device === 'smartphone' && card.player !== 'player'}"
	:style="cardStyle">
		<div class="card-front" :class="{'face-down': card.facedDown, 'selected': card.selected}" @click="moveCard">
			<!-- <div class="suit-wrapper">
				<component :is="card.suit"/>
			</div> -->
			<span :class="`card-value ${suitColor}-color`">
				{{card.value}}
			</span>
		</div>
		<div class="card-back" :class="{'face-down': card.facedDown}">
			<div class="card-back-design"></div>
			<div class="card-back-corners-top"></div>
			<div class="card-back-corners-bottom"></div>
		</div>
	</div>
</template>

<script>
// import Sword from './Suits/Sword'
// import Gold from './Suits/Gold'
// import Wood from './Suits/Wood'
// import Heart from './Suits/Heart'

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
			// return (this.commonCards.length / 2 * 6) + (this.commonCards.length - 1) / 2
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
	},
	components: {
		// Sword,
		// Gold,
		// Wood,
		// Heart
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
		font-size: 55px;
	}
}
.card-front {
	position: absolute;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 10%;
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
	padding: 10%;
	background-color: white;
	border-radius: .5rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	// box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
	transform: rotateY(180deg);
	backface-visibility: hidden;
	transition: all .4s;
	&.face-down {
		transform: rotateY(0deg);
		z-index: 9;
	}
	&.matched {
		transform: rotateY(180deg);
		z-index: 9;
	}
	&-design {
		position: absolute;
		left: 15px;
		right: 15px;
		top: 15px;
		bottom: 15px;
		border-right: 5px solid rgb(8, 177, 76);
		border-top: 5px solid red;
		border-left: 5px solid rgb(255, 196, 0);
		border-bottom: 5px solid rgb(0, 136, 255);
		&::after {
			// content: '';
			position: absolute;
			top: 5px;
			bottom: 5px;
			left: 5px;
			right: 5px;
			border-right: 2px solid rgb(8, 177, 76);
			border-top: 2px solid red;
			border-left: 2px solid rgb(255, 196, 0);
			border-bottom: 2px solid rgb(0, 136, 255);
		}
	}
	&-corners-top {
		position: absolute;
		left: 15px;
		right: 15px;
		top: 15px;
		height: 5px;
		border-right: 5px solid rgb(255, 196, 0);
		border-left: 5px solid rgb(0, 136, 255);
	}
	&-corners-bottom {
		position: absolute;
		left: 15px;
		right: 15px;
		bottom: 15px;
		height: 5px;
		border-right: 5px solid red;
		border-left: 5px solid rgb(8, 177, 76);
	}
	.pulse-shadow {
		-webkit-animation:pulse-shadow 2s infinite!important;
		animation:pulse-shadow 2s infinite!important;
		z-index: 1;
	}

}
@keyframes pulse-shadow{
		0%{
				box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.0), 0 0 8px 3px rgba(255, 255, 255, 0.0), 0 0 4px 3px rgba(255, 255, 255, 0.0);
				/* border: 1px solid white; */
		}
		100%{
				box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.23), 0 0 8px 3px rgba(255, 255, 255, 0.23), 0 0 4px 3px rgba(255, 255, 255, 0.23);
				/* border: 1px solid white; */
		}
}
</style>
