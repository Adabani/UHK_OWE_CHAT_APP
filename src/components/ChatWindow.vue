<template>
  <div class="chatWindow">
    <h2>Chat s: {{ this.participantName }}</h2>

    <div class="newMessageDiv" v-if="newMessage == 1">
      <input
        type="text"
        v-model="newMessageRecipientName"
        placeholder="Přezdívka příjemce"
      />
      <textarea placeholder="Zpráva" v-model="newMessageText"></textarea>
      <button @click="sendMessage()">Odeslat</button>
    </div>

    <div class="messageList">
      <div
        v-bind:class="{
          currentUserMessage: message.IDuserSender == this.iduser,
        }"
        v-for="message in messageListInOrder"
        :key="message.IDusersMessages"
        class="message"
      >
        <p class="senderName">
          {{
            message.IDuserSender == this.iduser ? "Já:" : this.participantName
          }}
        </p>
        <p class="messageContent">
          <span> {{ message.message }} </span>
        </p>
        <p class="attachment" v-if="message.accesscode">
          <a
            target="_blank"
            :href="
              'http://owe.banicevic.eu/?action=downloadAttachment&accesscode=' +
              message.accesscode
            "
            >Příloha (klikněte ke stažení)</a
          >
        </p>
      </div>
    </div>

    <div class="newMessageWrapper">
      <input type="file" id="file" name="attachment" />
      <textarea
        placeholder="Napište zprávu"
        v-model="newMessageText"
      ></textarea>
      <button @click="sendMessage()">Odeslat</button>
    </div>
  </div>
</template>



<script>
export default {
  /*props:{
        IDchatRooms:{type:Number, required:true}
    },*/
  data() {
    return {
      //usersList: [{ idUser: 1, name: "Adam", src: "http://www.banicevic.eu/img/ABlogo.png", message:"" }],
      messageList: [],
      username: window.localStorage.getItem("name"),
      iduser: window.localStorage.getItem("IDusers"),
      newMessage: 0,
      newMessageText: "",
      newMessageRecipientName: "",
      code: window.localStorage.getItem("code"),
      errorMessage: "",
      IDchatRooms: this.$route.params.IDchatRooms,
      participantName: "",
    };
  },
  computed: {
    messageListInOrder() {
      // `this` points to the component instance
      return this.messageList.slice().reverse();

    }
  },
  created() {
    this.reloadMessages();
  },

  methods: {
    getChatRoomInfo() {
        var thisref = this;
      console.log(this);

      setInterval(function () {
          thisref.reloadMessages();
        }, 5000);
    },
    reloadMessages(){
      fetch(
        "http://owe.banicevic.eu/?action=getChatRoomInfo&key=" +
          this.code +
          "&idchatroom=" +
          this.IDchatRooms
      )
        .then((response) => response.json())
        .then((data) => {
          this.messageList = data.result.messages;
          if (data.result.participantName == this.username) {
            this.participantName = data.result.participantName2;
          } else {
            this.participantName = data.result.participantName;
          }
        });
    },

    sendMessage() {
      var data = new FormData();
      var fileElemenet = document.getElementById("file");
      data.append("message", this.newMessageText);
      if (fileElemenet.files.length > 0) {
        var file = fileElemenet.files[0];
        data.append("attachment", file);
      }
      fetch(
        "http://owe.banicevic.eu/?action=writeToChatRoom&key=" +
          this.code +
          "&idchatroom=" +
          this.IDchatRooms +
          "&message=" +
          this.newMessageText,
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.newMessageText = "";
          fileElemenet.value = "";
          this.messageList.push(data.result);
        });
    },
    loadMoreChats() {
      fetch("http://owe.banicevic.eu/?action=getLastChatRooms&key=" + this.code)
        .then((response) => response.json())
        .then((data) => {
          this.usersList = this.usersList.concat(data.result);
        });
    },
    newChat() {
      this.newMessage = 1;
      //this.numChats++;
      //this.usersList.push({ idUser: this.usersList[this.usersList.length - 1].idUser + 1, name: "Voloda", src: "" });
    },
  },
};
</script>

<style lang="scss">
.messageContent {
  display: inline-block;
}
.message {
  color: white;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 300px;
  background: burlywood;
  padding: 0px 15px 0px 15px;
  border-radius: 10px;
  img {
    max-width: 50px;
    border-radius: 500px;
    vertical-align: middle;
  }
  p {
    vertical-align: middle;
    margin-left: 10px;
  }
}
.currentUserMessage {
  background: gray;
}

.senderName {
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  display: inline-block !important;
  padding-left: 15px;
  padding-bottom: 10px;
  font-weight: bold;
}
.newMessageWrapper {
  margin: 0 auto;
  margin-top: 15px;
  max-width: 400px;
  input {
  }
  textarea {
    border: 1px solid gainsboro;
    max-width: 100%;
    width: 100%;
    display: block;
    padding: 5px;
    margin: 0;
  }
  button {
    border: 0;
    background: royalblue;
    width: 100%;
    padding: 10px 15px;
    font-size: 1.2em;
    color: white;
  }
}
</style>