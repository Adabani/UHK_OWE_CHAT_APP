<template>
  <div class="hello">
    <h1>Vítejte</h1>

    <p> Pokud nemáte účet, můžete se anonymně zaregistrovat a pak chatovat pokud je vám známo jméno druhého učastníka. Všechny soubory jsou zabezpečeny a vaše heslo je hashováno pomocí SHA-256 algoritmu. Tato aplikace je školní záverečný projekt na OWE a je napsána ve Vue JS, backend pak v PHP</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
