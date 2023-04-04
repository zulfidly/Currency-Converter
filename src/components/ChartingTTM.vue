<script setup>
import { mainObj } from './GlobalVars.vue';

// import { onMounted, onUnmounted } from 'vue';
// onMounted(() => { console.log('chart mounted');})
// onUnmounted(() => {console.log('chart UN-mounted');})

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
            top: 50,
            width: "75%",
            // width: "auto",
            // height: "50%",
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
screen.orientation.addEventListener("change", () => {
    if(mainObj.isChartDisplaying) {
        drawChart()
    } else return
});

</script>
<template>

</template>

