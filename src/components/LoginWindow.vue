<template>
  <div id="loginForm">
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" />
      <input v-model="password" placeholder="password" type="password" />
      <input type="submit" value="log in" />
    </form>
    <div class="" v-if="status == 0">{{message}}</div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      status: -5,
      message: ""
    };
  },
  methods: {
    async login() {
      console.log("ahoj");
      const { username, password } = this;
      const formData = new FormData();
      formData.append('name', username);
      formData.append('password', password);

      const res = await fetch(
        "http://owe.banicevic.eu/?action=login",
        {
          method: "POST",
          body: formData
        }
      );
      const data = await res.json();
      if(data.code == 1){
          window.localStorage.setItem("code", data.result.code);
          window.localStorage.setItem("name", username);
          window.localStorage.setItem("IDusers", data.result.IDusers);
          this.$router.push("/talker");
      } else {
        this.message = data.message;
        this.status = data.code;
      }
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
.greeting {
  color: red;
  font-weight: bold;
}
</style>