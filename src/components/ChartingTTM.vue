<script setup>
import { mainObj } from './GlobalVars.vue';

// import { onMounted, onUnmounted } from 'vue';
// onMounted(() => { console.log('chart mounted');})
// onUnmounted(() => {console.log('chart UN-mounted');})

screen.orientation.addEventListener("change", () => { //screen.orientataion is a read-only
  if(mainObj.isChartDisplaying) {
    setChartDimension()
    drawChart()
  } else return
});
let safeDimension = {
  W: undefined,
  H: undefined,
  L: undefined,
  T: undefined,
}
const setChartDimension = () => { 
  console.log('setChartDimension');
  let q = screen.orientation.type
  if(q == "portrait-primary" || q == "portrait-secondary") {
    safeDimension.W = screen.width * 0.75
    safeDimension.H = window.innerHeight * 0.7
    safeDimension.T = 80
    safeDimension.L = 80
} else if(q == "landscape-primary" || q == "landscape-secondary") {
    safeDimension.W = window.innerWidth * 0.75
    safeDimension.H = window.innerHeight * 0.65
    safeDimension.T = 70
    safeDimension.L = 140
  }
}
setChartDimension()

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // console.log('drawing chart');

    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    let txtClr = rs.getPropertyValue("--chart-text").trim()
    let color = {
      mainTitle: txtClr,
      legendTextColor: txtClr,
      xAxisLabels: txtClr,
      yAxisLabels: txtClr,
      chartAreaBG: rs.getPropertyValue("--chartarea-bg").trim(),
      chartBG: rs.getPropertyValue("--chart-bg").trim(),
    }
    let temp = [...mainObj.chartingData]
    const startDate = temp[1][0]
    const endDate = temp[temp.length-1][0]

    var data = google.visualization.arrayToDataTable(mainObj.chartingData);
    let amt = mainObj.userSettings.amount || "1.00"
    
    console.log(window.innerWidth, screen.width);

    var options = {
          title: `${mainObj.userSettings.convertTo} per ${mainObj.userSettings.convertFrom} ${amt} [${startDate} to ${endDate}]`,
          titlePosition: "out",
          titleTextStyle: {
              // fontName: "Trebuchet MS",
              fontSize: 16,
              bold: true,
              color: color.mainTitle,
          },
          width: screen.width,
          height: screen.height,         
          backgroundColor: color.chartBG,

          chartArea: {
            top: safeDimension.T,
            left: safeDimension.L,
            width: safeDimension.W,
            height: safeDimension.H,
            backgroundColor: color.chartAreaBG
          },
          vAxis: {
            textPosition: "out",
            textStyle: {
              fontSize: 14,
              bold: true,
              color: color.yAxisLabels,
            },
          },

          hAxis: { 
            textPosition: "out",
            slantedText: true, 
            slantedTextAngle: 45,
            showTextEvery: 28,
            viewWindowMode: "pretty",
            textStyle: {
                fontSize: 14,
                color: color.xAxisLabels,
            },
          },
          legend: {
            position: "top",
            alignment: "end",
            textStyle: {
                color: color.legendTextColor,
                bold: true,
            },
        },

    };
    
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}


</script>
<template>

</template>

