<template>
<div>
  <div class="block"  style="width: 800px;">
    <span class="demonstration">基本使用</span>
    <vue-pagination 
      :totle-num="totleNum"
      :current-page="currentPage">
    </vue-pagination>
  </div>
  <br>
  <br>
  <div class="block"  style="width: 800px;">
    <span class="demonstration">自定义<code>page-sizes</code>[30,40,50]，设置当前<code>page-size</code>为40（默认pagesizes为[10,50,100]，pagesize为10）</span>
    <vue-pagination 
      :totle-num="totleNum"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="40">
    </vue-pagination>
  </div>
  <br>
  <br>
  <div class="block"  style="width: 800px;">
    <span class="demonstration"><code>pageSize</code>和<code>currentPage</code>改变时调用<code>on-change</code>,返回的参数为<code>currentPage</code>和<code>pageSize</code>（如果是<code>pageSize</code>的改变，<code>currentPage</code>自动跳转到第一页）</span>
    <vue-pagination 
      :totle-num="totleNum"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :on-change="onChange">
    </vue-pagination>
  </div>
  <br>
  <br>
  <div class="block"  style="width: 800px;">
    <span class="demonstration"><code>pageSize</code>改变时调用<code>on-page-size-change</code>，<code>currentPage</code>改变时调用<code>on-current-page-change</code>，回掉参数为<code>currentPage</code>和<code>pageSize</code>（如果是存在<code>on-change</code>参数时，返回的<code>currentPage</code>始终为1，所以建议不要和<code>on-change</code>同时使用）</span>
    <vue-pagination 
      :totle-num="totleNum"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      @on-page-size-change="onPageSizeChange"
      @on-current-page-change="onCurrentPageChange">
    </vue-pagination>
  </div>
  <br>
  <br>
  <div class="block"  style="width: 800px;">
    <span class="demonstration"><code>current-page</code><code>page-size</code>支持.sync进行双向绑定</span>
    <vue-pagination 
      :totle-num="totleNum"
      :current-page.sync="currentPageSync"
      :page-size.sync="pageSizeSync">
    </vue-pagination>
  </div>

</div>
</template>
<style>
.code-box{
  border: 1px solid #dfe2e5;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
}
.btn,a.btn{
  border-radius: 2px;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 14px;
  font-size: 14px;
  background-color: #2b91e8;
  color: #fff;
  border: 0px;
  cursor: pointer;
}
code{
  color: #5e6d82;
  background-color: #e6effb;
  margin: 0 4px;
  display: inline-block;
  padding: 1px 5px;
  font-size: 12px;
  border-radius: 3px;
  height: 18px;
  line-height: 18px;
}
</style>
<script>
export default {
  name: 'App',
  data () {
    return {
      totleNum:100,
      currentPage:3,
      pageSizes:[30,40,50],
      pageSizeSync:30,
      currentPageSync:3
    }
  },
  watch: {
    currentPageSync(){
      console.log(this.currentPageSync);
    },
    pageSizeSync(){
      console.log(this.pageSizeSync);
    }
  },
  methods: {
    onChange(page,size){
      console.log(page,size);
    },
    onPageSizeChange(page,size){
      console.log(page,size);
    },
    onCurrentPageChange(page,size){
      console.log(page,size);
    }
  }
}
</script>
