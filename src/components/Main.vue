<template>
  <div class="container">
    <div class="header">PlayOK Converter {{ message }}</div>
    <input
      class="input"
      name="link"
      type="text"
      placeholder="Please insert the link"
      v-on:change="requestPlayOK"
    />
    <div class="card">
      <div class="original" v-html="originalText"></div>
      <div class="final" v-html="finalText"></div>
    </div>
  </div>
</template>


<script src="./Main.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 20px 100px;
  display: flex;
  flex-direction: column;
}

.header {
  font-size: 50px;
}

.input {
  width: 50%;
  height: 50px;

  margin-top: 50px;
  padding: 0 20px;

  border: 1px solid grey;
  border-radius: 20px;

  align-self: center;

  font-size: 20px;
}

.input:focus {
  outline: none;
}

.card {
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
}

.original,
.final {
  width: 40vw;
  height: 500px;

  border: 1px solid black;
  padding: 40px;
  overflow-y: scroll;
}

.original {
  margin-right: 20px;
  flex-basis: 30%;
}

.final {
  flex-basis: 70%;
}

</style>
