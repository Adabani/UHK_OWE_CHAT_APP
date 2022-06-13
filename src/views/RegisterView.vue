<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RegisterWindow msg="Dobrý den"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterWindow from '@/components/RegisterWindow.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterWindow
  },


  
}
</script>
