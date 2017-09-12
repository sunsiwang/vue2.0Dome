<template>
  <div id="banner">
      <div class='ban'>
        <ul class='oul'>
            <li v-for='bannerItem in banners'><img :src="bannerItem" ></li>
        </ul>
        <span class='ball' v-for='item in banners.length'></span>
      </div>
      <span class='prev'>〈</span>
      <span class='next'> 〉</span>
  </div>
</template>

<script>
export default {
  name: 'baner',
  data () {
    return {
        banners: [
            require('@/assets/baner/1.png'),
            require('@/assets/baner/2.png'),
            require('@/assets/baner/3.jpg'),
            require('@/assets/baner/4.jpg')
        ]
    }
  }
}
</script>

<style>
    #banner{width:100%;}
    .oul{width:500%;list-style-type:none;overflow:hidden;}
    .ban{overflow:hidden;}
    .oul li{float:left;width:20%;}
    .oul li img{width:100%;}
</style>
