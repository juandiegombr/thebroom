<template>
  <div class="game-area-background">
    <div class="game-area-background-decoration"></div>
    <div class="score">
      <div class="round">
        <span>ROUND {{ round }}</span>
      </div>
      <div class="results">
        <p>PLAYER: {{ results.player }}</p>
        <p>DEALER: {{ results.dealer }}</p>
      </div>
      <div class="results">
        <p>DEAL: {{ deal }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheGameArea',
  props: {
  },
  computed: {
    ...mapState(['results', 'round', 'deal'])
  },
  components: {
  }
}
</script>

<style lang="scss">
.game-area-background {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: #52b152; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #52b152 1%, #008a00 49%, #005700 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, #52b152 1%,#008a00 49%,#005700 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, #52b152 1%,#008a00 49%,#005700 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#52b152', endColorstr='#005700',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  z-index: -1;
  &-decoration {
    position: relative;
    width: 100%;
    height: 100%;
    border: .1rem solid rgba(255, 212, 20, .2);
    &::before {
      content: '';
      position: absolute;
      left: .2rem;
      right: .2rem;
      top: .2rem;
      bottom: .2rem;
      border: .1rem solid rgba(255, 212, 20, .2);

    }
  }
  .score {
    position: fixed;
    top: 3rem;
    right: 3rem;
    color: rgba(255, 212, 20, .2);
    text-align: center;
    .round {
      border: 1px solid rgba(255, 212, 20, .3);
      padding: 1rem;
      border-radius: 3px;
    }
  }
}
</style>
