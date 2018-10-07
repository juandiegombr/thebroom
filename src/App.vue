<template>
	<div id="app">
		<TheGameArea/>
		<Menu/>
		<ThePlayButton/>
		<TheCards/>
		<Results/>
	</div>
</template>

<script>
import TheGameArea from '@/components/TheGameArea'
import TheCards from '@/components/TheCards'
import ThePlayButton from '@/components/ThePlayButton'
import CardPositionMark from '@/components/CardPositionMark'
import Menu from '@/components/Menu'
import Results from '@/components/messages/Results'
// import MessageBroom from '@/components/messages/MessageBroom'
import { mapState } from 'vuex'
export default {
	name: 'app',
	computed: {
		...mapState(['status', 'turn', 'deal', 'deck', 'playerCards', 'dealerCards']),
		test () {
			return this.$store.state.restart
		},
		playersCards () {
			return this.playerCards.length + this.dealerCards.length
		}
	},
	watch: {
		playersCards (value) {
			if (!value && !this.test && this.status !== 'finished') {
				this.$store.dispatch('startDeal')
			}
		},
		restart (value) {
			console.log(value, this.playersCards)
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
	},
	mounted () {
		window.addEventListener('resize', this.handleWindowResize)
		this.handleWindowResize()
		this.$store.dispatch('startBroomGame')
	},
	components: {
		Menu,
		TheCards,
		CardPositionMark,
		TheGameArea,
		ThePlayButton,
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
	// font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
.game-area {
	display: grid;
	box-sizing: border-box;
	height: 100%;
	padding: 60px;
	grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
	grid-template-rows: 25% 25% 25% 25%;
	justify-content: center;
	align-items: center;
}
</style>
