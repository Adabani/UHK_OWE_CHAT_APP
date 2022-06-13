<template>
  <div id="registerForm">
    <form @submit.prevent="register">
      <p> Registrujte se </p>
      <input v-model="username" placeholder="username" />
      <input v-model="password" placeholder="password" type="password" />
      <input type="submit" value="Registrovat se" />
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
    async register() {
      console.log("ahoj");
      const { username, password } = this;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const res = await fetch(
        "http://owe.banicevic.eu/?action=register",
        {
          method: "POST",
          body: formData
        }
      );
      const data = await res.json();
      if(data.code == 1){
        alert("Úspěšně jste se registrovali");
          this.$router.push("/login");
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
input{
  display: block;
}
</style>