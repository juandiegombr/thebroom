<template>
	<div class="menu-wrapper" :class="{'shadow': showMenu}" @click.stop="show">
		<i class="fas fa-cog help-icon" @click.stop="show"></i>
        <transition name="menu">
            <div v-if="showMenu" class="menu" @click.stop="show('inside')">
                Menu
            </div>
        </transition>
	</div>
</template>

<script>
export default {
    name: 'TheMenu',
    methods: {
        show (place) {
            if (place === 'inside') return
            if (this.showMenu) {
                this.showMenu = false
                return
            }
            this.showMenu = !this.showMenu
        },
    },
    data () {
        return {
            showMenu: false
        }
    }
}
</script>
<style lang="scss">
.menu-wrapper {
    position: relative;
    pointer-events: none;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    transition: all 1s;
    &.shadow {
        background-color: rgba(0,0,0,0.8);
        pointer-events: auto;
    }
    .menu {
        position: absolute;
        margin: auto;
        top: 6rem;
        bottom: 6rem;
        left: 6rem;
        right: 6rem;
        background: linear-gradient(135deg, #52b152 1%, #008a00 49%, #005700 100%);
        z-index: 999;
    }
    .help-icon {
        pointer-events: auto;
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
    .menu-enter-active {
        transition: all 1s ease-in-out
    }
    .menu-leave-active {
        transition: all 1s ease-in-out
    }
    .menu-enter {
        transform: translateX(-100vw);
        // opacity: 0;
    }
    .menu-leave-to {
        transform: translateX(-100vw);
        // opacity: 0;

    }
}
</style>
