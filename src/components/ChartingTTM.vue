<script setup>
  import { watch } from 'vue';
  import { mainObj } from './GlobalVars.vue';
  import IconClose from './icons/IconClose.vue';

  let safeDimension = {
    W: undefined,
    H: undefined,
    L: undefined,
    T: undefined,
  }

  watch(
      () => mainObj.chartingData,
      () => {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
      }
  )


  screen.orientation.addEventListener("change", () => { //screen.orientataion is a read-only
    console.log('screen rotated');
    if(mainObj.isChartDisplaying) {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
    } else return
  });


  function setChartDimension() { 
    // console.log('setChartDimension');
    let q = screen.orientation.type
    console.log(q);
    if(q == "portrait-primary" || q == "portrait-secondary") {
      safeDimension.W = screen.width * 0.75
      safeDimension.H = window.innerHeight * 0.7
      safeDimension.T = 80 // in px
      safeDimension.L = 80
    } else if(q == "landscape-primary" || q == "landscape-secondary") {
      safeDimension.W = window.innerWidth * 0.75
      safeDimension.H = window.innerHeight * 0.65
      safeDimension.T = 70
      safeDimension.L = 140
    }
  }

  function drawChart() {
    if(!mainObj.isChartDisplaying) return
    setChartDimension()
    console.log('generating chart');
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

  const removeChart = () => {
    mainObj.isChartDisplaying = false
    document.getElementById("curve_chart").innerHTML = ""
  }
</script>

<template>
    <button @mousedown="removeChart" class="fixed top-4 left-4 z-40 text-[var(--color-text)]" v-show="mainObj.isChartDisplaying">
        <IconClose />
    </button>
    <div id="curve_chart" v-show="mainObj.isChartDisplaying"></div>

</template>

<style scoped>
    #curve_chart {
        width: 100vw;
        height: 100svh;
        padding: 0px;
        position: fixed;
        transform: translateX(-50%);
        top: 0px;
        left: 50%;
        z-index: 20;
    }
</style>