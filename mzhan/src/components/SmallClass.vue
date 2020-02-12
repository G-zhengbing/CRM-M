<template>
  <div>
    <scroller>
      <ul>
        <li @click="goXiangqing(item.id)" v-for="(item,i) in product_video">
          <div class="title">
            <div class="title-top">
              <span class="tag">{{item.subject}}</span>
              <span class="classify">{{item.course_name}}</span>
            </div>
          </div>
          <div class="money">
            <i v-if="item.update_state == 1">更新中</i>
            <i v-if="item.update_state == 2">已完结</i>
            <span>
              <span>￥</span>
              {{item.activity_price}}
            </span>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import { SMALL } from '../uilt/url'
export default {
  data(){
    return {
      smallList:[]
    }
  }
};
</script>

<style>
</style>