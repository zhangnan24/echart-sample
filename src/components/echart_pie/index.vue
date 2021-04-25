<template>
  <Empty
    v-if="isSeriesEmpty"
    description="暂无数据，请到App.vue将注释的dataList数据打开"
  />
  <chart-pie v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from "lodash";
import ChartPie from "./echart_pie.vue";
import { Empty } from "vant";

export default {
  name: "EchartPie",
  components: { ChartPie, Empty },
  props: ChartPie.props,
  computed: {
    // 针对饼图数据是不是无效的判断
    isSeriesEmpty() {
      return (
        isEmpty(this.seriesData) || this.seriesData.every((item) => !item.value)
      );
    },
  },
};
</script>
