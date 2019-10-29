<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" 
      :key="index"
      :itemInfo="item"/>

    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CartListItem from './CartListItem'

  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    width: 100%;
    height: calc(100% - 44px - 49px);
    
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
