<template>
	<div class="menu-wrapper" :class="{'shadow': showMenu}" @click.stop="show">
		<i class="far fa-question-circle help-icon" @click.stop="show"></i>
        <transition name="menu">
            <div v-if="showMenu" class="menu" @click.stop="show('inside')">
		        <i class="fas fa-times close-icon" @click.stop="show"></i>
                <h1>Start a new game</h1>
                <div class="menu__buttons-wrapper">
                    <button class="menu__button" @click="newGame(15)">
                        15pt
                    </button>
                    <button class="menu__button" @click="newGame(25)">
                        25pt
                    </button>
                    <button class="menu__button" @click="newGame(40)">
                        40pt
                    </button>
                </div>
                <h1>Rules</h1>
                <div class="menu__rules">
                    <p>The game starts with 3 cards to each player and 4 common cards.</p>
                    <p>The rules are simple. Just sum 15!</p>
                    <p>To achieve that properly, you need to choose one of your cards and all cards you need from the common cards.</p>
                    <p>Direct points:</p>
                    <ul>
                        <li>Broom: + 1 Point - You need to use all the common cards.</li>
                        <li>Seven Gold: This is the best card. If you get this, you win 1 point.</li>
                    </ul>
                    <p>Better cards:</p>
                    <ul>
                        <li>Sevens: If you get more 7s than the dealer, you'll win 1 point.</li>
                        <li>Golds: This suit is better than the others. If you get more golden cards, you'll win 1 point.</li>
                        <li>Cards: Simple, if you get more cards, you'll win 1 point.</li>
                    </ul>
                </div>

                <div class="menu__footer">
                    <a href="https://github.com/juandiegombr/thebroom" target="_blank"><i class="fab fa-github fa-left"></i>Github repository</a>
                    <p>Built with <span class="text-vue">Vue</span> by 
                        <a href="https://www.linkedin.com/in/juandiego-martin/">Juan Diego Martín</a>
                    </p>
                    <p>Powered by ServiceWorker <i class="fas fa-cog"></i></p>
                </div>
            </div>
        </transition>
	</div>
</template>

<script>
export default {
    name: 'the-menu',

    methods: {
        show (place) {
            if (place === 'inside') return
            this.showMenu = !this.showMenu
        },

        newGame (points) {
            this.$store.dispatch('resetGame', points)
            this.showMenu = false
        }
    },

    data () {
        return {
            showMenu: true
        }
    }
}
</script>

<style lang="scss" scoped>

.menu-wrapper {
    position: relative;
    pointer-events: none;
    width: 100vw;
    height: 100%;
    z-index: 999;
    transition: all 1s;

    &.shadow {
        background-color: rgba(0,0,0,0.5);
        pointer-events: auto;
    }
    
    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        color: white;
        box-sizing: border-box;
        z-index: 999;
        padding: 2rem;
        font-size: .9rem;
        background: linear-gradient(135deg, #0c2430 1%, #0c2430 49%, #0c2430 100%);
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;
        
        @media (min-width: 576px) {
            width: 60%;
            padding: 3rem;
            font-size: 1rem;
        }

        &__buttons-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 1rem;
            margin-bottom: 1rem;
        }

        &__button {
            user-select: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1.2rem;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0);
            border: 0.1rem solid white;
            font-weight: 700;
            width: 100%;
            font-size: 17px;
            color: rgb(186, 186, 186);
            box-sizing: border-box;
            // box-shadow: 0 3px 0 0 rgba(0,0,0,.25);
            transition: all .5s;
        }

        &__rules {
            border: 1px solid white;
            border-radius: 1.2rem;
            padding: 1.2rem;
            text-align: left;
            max-height: 30%;
            overflow: scroll;

            p:first-child {
                margin-top: 0;
            }

            ul:last-child {
                margin-bottom: 0;
            }

            @media (min-width: 576px) {
                padding: 2rem;
            }
        }

        &__footer {
            position: absolute;
            bottom: 1rem;

            a {
                color: white;
                text-decoration: none;
            }
        }
    }

    .close-icon {
        pointer-events: auto;
        position: fixed;
        top: 2rem;
        left: 2rem;
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all .2s;
        z-index: 9;

        &:hover {
        color: rgba(255, 255, 255, 0.5);
        transform: scale(1.2);
        }
    }

    .help-icon {
        pointer-events: auto;
        position: fixed;
        top: 3rem;
        left: 3rem;
        font-size: 2rem;
        color: rgba(255, 212, 20, 0.2);
        cursor: pointer;
        transition: all .2s;
        z-index: 9;

        &:hover {
        color: rgba(255, 212, 20, 0.5);
        transform: scale(1.2);
        }
    }

    .menu-enter-active {
        transition: all 1s ease-in-out
    }
    
    .menu-leave-active {
        transition: all 1s ease-in-out
    }
    
    .menu-enter {
        transform: translateX(-100vw);
    }
    
    .menu-leave-to {
        transform: translateX(-100vw);
    }

    .text-vue {
        color: #4fc08d;
        font-weight: 700;
    }

    .fa-left {
        margin-right: .5rem;
    }

    .fa-cog {
        animation: cog-spin 3s linear infinite;
    }

    @keyframes cog-spin {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
}
</style>
