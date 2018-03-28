<template>
<div class="vue-table-page">
  <div class="page-num-setting">
    <select v-model="pageSizeReal" v-on:change="pageSizesChange">
      <option v-for="page in pageSizesReal" :value="page" v-text="page"></option>
    </select>
  </div>
  <div class="page-num">
    <a href="javascript:void(0);" class="page-totle-num">共<span v-cloak>&#123;&#123; totlePageReal &#125;&#125;</span>页</a>
    <a href="javascript:void(0);" v-on:click="firstPage" class="min-hide">首页</a>
    <a href="javascript:void(0);" v-on:click="prevPage">上一页</a>
    <a href="javascript:void(0);" v-on:click="nextPage">下一页</a>
    <a href="javascript:void(0);" v-on:click="lastPage" class="min-hide">末页</a>
    <span class="page-num-txt min-hide">前往<input type="text" autocomplete="off" @change="reload" name="currentPageReal" class="txt" v-model="currentPageReal" />页</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'vue-pagination',
  props: {
    'onChange':{
      type: Function
    },
    'totleNum':{
      default:() => {
        return 0;
      },
      type: Number
    },
    'currentPage':{
      type: Number
    },
    'pageSize':{
      type: Number
    },
    'pageSizes':{
      type: Array
    }
  },
  data () {
    return {
      currentPageReal : this.currentPage || '1',
      pageSizeReal :  this.pageSize || (this.pageSizes ? this.pageSizes[0] : '10') ,
      pageSizesReal : this.pageSizes || ['10','50','100']
    };
  },
  mounted () {
    if(this.totlePageReal < this.currentPageReal){
      this.currentPageReal = this.totlePageReal;
    }
    if(this.pageSizesReal.indexOf(this.pageSizeReal) === -1){
      this.pageSizeReal = this.pageSizesReal[0];
    }
  },
  computed: {
    totlePageReal() {
      var totleNum = parseInt(this.totleNum);
      var pageSizeReal = parseInt(this.pageSizeReal)
      if(totleNum <  pageSizeReal ) {
        return '1';
      } else {
        if( totleNum % pageSizeReal  !== 0 ) {
          return parseInt(totleNum / pageSizeReal) + 1 + '';
        } else {
          return parseInt(totleNum / pageSizeReal) + '';
        }
      }
    }
  },
  watch: {
    currentPage(value){
      this.currentPageReal = value;
    },
    pageSize(value){
      this.pageSizeReal = value;
    },
    currentPageReal(value){
      this.$emit("update:currentPage", parseInt(value));
      this.$emit('on-current-page-change',value,this.pageSizeReal);
    },
    pageSizeReal(value){
      this.$emit("update:pageSize", parseInt(value));
      this.$emit('on-page-size-change',this.currentPageReal,value);
    }
  },
  methods: {
    pageSizesChange(){
      if(typeof this.onChange === 'function') {
        this.currentPageReal = '1';
        this.reload();
      }
    },
    reload(){
      this.getPaginationList(this.currentPageReal,this.pageSizeReal);
    },
    prevPage(){
      if(parseInt(this.currentPageReal) > 1){
        this.currentPageReal  = parseInt(this.currentPageReal) - 1 + '';
        this.getPaginationList();
      }else{
        return false;
      }
    },
    nextPage(){
      if(parseInt(this.currentPageReal) < parseInt(this.totlePageReal)){
        this.currentPageReal  = parseInt(this.currentPageReal) + 1 + '';
        this.getPaginationList(this.currentPageReal,this.pageSizeReal);
      }else{
        return false;
      }
    },
    firstPage(){
      if(this.currentPageReal !== '1'){
        this.currentPageReal  = '1';
        this.getPaginationList(this.currentPageReal,this.pageSizeReal);
      }else{
        return false;
      }
    },
    lastPage(){
      if(this.currentPageReal !== this.totlePageReal){
        this.currentPageReal  = this.totlePageReal;
        this.getPaginationList(this.currentPageReal,this.pageSizeReal);
      }else{
        return false;
      }

    },
    getPaginationList(){
      var currentPage = this.currentPageReal;
      var perPage = this.pageSizeReal;
      var totlePage = this.totlePageReal;
      var match = currentPage.match(/^\d+$/);   //考虑小数写法 ^\d+(\.\d+)?$
      if(match && parseInt(currentPage) > 0 && parseInt(currentPage) <= parseInt(totlePage)) {
        if(typeof this.onChange === 'function') {
          this.$nextTick(function(){
            this.onChange(currentPage,perPage);
          });
        }
      }else{
        if(parseInt(currentPage) > totlePage){
          this.currentPageReal = totlePage;
        }else if(parseInt(currentPage) < totlePage){
          this.currentPageReal = 1;
        }else{
          this.currentPageReal = 1;
        }
      }
    }
  }
}
</script>

<style scoped>

*, *:after, *:before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.txt {
    border: 1px solid #dddddd;
    padding: 0 8px;
    width: 100%;
    max-width: 210px;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    outline: 0;
}
.vue-table-page {
  margin: 10px;
  overflow: hidden;
  position: relative;
}
.vue-table-page .page-num-setting {
  float: left;
}
.vue-table-page .page-num-setting select {
  width: 50px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid #e9e9e9;
}
.vue-table-page .page-num {
  float: left;
  margin-left: 20px;
  font-size: 12px;
  padding:  0 3px;
  float: right;
}
.vue-table-page .page-num a {
  display: block;
  float: left;
  height: 28px;
  line-height: 28px;
  text-align: center;
  width: 50px;
  color: #666;
  margin-left: -1px;
  border: 1px solid #e5e5e5;
  text-decoration: none;
}
.vue-table-page .page-num a.reload {
  width: 30px;
}
.vue-table-page .page-num .page-num-txt {
  border: 0px solid #e5e5e5;
  width: auto;
  margin-left: 10px;
  float: left;
  display: block;
  color: #666;
}
.vue-table-page .page-num .page-num-txt input {
  color: #333;
  height: 28px;
  line-height: 28px;
  margin: 0 5px;
  padding: 0;
  text-align: center;
  width: 50px;
}
.vue-table-page .page-num a .fa {
  color: #8fcaf4;
  font-size: 16px;
}
.vue-table-page .page-num a.page-totle-num {
  width: 70px;
  border-left: 1px solid #f0f0f0;
  margin: 0 3px;
  border: 0px;
}
.vue-table-page .page-num a.page-totle-num span{
  margin: 0 5px;
}

@media screen and (max-width: 720px) {
  .vue-table-page {
    margin: 10px 0;
  }
  .vue-table-page .page-num{
    float: right;
  }
  .vue-table-page .page-num .min-hide {
    display: none;
  }
}
</style>
