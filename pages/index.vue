<template>
  <div class="container">
      <img src="../assets/img/wife.jpg" class="avatar">
      <h1>亲爱的，别生气啦，高高知道错了</h1>
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591702773417&di=4a2090736965eadffbdda9a305b63c7f&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1169771970%2C811882309%26fm%3D214%26gp%3D0.jpg" class="gif">
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
        width: 200px;
    }
}
</style>
