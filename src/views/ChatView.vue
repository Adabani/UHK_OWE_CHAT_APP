<template>
  <div class="home">
    <ChatWindow msg="Začněte šifrovaně chatovat"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatWindow from '@/components/ChatWindow.vue'

export default {
  name: 'TalkerView',
  components: {
    ChatWindow
  },
  methods: {

  },

  
}
</script>
