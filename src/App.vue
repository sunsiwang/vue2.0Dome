<template>
  <div id="app">
    
    <!-- <movieBan></movieBan> -->
    <router-view></router-view>
    <router-view name='h'></router-view>
    <transition name='nn' ><!-- 显示过渡动画 -->
    <!-- 进入
    v/nn-enter 0%
    v/nn-enter-active 0 100%
    v/nn-enter-to 100%
    离开
    v/nn-leave 0%
    v/nn-leave-active 0 100%
    v/nn-leave-to 100% -->
    </transition>
    <button @click="show = !show">
    show
    </button>
    <transition
      name="nn"
      enter-active-class="na"
      leave-active-class="nb"
      mode ='out-in'
    > <!-- in-outx先进后出  out-in先出后进-->
      <p  key ='a' v-if="show">show</p>
      <p  key ='b' v-else>show2</p><!-- 同样的标签vue不会进行渲染 所以使用key让他们不同 -->
    </transition>
    <button @click='tz'>跳转</button>
    <button @click='sj'>paixu</button>
    <transition-group name='ng'  mode ='out-in'>
      <span v-for="item in items" :key="item" >{{item}}</span>
    </transition-group>
  </div>
</template>
<script>
import movieBan from '~/common/banner'
 import { defaultFontSize ,adapt} from '../static/rem'
export default {
  data () {
    return {
      items: [1,2,3,4,5,6],
      show: true,
    }
  },
  components: {
    movieBan
  },
  directives: {
    focus (el) { 
      el.fous()
    },
    foncu: { // binding是一个对象包含指令中的所有东西，binding.name
      inserted ( el , binding) { 
        el.focus()
      }
    }
  },
  methods: {
    sj () {
      this.items.sort(()=>Math.random()-0.5)
    },
    tz () {
      this.$router.replace({name: 'ind',params: {id:22}})// 动态路由必须加参数
    }
  }
}
</script>

<style>
body{font-size: 0.2rem}
.aa{display: block;}
.bb{display: inline-block}
.na,.nb,.ng{transition: 0.5s}
.nn-leave-to,.nn-enter,{transform:translateX(35px);opacity: 1}
.ng-move{transition: 0.5s}
</style>
