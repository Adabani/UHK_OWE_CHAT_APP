<template>
  <div class="miniNotifyBar">
      <div v-for="notification in notifyList" v-bind:key="notification">
    </div>
      <div class='miniNotifyBarMessage " + classa + "'><span class='miniNotifyNadpis'>" +nadpis  +"</span>:<span class='miniNotifyContent'>" + text +"</span></div>").hide()

  </div>
</template>



<script>
export default {
  data() {
    return {
          notifyList = []
    }
  },
  created() {
    EventBus.$on('i-got-clicked', data => {
      console.log(data)
      // You can then call your method attached to this component here
      this.openModal()
    });
  
  },
  methods: {
      addNotification (NotificationText, NotificationTitle) {
        this.notifyList.push({"title":NotificationTitle, "text":NotificationText});
      }
  }
}
</script>

<style lang="scss">
.greeting {
  color: red;
  font-weight: bold;
}
.chatListItem{
    padding:15px;
 img{
     max-width: 50px;
     border-radius: 500px;
     vertical-align: middle;
 }
 p{
     display: inline;
     vertical-align: middle;
     margin-left: 10px;
 }

}
</style>