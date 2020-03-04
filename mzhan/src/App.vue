<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
}
</script>

<style>

html,body,#app,.box{
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
</style>
