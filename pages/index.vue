<template>
  <div class="container">
      <!-- <img src="../assets/img/wife.jpg" class="avatar"> -->
      <h1>各位大哥好！！！</h1>
      <img src="http://5b0988e595225.cdn.sohucs.com/q_mini,c_zoom,w_640/images/20171122/a6ac310122b646918112abf3bdf71188.gif" class="gif">
  </div>
</template>

<script>

export default {
  head(){
      return {
          title: '首页'
      }
  },
}
</script>

<style lang='scss' scope>
.container{
    text-align: center;
    .avatar{
        // display: block;
        width: 300px;
        // margin: 50px auto;
        border-radius: 50%;
    }
    h1{
        margin: 20px;
    }
    .gif{
        width: 400px;
    }
}
</style>
