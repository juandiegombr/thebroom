<template>
  <transition name="balloon">
    <div
        v-if="show"
        class="hand-result"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 84.41">
            <g id="result-push">
            <path id="result-push-balloon" d="M219.83,112H80.17a4.12,4.12,0,0,0-4.11,4.11v50.11a4.12,4.12,0,0,0,4.11,4.11H139.8L150,188l10.2-17.67h59.63a4.12,4.12,0,0,0,4.11-4.11V116.11A4.12,4.12,0,0,0,219.83,112Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-white" />
            <g id="result-push-text">
                <path d="M96.7,145.78H87v13.45H84.28V123.16H97.37c7.94,0,13.4,4.07,13.4,11v.1C110.77,141.87,104.23,145.78,96.7,145.78Zm11.39-11.44c0-5.72-4.43-8.71-10.93-8.71H87v17.68h9.9c6.7,0,11.24-3.51,11.24-8.87Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-secondary" opacity="0.75"/>
                <path d="M131.73,159.8c-8.66,0-14.79-5.46-14.79-15.57V123.16h2.68V144c0,8.51,4.59,13.4,12.22,13.4,7.32,0,12-4.43,12-13.14V123.16h2.68v20.77C146.53,154.29,140.5,159.8,131.73,159.8Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-secondary" opacity="0.75"/>
                <path d="M167.6,159.75A20.54,20.54,0,0,1,153.07,154l1.75-2c4,3.66,7.63,5.36,12.94,5.36s9.12-3,9.12-7.16v-.1c0-3.81-2-6-10.21-7.68-8.66-1.75-12.16-4.69-12.16-10.15v-.1c0-5.36,4.9-9.48,11.6-9.48A18,18,0,0,1,178.48,127l-1.7,2.11A15.53,15.53,0,0,0,166,125.06c-5.31,0-8.81,3-8.81,6.8v.1c0,3.81,2,6.13,10.52,7.89,8.35,1.7,11.86,4.69,11.86,9.95v.1C179.56,155.73,174.56,159.75,167.6,159.75Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-secondary" opacity="0.75"/>
                <path d="M213,159.24V142.33H189.95v16.91h-2.68V123.16h2.68v16.7H213v-16.7h2.68v36.08Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-secondary" opacity="0.75"/>
            </g>
            </g>
        </svg>
      </div>
  </transition>
</template>

<script>
export default {
  components: {
  },
  props: {
    player: {
      type: String,
      required: false
    }
  },
  data () {
      return {
          show: false
      }
  },
  computed: {
    turn () {
      return this.$store.state.turn
    }
  },
  watch: {
    turn (value) {
      if (value === 'player')
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  },
  methods: {
      timer () {
          this.show = !this.show
      }
  },
  mounted () {
      // setInterval(this.timer, 2000)
  }
}
</script>

<style scoped>
.hand-result {
  position: absolute;
  width: 14rem;
  top: 15px;
  left: calc(50% - 7rem);
  text-align: center;
  z-index: 99;
}
.hand-result svg {
  width: 14rem;
}
.balloon-enter-active {
  animation: balloon-in ease-in-out .6s;
  transform-origin: 50% 100%;
}
.balloon-leave-active {
  transition: all 0.1s;
  transform-origin: 50% 100%;
}
.balloon-leave-to {
  transform: scale(0);
  opacity: 0;
}
@keyframes balloon-in {
  0% {
    transform: scale(0.00) skewX(0deg) rotate(-20deg);
  }
  40% {
    transform: scale(1.00) skewX(-5deg) rotate(10deg);
  }
  50% {
    transform: skewX(5deg) rotate(-5deg);
  }
  60% {
    transform: skewX(-4deg) rotate(3deg);
  }
  70% {
    transform: skewX(4deg) rotate(-1deg);
  }
  80% {
    transform: skewX(-3deg) rotate(0deg);
  }
  85% {
    transform: skewX(3deg);
  }
  90% {
    transform: skewX(-2deg);
  }
  95% {
    transform: skewX(2deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
</style>
