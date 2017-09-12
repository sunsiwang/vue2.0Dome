<template>
  <div class="banner" @mousewheel="swiper">
    <!-- 轮播图 -->
    <div class="banner_c" v-on="{ touchstart: ts,touchmove: tm,touchend:te,mouseup:mu,mousemove:mm,mousedown:md }">
      <!-- 左箭头 -->
      <span class="prev" v-if="jt" @click="prev">〈</span>
      
      <transition-group :name="clickFX" tag="ul">
        <li v-for="(bannerItem,index) in movieDatas" v-if="index == curBanner" :key="bannerItem"><img style="height:100%" :src="bannerItem"></li>
        <img width="100%" key="xxx" :src="movieDatas[0]" style="opacity:0;">
      </transition-group>

      <div class="points" v-if="point">
        <span @mouseover="showImg(item)" class="point" v-for="item in movieDatas.length" :class="{ 'on' : curBanner==item - 1 }"></span>
      </div>
      <!-- 右箭头 -->
      <span v-if="jt" class="next" @click="next">〉</span>
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
  *{
    margin: 0;
    padding:0;
  }
  [v-cloak]{
    display: none;
  }
  .banner{
    margin: 0 auto;
  }
  .banner_c{
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .banner_c:hover span{
    opacity: 1;
  }
  .banner_c ul {
    /*transition:all .5s;*/
    /*height: 200px;*/
  }
  .banner_c ul li{
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top:0;
    bottom:0;
  }
  .points{
    position: absolute;
    bottom: 5%;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .points .point{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition:all .5s;
  }
  .points .point.on{
    background: #ff0;
  }
  .prev,.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    transition: .5s;
  }
  .prev{
    left: 3%;
  }
  .next{
    right: 3%;
  }
  .swipers-enter-active, .swipers-leave-active,.swipers1-enter-active, .swipers1-leave-active {
    transition: all 1s;
  }
  .swipers-leave-active,.swipers1-leave-active{
    position: absolute;
  }
  .swipers-enter{
    transform: translate(100%);
  }
  .swipers-leave-to{
    transform: translate(-100%);
    opacity: .1;
  }
  .swipers1-enter{
    transform: translate(-100%);
  }
  .swipers1-leave-to{
    transform: translate(100%);
    opacity: .1;
  }
</style>
  
<script>
export default {
  props: ['bannersx', 'jt', 'point', 'during', 'showNum'],
  mounted: function () {
    this.bannerLB()
    // this.bannerssx()
    this.$ajax({
      method: 'get',
      baseURL: '/api',
      url: '/movie/in_theaters'
    }).then((res) => {
      console.log(res)
      this.movieDatess = res
    }).catch((err) => {
      console.log(err)
    })
  },
  data () {
    return {
      movieDatess: '',
      bannerWidth: '',
      banners: [
        require('@/assets/baner/1.jpg'),
        require('@/assets/baner/2.jpg'),
        require('@/assets/baner/3.jpg'),
        require('@/assets/baner/4.jpg'),
        require('@/assets/baner/5.jpg')
      ],
      curBanner: 0,
      autoPlay: '',
      clickFX: 'swipers',
      startPoint: { x: 0 },
      endPoint: { x: 0 },
      mousePoint: {}
    }
  },
  computed: {
    bannerss: function () {
      let arr = []
      if (this.bannersx < -1) {
        arr = this.bannersx.map(function (val) {
          let index = val.lastIndexOf('/')
          return '/static/img/' + val.slice(index)
        })
      }
      return arr.length > 0 ? arr : this.banners
    },
    movieDatas: function () {
      let arr = []
      if (this.bannersx) {
        arr = this.bannersx.map(function (val) {
          // console.log(val.images.large)
          return val.images.large
        })
      }
      console.log(arr)
      return arr.length > 0 ? arr.slice(0, this.showNum) : this.banners
    }
  },
  directive: {
    // 'x': function (el) {
    // }
  },
  methods: {
    ts (e) {
      this.clearLB()
      var touch = e.targetTouches[0]
      this.startPoint.x = touch.clientX
    },
    tm (e) {
      e.preventDefault()
      var touch = e.targetTouches[0]
      this.endPoint.x = touch.clientX
    },
    te (e) {
      e.preventDefault()
      var distand = this.endPoint.x - this.startPoint.x
      if (distand < -10) {
        this.next()
      } else if (distand > 10) {
        this.prev()
      }
      this.bannerLB()
    },
    md (e) {
      this.clearLB()
      this.mousePoint.startX = e.clientX //获取客户端的坐标 给鼠标开始的坐标
      this.mousePoint.allow = true
    },
    mm (e) {
      e.preventDefault()
      if (this.mousePoint.allow) {
        this.mousePoint.endX = e.clientX
      } else {
        this.mousePoint.endX = 'px'  //将获取的
      }
    },
    mu (e) {
      e.preventDefault()
      this.mousePoint.allow = false
      var distand = this.mousePoint.endX - this.mousePoint.startX  //判断鼠标移动的距离
      console.log(distand)
      if (distand < -10) {
        this.next()
      } else if (distand > 10) {
        this.prev()
      }
      this.bannerLB()
    },
    // bannerssx: function () {
    //   let arr = []
    //   console.log(this.bannersx)
    //   if (this.bannersx) {
    //     arr = this.bannersx.map(function (val) {
    //       val = '@/assets/movie_index/banner03.jpg'
    //       return require(`${val}`)
    //     })
    //   }
    //   console.log(arr)
    // },
    prev: function () {
      this.clickFX = 'swipers1'
      if (this.curBanner > 0) this.curBanner--
      else {
        this.curBanner = this.movieDatas.length - 1
      }
    },
    next: function () {
      this.clickFX = 'swipers'
      if (this.curBanner < this.movieDatas.length - 1) this.curBanner++
      else {
        this.curBanner = 0
      }
    },
    showImg: function (item) {
      this.clickFX = item - 1 > this.curBanner ? 'swipers' : 'swipers1'
      this.curBanner = item - 1
    },
    bannerLB: function () {
      let that = this
      let time = this.during || 2000
      that.autoPlay = setInterval(that.next, time)
    },
    clearLB: function () {
      let that = this
      clearInterval(that.autoPlay)
    },
    swiper: function (e) {
      e.preventDefault()
      if (e.wheelDelta > 0) {
        this.prev()
      } else {
        this.next()
      }
    }
  }
}
</script>