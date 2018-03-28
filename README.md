# vue.pagination
> Pagination for Vue.js

## install
```javascript
npm install vue-easy-pagination
```

## 初始化插件
```javascript
import Vue from 'vue'
import VuePagination from 'VuePagination'

Vue.use(VuePagination)
```

## 使用
#### 1、基本使用
##### HTML Template
```html
<vue-pagination 
  :totle-num="totleNum"
  :current-page="currentPage">
</vue-pagination>
```
##### javascript 
```javascript
export default {
  name: 'App',
  data () {
    return {
      totleNum:100,
      currentPage:3
    }
  }
}
```

#### 2、自定义page-sizes和设置初始page-size
###### 自定义<code>page-sizes</code>[30,40,50]，设置当前<code>page-size</code>为40（默认pagesizes为[10,50,100]，pagesize为10）
##### HTML Template
```html
<vue-pagination 
  :totle-num="totleNum"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :page-size="40">
</vue-pagination>
```
##### javascript 
```javascript
export default {
  name: 'App',
  data () {
    return {
        totleNum:100,
    	currentPage:3,
      	pageSizes:[30,40,50],
    }
  }
}
```

#### 3、on-change回调函数
###### <code>pageSize</code>和<code>currentPage</code>改变时调用<code>on-change</code>,返回的参数为<code>currentPage</code>和<code>pageSize</code>（如果是<code>pageSize</code>的改变，<code>currentPage</code>自动跳转到第一页）
##### HTML Template
```html
<vue-pagination 
  :totle-num="totleNum"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :on-change="onChange">
</vue-pagination>
```
##### javascript 
```javascript
export default {
  name: 'App',
  data () {
    return {
    	totleNum:100,
    	currentPage:3,
      	pageSizes:[30,40,50],
    }
  },
  methods:{
    onChange(page,size){
      console.log(page,size);
    },
  }
}
```

#### 4、on-page-size-change 和 on-current-page-change回调函数
###### <code>pageSize</code>改变时调用<code>on-page-size-change</code>，<code>currentPage</code>改变时调用<code>on-current-page-change</code>，回掉参数为<code>currentPage</code>和<code>pageSize</code>（如果是存在<code>on-change</code>参数时，返回的<code>currentPage</code>始终为1，所以建议不要和<code>on-change</code>同时使用）
##### HTML Template
```html
<vue-pagination 
  :totle-num="totleNum"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  @on-page-size-change="onPageSizeChange"
  @on-current-page-change="onCurrentPageChange">
</vue-pagination>
```
##### javascript 
```javascript
export default {
  name: 'App',
  data () {
    return {
    	totleNum:100,
    	currentPage:3,
      	pageSizes:[30,40,50],
    }
  },
  methods:{
    onPageSizeChange(page,size){
      console.log(page,size);
    },
    onCurrentPageChange(page,size){
      console.log(page,size);
    }
  }
}
```