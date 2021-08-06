<template>
  <div>
    <!-- {{items1}}
    <div v-for="(val,key,i) in items1" :key="i" ><div v-if="key == '111'">{{ val}}</div></div> -->
    {{ id }}
  </div>
</template>
  -------------------------------------------------------此页面暂时没用----------------------------
<script>
import config from "@/config.json";
export default {
  created() {
    // this.$watch(
    //   () => this.$route.query,
    //   (toParams, previousParams) => {
    //     this.id = toParams
    //   }
    // );
  },
  mounted() {
    // console.log("------------");
    console.log(this.$route.query);
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    // let items1 = config.north.front.floor1;
    // let newStr = JSON.parse(JSON.stringify(items1))
    // let arr = []
    // // 循环对象，把每一项push到数组中
    // for (let i in newStr) {
    //   arr.push(newStr[i])
    // }
    // let p = parseInt(this.$route.query.id);
    // this.$alert(arr[p], "标题", {
    //     confirmButtonText: '确定',
    //   });
  },
  methods:{
    a(){

    }
  },
  watch: {
    $route(to, from) {
      console.log(to.query,from.query);
      this.id = to.query
      this.a()
    }
  },
  // watch: {
  //     // 如果 `question` 发生改变，这个函数就会运行
  //     $route: function (newQuestion, oldQuestion) {
  //       this.p = this.$route.query.id,
  //       console.log(this.p);
  //       console.log(this.items1);
  //       this.$alert(this.arr[this.p], "标题", {
  //           confirmButtonText: '确定',
  //         });
  //     }
  //   },

  //   watch:{
  //     $route: 'changeData' // 值可以为methods的方法名
  //   },
  //   methods: {
  //    changeData(curVal,oldVal){
  //   　　　 conosle.log("----------------------")
  // 　　}
  // },

  data() {
    return {
      items1: config.north.front.floor1,
      id: 0,
      // p,
      // arr,
      // newStr,
    };
  },
};
</script>

<style>
</style>