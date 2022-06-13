<template>
  <div class="home">
    <LoginWindow msg="Dobrý den"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginWindow from '@/components/LoginWindow.vue'

export default {
  name: 'LoginView',
  components: {
    LoginWindow
  },


  
}
</script>
