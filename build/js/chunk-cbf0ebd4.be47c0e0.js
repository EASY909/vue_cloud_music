(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cbf0ebd4"],{"06a2":function(t,e,i){"use strict";var n=i("fc81")(!0);i("492d")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,i=this._i;return i>=e.length?{value:void 0,done:!0}:(t=n(e,i),this._i+=t.length,{value:t,done:!1})}))},1254:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"NavContainer"},[i("Horizen",{attrs:{list:t.categoryTypes,title:"分类 (默认热门):"},on:{handleClick:t.handleUpdateCatetory}}),i("Horizen",{attrs:{list:t.alphaTypes,title:"首字母:"},on:{handleClick:t.handleUpdateAlpha}})],1),i("div",{staticClass:"ListContainer"},[i("Scroll",{attrs:{pullUpLoading:t.pullUpLoading,pullDownLoading:t.pullDownLoading,scrollconfig:t.scrollconfig,name:"Singers",data:t.data},on:{pullUp:t.handlePullUp,pullDown:t.handlePullDown}},[i("div",{staticClass:"List"},t._l(t.singerList,(function(e,n){return i("div",{key:e.accountId+""+n,staticClass:"ListItem",on:{click:function(i){return i.stopPropagation(),t.enterDetail(e.id)}}},[i("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img",loading:t.imgUrl},expression:"{ selector: 'img', loading: imgUrl }"}],staticClass:"img_wrapper"},[i("img",{attrs:{"data-src":e.picUrl+"?param=300x300",width:"100%",height:"100%",alt:"music"}})]),i("span",{staticClass:"name"},[t._v(t._s(e.name))])])})),0)]),i("Loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1),i("keep-alive",[t.$route.meta.keepAlive?i("router-view"):t._e()],1),t.$route.meta.keepAlive?t._e():i("router-view")],1)},a=[],s=i("e292"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Scroll",{attrs:{scrollconfig:t.scrollconfig,name:"HorizenItem",data:t.data}},[i("div",{ref:"Category"},[i("div",{staticClass:"HoriList"},[i("span",[t._v(t._s(t.title))]),t._l(t.list,(function(e){return i("span",{key:e.key,class:t.ListItem,on:{click:function(i){return t.handleClick(e.key,i)}}},[t._v(t._s(e.name))])}))],2)])])},r=[],c=(i("06a2"),i("ec25"),i("6d57"),i("da20")),l={name:"HorizenItem",components:{Scroll:c["a"]},props:{list:{type:Array,default:[]},title:{type:String,default:""}},data:function(){return{scrollconfig:{eventPassthrough:"horizental",click:!0},ListItem:"ListItem",data:[]}},computed:{},watch:{},methods:{handleClick:function(t,e){this.$emit("handleClick",t);var i=e.target.parentNode.children;Object(s["a"])(i).forEach((function(t){t.classList.remove("selected")})),e.target.classList.add("selected")}},beforeMount:function(){},mounted:function(){var t=this.$refs.Category,e=t.querySelectorAll("span"),i=0;Array.from(e).forEach((function(t){i+=t.offsetWidth})),t.style.width="".concat(i,"px")},beforeCreate:function(){},created:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){},deactivated:function(){}},u=l,g=(i("461c"),i("9ca4")),d=Object(g["a"])(u,o,r,!1,null,"47018c5c",null),h=d.exports,p=i("3459"),f=i("da71"),m={name:"Singers",components:{Horizen:h,Scroll:c["a"],Loading:p["a"]},data:function(){return{categoryTypes:f["d"],alphaTypes:f["c"],category:"",alpha:"",singerList:this.$store.getters["Singers/singerList"],scrollconfig:{pullUp:!0,pullDown:!0},pullUpLoading:!1,pullDownLoading:!1,loading:!0,imgUrl:i("40be"),data:[]}},computed:{},watch:{},methods:{handleUpdateCatetory:function(t){this.category=t,this.updateDispatch(t,this.alpha),console.log(t)},handleUpdateAlpha:function(t){this.alpha=t,this.updateDispatch(this.category,t),console.log(t)},getHotSingerDispatch:function(){var t=this;this.$store.dispatch("Singers/getHotSingerList").then((function(e){t.singerList=e,t.loading=t.$store.getters["Singers/enterLoading"],t.data=Object(s["a"])(t.singerList)}))},updateDispatch:function(t,e){var i=this,n={category:t,alpha:e};this.$store.commit("Singers/changeListOffset",0),this.$store.commit("Singers/changeEnterLoading",!0),this.$store.dispatch("Singers/getSingerList",n).then((function(t){i.singerList=t,i.data=Object(s["a"])(i.singerList)}))},pullUpRefreshDispatch:function(t,e,i,n){var a=this;if(this.$store.commit("Singers/changePullUpLoading",!0),this.pullUpLoading=this.$store.getters["Singers/pullUpLoading"],i)this.$store.dispatch("Singers/refreshMoreHotSingerList").then((function(t){a.pullUpLoading=a.$store.getters["Singers/pullUpLoading"],a.singerList=t,a.data=Object(s["a"])(a.singerList)}));else{var o={category:t,alpha:e};this.$store.dispatch("Singers/refreshMoreSingerList",o).then((function(t){a.pullUpLoading=a.$store.getters["Singers/pullUpLoading"],a.singerList=t,a.data=Object(s["a"])(a.singerList)}))}},pullDownRefreshDispatch:function(t,e){var i=this;if(this.$store.commit("Singers/changePullDownLoading",!0),this.$store.commit("Singers/changeListOffset",0),this.pullDownLoading=this.$store.getters["Singers/pullDownLoading"],""===t&&""===e)this.$store.dispatch("Singers/getHotSingerList").then((function(t){i.singerList=t,i.pullDownLoading=i.$store.getters["Singers/pullDownLoading"],i.data=Object(s["a"])(i.singerList)}));else{var n={category:this.category,alpha:this.alpha};this.$store.dispatch("Singers/getSingerList",n).then((function(t){i.singerList=t,i.data=Object(s["a"])(i.singerList)}))}},handlePullUp:function(){this.pullUpRefreshDispatch(this.category,this.alpha,""===this.category,this.$store.getters["Singers/ListOffset"])},handlePullDown:function(){this.pullDownRefreshDispatch(this.category,this.alpha)},enterDetail:function(t){this.$router.push({path:"/singers/".concat(t)})}},created:function(){this.getHotSingerDispatch()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},v=m,L=(i("47c5"),Object(g["a"])(v,n,a,!1,null,"ab5ec3cc",null));e["default"]=L.exports},"34e5":function(t,e,i){},"40be":function(t,e,i){t.exports=i.p+"img/music.9a8ba630.png"},"461c":function(t,e,i){"use strict";var n=i("34e5"),a=i.n(n);a.a},"47c5":function(t,e,i){"use strict";var n=i("f365"),a=i.n(n);a.a},ebc3:function(t,e,i){"use strict";var n=i("064e"),a=i("cc33");t.exports=function(t,e,i){e in t?n.f(t,e,a(0,i)):t[e]=i}},ec25:function(t,e,i){"use strict";var n=i("4ce5"),a=i("e46b"),s=i("008a"),o=i("d0bc"),r=i("2285"),c=i("eafa"),l=i("ebc3"),u=i("f878");a(a.S+a.F*!i("d0c5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,i,a,g,d=s(t),h="function"==typeof this?this:Array,p=arguments.length,f=p>1?arguments[1]:void 0,m=void 0!==f,v=0,L=u(d);if(m&&(f=n(f,p>2?arguments[2]:void 0,2)),void 0==L||h==Array&&r(L))for(e=c(d.length),i=new h(e);e>v;v++)l(i,v,m?f(d[v],v):d[v]);else for(g=L.call(d),i=new h;!(a=g.next()).done;v++)l(i,v,m?o(g,f,[a.value,v],!0):a.value);return i.length=v,i}})},f365:function(t,e,i){}}]);