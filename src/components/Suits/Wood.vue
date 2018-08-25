<template>
  <div class="wood">
    <img src="@/assets/images/wood.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'Wood',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wood {
  width: 50%;
  img {
    transform: rotate(180deg)
  }
}
</style>
