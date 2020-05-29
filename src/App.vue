<template>
  <div id="app">
    <h5 style="background-color: silver; padding: 15px; color: white; ">Vuetify</h5>
    <Vuetify/>

    <h5 style="background-color: silver; padding: 15px; color: white; ">Boostrap</h5>
    <Bootstrap/>
  </div>
</template>
 
<script>
import Bootstrap from "./components/Bootstrap";
import Vuetify from "./components/Vuetify";

export default {
  name: "App",
  components: {
    Bootstrap,
    Vuetify
  }
};
</script>

<style>
#app {
  font-family: "Bahnschrift";
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px;
  width: 700px;
  display: inline-block;
}
</style>
