<script setup>
  import { watch } from 'vue';
  import { mainObj } from './GlobalVars.vue';
  import IconClose from './icons/IconClose.vue';
  google.charts.load('current', { 'packages': ['corechart'] });

  let dimension = {
    innerChart: {
      W: undefined,
      H: undefined,
      L: undefined,
      T: undefined,
    },
    outerChart: {
      W: undefined,
      H: undefined,
    }
  }

  watch(
    () => mainObj.chartingData,
    () => { google.charts.setOnLoadCallback(drawChart) }
  )
  
  window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => {
    if(mainObj.isChartDisplaying) google.charts.setOnLoadCallback(drawChart)
  })

  matchMedia("(orientation:portrait)").addEventListener("change", () => {
    if(mainObj.isChartDisplaying) google.charts.setOnLoadCallback(drawChart)    
  })

  function setChartDimension() { 
    let isPortrait = matchMedia("(orientation:portrait)").matches
    let isMobile = matchMedia("(max-width:1024px)").matches
    // console.log(isMobile);
    if(isMobile && isPortrait) {
      dimension.innerChart.W = screen.width * 0.75
      dimension.innerChart.H = window.innerHeight * 0.7
      dimension.innerChart.T = 120 // in px
      dimension.innerChart.L = 80
      dimension.outerChart.W = screen.width
      dimension.outerChart.H = screen.height
    } else if(isMobile && !isPortrait) {
      dimension.innerChart.W = window.innerWidth * 0.75
      dimension.innerChart.H = window.innerHeight * 0.6
      dimension.innerChart.T = 70
      dimension.innerChart.L = 140
      dimension.outerChart.W = screen.width
      dimension.outerChart.H = screen.height
    } else {
      dimension.innerChart.W = window.innerWidth * 0.75
      dimension.innerChart.H = window.innerHeight * 0.75
      dimension.innerChart.T = "auto"
      dimension.innerChart.L = "auto"
      dimension.outerChart.W = screen.width * 0.9
      dimension.outerChart.H = screen.height * 0.8
    }
  }

  function drawChart() {
    if(!mainObj.isChartDisplaying) return
    setChartDimension()
    // console.log('drawChart');
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
              fontSize: 16,
              bold: true,
              color: color.mainTitle,
          },
          width: dimension.outerChart.W,
          height: dimension.outerChart.H,         
          backgroundColor: color.chartBG,

          chartArea: {
            top: dimension.innerChart.T,
            left: dimension.innerChart.L,
            width: dimension.innerChart.W,
            height: dimension.innerChart.H,
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
  <div class="fixed w-screen h-screen top-0 left-0 bg-[var(--color-background)] z-20" v-show="mainObj.isChartDisplaying">
  </div>
  
  <div id="curve_chart" class="fixed z-20 top-0 left-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:top-1/2 lg:left-1/2" v-show="mainObj.isChartDisplaying"></div>

  <button @mousedown="removeChart" class="fixed z-30 top-4 left-4 lg:left-auto lg:top-8 lg:right-8 text-[var(--color-text)]" v-show="mainObj.isChartDisplaying">
      <IconClose />
  </button>

</template>