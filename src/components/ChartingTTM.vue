<script setup>
import { computed } from '@vue/reactivity';
import { mainObj } from './GlobalVars.vue';
import { tide } from "./GlobalVars.vue"

// import { onMounted, onUnmounted } from 'vue';
// onMounted(() => { console.log('chart mounted');})
// onUnmounted(() => {console.log('chart UN-mounted');})

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // console.log('drawing chart');

    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    let bgClr = rs.getPropertyValue("--chart-bg").trim()
    let txtClr = rs.getPropertyValue("--chart-text").trim()
    // console.log(bgClr, txtClr);


    let temp = [...mainObj.chartingData]
    const startDate = temp[1][0]
    const endDate = temp[temp.length-1][0]

    var data = google.visualization.arrayToDataTable(mainObj.chartingData);
    let amt = mainObj.userSettings.amount || "1.00"
    var options = {
        title: `${mainObj.userSettings.convertTo} per ${mainObj.userSettings.convertFrom} ${amt} [${startDate} to ${endDate}]`,
        width: screen.width,
        height: screen.height,
        titleTextStyle: {
            color: txtClr,
        },
        curveType: 'none',
        //   curveType: 'function', //to get curves instead of pointy graph
        legend: { position: 'bottom' },
        backgroundColor: bgClr,
        hAxis: {
            slantedText: true,
            slantedTextAngle: 45,
            showTextEvery: 28,
            viewWindowMode: "pretty",
            textStyle: {
                fontSize: 10,
                color: txtClr,
            },
        },
        annotations: {
            textStyle: {
                color: txtClr,
            },
        },
        legend: {
            position: "top",
            alignment: "end",
            textStyle: { color: txtClr },
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

