/*
 * @Author: huangzibin
 * @Date: 2019-10-23 10:42:09
 * @Last Modified by: huangzibin
 * @Last Modified time: 2019-10-24 15:16:14
 */
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control" v-show="isTabFixed"
     />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import {itemListenerMixin, backTopMixin} from 'common/mixin'

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    
  },
  activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 事件监听
     */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

    },

    
    contentScroll(position) {
      this.listenShowBackTop(position)
      //决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  },
  

};
</script>

<style scoped>
#home {
  /* padding-top: 44px */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
