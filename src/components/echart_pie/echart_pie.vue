<template>
  <div class="chart"></div>
</template>

<script>
import { merge } from "lodash";
import * as echarts from "echarts"; // 由于echarts版本的更新，此处引入方式对比一年前已经有所区别
import { BASIC_OPTION } from "./default_option";
import { COLOR_ARRAY } from "../color";
import ResizeListener from "element-resize-detector";

export default {
  name: "ChartPie",
  props: {
    // 正常的业务数据，对应echarts饼图配置中series[0].data
    seriesData: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 表示需要特殊定制的配置
    // 一般UI会规定一个统一的设计规范（比如颜色，字体，图例格式，位置等）
    // 但不排除某个图标会和设计规范不同，需要特殊定制样式，所以开放这个配置，增强灵活性
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.updateChartView();
      },
    },
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    this.updateChartView();
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    assembleDataToOption() {
      // 这部分的图例formatter取决于UI要求，如果你的项目中不需要，就可以不写formatter
      // 由于echarts版本的迭代，这里的写法也有稍许改变
      const formatter = (name) => {
        const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
        const data = this.seriesData.find((item) => item.name === name) || {};
        const percent = data.value
          ? `${Math.round((data.value / total) * 100)}%`
          : "0%";

        return `${name} ${percent}`;
      };

      return merge(
        {},
        BASIC_OPTION,
        { color: COLOR_ARRAY },
        {
          legend: { formatter },
          series: [{ data: this.seriesData }],
        },
        this.extraOption
      );
    },

    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: "scroll",
        callOnAdd: true,
      });

      instance.listenTo(this.$el, () => {
        if (!this.chart) return;
        this.chart.resize();
      });
    },

    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return;

      const fullOption = this.assembleDataToOption();
      this.chart.setOption(fullOption, true);
    },

    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
