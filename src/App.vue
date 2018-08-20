<template>
  <div id="app">
    <TheGameArea/>
    <ThePlayer/>
    <TheDealer/>
    <TheCommonCards/>
  </div>
</template>

<script>
import TheGameArea from '@/components/TheGameArea'
import ThePlayer from '@/components/ThePlayer'
import TheDealer from '@/components/TheDealer'
import TheCommonCards from '@/components/TheCommonCards'
import Card from '@/components/Card'
export default {
  name: 'app',
  computed: {
    cards () {
      return this.$store.state.facedDownCards
    }
  },
  mounted () {
    this.$store.dispatch('startBroomGame')
  },
  components: {
    Card,
    TheGameArea,
    ThePlayer,
    TheDealer,
    TheCommonCards
  }
}
</script>


<style lang="scss">
body {
 margin: 0; 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
