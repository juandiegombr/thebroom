<template>
	<div class="game-area" :class="{'mobile': device === 'smartphone'}">
		<div class="game-area__decoration" :class="{'mobile': device === 'smartphone'}"></div>
		<CardPositionMark v-for="index in [0,1,2]" :key="index + 999" :positionIndex="index" position="dealer"/>
		<CardPositionMark v-for="index in [0,1,2]" :key="index + 99 " :positionIndex="index" position="player"/>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import CardPositionMark from '@/components/CardPositionMark'

export default {
	name: 'game-area',

	computed: {
		...mapState(['device'])
	},

	components: {
		CardPositionMark
	}
}
</script>

<style lang="scss">

.game-area {
	box-sizing: border-box;
	position: fixed;
	width: 100%;
	height: 100%;
	padding: 2rem;
	background: #52b152; /* Old browsers */
	background: -moz-linear-gradient(-45deg, #52b152 1%, #008a00 49%, #005700 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(-45deg, #52b152 1%,#008a00 49%,#005700 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(135deg, #52b152 1%,#008a00 49%,#005700 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	z-index: -1;

	&.mobile {
		padding-top: 0;
	}
	
	&__decoration {
		position: relative;
		width: 100%;
		height: 100%;
		border: .1rem solid rgba(255, 212, 20, .2);
		border-radius: 1rem;

		&.mobile {
			border-top: none;
			border-radius: 0;
		
			&::before {
				border-top: none;
				border-radius: 0;
				top: 0;
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: .2rem;
			right: .2rem;
			top: .2rem;
			bottom: .2rem;
			border: .1rem solid rgba(255, 212, 20, .2);
			border-radius: 0.8rem;
		}
	}
}
</style>
