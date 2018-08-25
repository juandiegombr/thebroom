<template>
  <div class="gold">
    <img src="@/assets/images/gold.svg" alt="">
  </div>
</template>
<script>
import goldIcon from '@/assets/images/gold.svg'
export default {
  name: 'Sword',
  props: {
  },
  computed: {
    goldIcon () {
      return goldIcon
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.gold {
  width: 100%;
}
</style>
