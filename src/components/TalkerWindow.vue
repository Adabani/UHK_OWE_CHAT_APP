<template>
    <div class="chatWindow">
    
        <p>Chaty <span v-if="numChats > 0">({{ numChats }})</span></p>

            <div class="newMessageDiv" v-if="newMessage==1">
                <input type="text" v-model="newMessageRecipientName" placeholder="Přezdívka příjemce">
                <textarea placeholder="Zpráva" v-model="newMessageText"></textarea>  
                <button @click="sendMessage()">Odeslat</button>
            </div>
    
        <h1 v-if="username != ''">{{ username }}</h1>

        <button @click="newChat()"> Novy chat </button>
    
        <div class="chatList">
    
            <div v-for="user in usersList" :key="user.IDchatRooms" class="chatListItem">
    
                
    
                <p class="RecipientName"> {{ user.username1 == this.username ? user.username2 : user.username1}} </p>
                <p class="message"><span>  {{user.lastMessageSenderName}} : </span>{{ user.lastMessage }}</p> 
                <router-link :to="{ name: 'chat', params: {IDchatRooms:user.IDchatRooms } }">Do chatu</router-link>

                
    
    
            </div>
    
        </div>
    
    </div>
</template>



<script>
export default {
    data() {
        return {
            //usersList: [{ idUser: 1, name: "Adam", src: "http://www.banicevic.eu/img/ABlogo.png", message:"" }],
            usersList: [],
            numChats: 0,
            username: window.localStorage.getItem("name"),
            newMessage:0,
            newMessageText: "",
            newMessageRecipientName: "",
            code: window.localStorage.getItem("code"),
            errorMessage:"",

        }
    },
    created() {
        this.loadMoreChats();
    },
    methods: {
        sendMessage(){
             fetch("http://owe.banicevic.eu/?action=writeNewMessage&key="+this.code + "&username=" + this.newMessageRecipientName + "&message=" + this.newMessageText)
            .then(response => response.json())
            .then(data => { 
                let found = false;
                this.usersList.forEach(function(item, index, arr){
                if(item.name == this.newMessageRecipientName){
                    item.message = this.newMessageText;
                    found = true;
                    return false;
                }
                if(found == false){
                    this.loadMoreChats();
                }
                this.newMessage= false;
                this.newMessageText = "";
                this.newMessageRecipientName ="";
            })
        });
        },
        loadMoreChats(){
            fetch("http://owe.banicevic.eu/?action=getLastChatRooms&key="+this.code)
            .then(response => response.json())
            .then(data => {
                if(data.code == 0){
                    window.localStorage.clear();
                    this.$router.push("/login");
                    location.reload();
                    return;
                }
                
                this.usersList = this.usersList.concat(data.result);}
                );
        },
        newChat() {
            this.newMessage = 1;
            //this.numChats++;
            //this.usersList.push({ idUser: this.usersList[this.usersList.length - 1].idUser + 1, name: "Voloda", src: "" });
        }

    }
}
</script>

<style lang="scss">



.chatListItem {
    margin:0 auto;
    max-width: 300px;
    background: burlywood;
    padding: 0px 15px 0px 15px;
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
.RecipientName{
    padding-top:15px;
    text-align: left;
    display: block !important;
        background: #d5e4ff;
    padding-left: 15px;
    padding-bottom: 10px;
    font-weight: bold;
}
.newMessageDiv{
    margin: 0 auto;
    max-width: 400px;
    input{

}
    textarea{
        display: block;
        border:0;
        padding:5px;
        margin:0;

    }
}
</style>