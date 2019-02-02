<template>
	<div id="app">
		<GameArea/>
		<Menu/>
		<PlayButtons/>
		<CardsWrapper/>
		<Results/>
	</div>
</template>

<script>
import GameArea from '@/components/GameArea'
import CardsWrapper from '@/components/CardsWrapper'
import PlayButtons from '@/components/PlayButtons'
import CardPositionMark from '@/components/CardPositionMark'
import Menu from '@/components/Menu'
import Results from '@/components/Results'

import { mapState } from 'vuex'

export default {
	name: 'app',

	computed: {
		...mapState(['restart', 'status', 'turn', 'deal', 'deck', 'playerCards', 'dealerCards']),

		playersCards () {
			return this.playerCards.length + this.dealerCards.length
		}
	},

	watch: {
		playersCards (value) {
			if (!value && !this.restart && this.status !== 'finished') {
				this.$store.dispatch('startDeal')
			}
		}
	},

	methods: {
		handleWindowResize() {
			if (window.innerWidth < 480) {
				this.$store.commit('resize', 'smartphone')
			}
			else if (window.innerWidth >= 480 && window.innerWidth < 768) {
				this.$store.commit('resize', 'tablet')
			}
			else if (window.innerWidth >= 768) {
				this.$store.commit('resize', 'desktop')
			}
			return this.screenSize;
		},

		initServiceWorker () {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${process.env.BASE_URL}serviceworker.js`)
          .then(registration => {})
      } else {
        console.log('Your navigator is NOT prepared to use Service Workers')
      }
		}
		
	},

	created () {
		this.initServiceWorker()
	},

	mounted () {
		window.addEventListener('resize', this.handleWindowResize)
		this.handleWindowResize()
		this.$store.dispatch('startBroomGame')
	},
	
	components: {
		Menu,
		CardsWrapper,
		CardPositionMark,
		GameArea,
		PlayButtons,
		Results
	}
}
</script>

<style lang="scss">

html {
	font-size: 16px;
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;

	@media (max-height: 768px) {
		font-size: calc(10px + 0.5vh)
	}
}

body {
	margin: 0;
	width: 100vw;
	height: 100%;
	overflow: hidden;
}

button {
	font-family: 'Montserrat', 'sans-serif';

	&:focus {
		outline: none
	}
}

#app {
	font-family: 'Montserrat', 'sans-serif';
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100%;
	overflow: hidden;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

</style>
