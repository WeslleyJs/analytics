<template>
  <div id="app">
    <Home />
    <router-view/>

  </div>  
</template>

<script>
// import axios from 'axios';
// import api from './services/api'
//id de teste: MLB1830777149
import Home from './components/Header.vue'
export default {
  name: 'App',
  components:{
    Home,
  },
  data() {
    return {
      mlb: [],
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  background: #eee3e3;
}

</style>
