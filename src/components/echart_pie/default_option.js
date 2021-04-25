// 这里的数据会被深度合并
const BASIC_OPTION = {
  title: {
    text: "某某水果数据",
    subtext: "来自xx公司",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "水果购买占比",
      type: "pie",
      radius: "50%",
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [], // 这里在使用的时候会被业务数据替换
    },
  ],
};

export { BASIC_OPTION };
