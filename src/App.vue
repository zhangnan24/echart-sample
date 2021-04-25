<template>
  <div id="app">
    <div class="echart-pie-wrap">
      <echart-pie :series-data="dataList" :extra-option="extraOption" />
    </div>
  </div>
</template>

<script>
import EchartPie from "@/components/echart_pie";

export default {
  name: "App",
  components: {
    EchartPie,
  },
  data() {
    return {
      dataList: [
        // {
        //   name: "西瓜",
        //   value: 20,
        // },
        // {
        //   name: "橘子",
        //   value: 13,
        // },
        // {
        //   name: "杨桃",
        //   value: 33,
        // },
      ],
      extraOption: {
        color: ["#fe883a", "#2d90d1", "#f75981", "#90e2a9"],
      },
    };
  },
};
</script>

<style lang="less">
.echart-pie-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 90vh;
  margin: 20px auto;
}
</style>
