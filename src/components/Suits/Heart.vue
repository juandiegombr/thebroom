<template>
  <div class="heart">
  </div>
</template>

<script>
export default {
  name: 'heart',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.heart {
  position: relative;
  width: 100%;
  padding-top: 75%;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background-color: rgb(255, 67, 67);
  &::before {
    // content: '';
    position: absolute;
    width: 2rem;
    height: .5rem;
    background-color: rgb(255, 67, 67);
    left: 0;
    right: 0;
    bottom: -10px;
    margin: 0 auto;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
}
</style>
