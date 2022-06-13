
<template>
  <nav>
    <router-link to="/">Úvod</router-link>
    <router-link to="/about">O aplikaci</router-link>
    <router-link v-if="this.code" to="/talker">Chaty</router-link>
    <router-link v-if="!this.code" to="/login">Login</router-link>
    <div v-if="this.username" class="username">{{this.username}}
    </div>
  </nav>
  <router-view/>

  <div class="notifications">
    
  </div>

</template>

<style lang="scss">
body{
  margin:0; 
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background: #1769ff;
  text-align: left;
  padding: 30px;
  color:white;
  position:relative;

  .username{
    display:absolute;
    right:0;
  }
}

nav a {
  display:inline-block;
  padding:15px 10px;
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.username{
  text-align:right;
}
</style>


<script>
export default {
    data() {
        return {
            code: window.localStorage.getItem("code"),
            username: window.localStorage.getItem("name")
        }
    },
    created() {

},
    methods: {


    }
}
</script>