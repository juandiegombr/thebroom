<template>
  <div class="game-area-background">
    <div class="game-area-background-decoration"></div>
  </div>
</template>

<script>
export default {
  name: 'TheGameArea',
  props: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}
</style>
