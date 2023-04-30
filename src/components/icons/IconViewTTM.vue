<script setup>
    import { mainObj } from '../GlobalVars.vue';
    import { viewTTMstyle } from '../GlobalVars.vue';
    import { computed } from 'vue';

    const isChartViewable = computed(() => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = mainObj.isSwapping
        if(x && y && !z) return true
        else return false
    })
</script>
<template>
    <svg :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="48px" viewBox="0 0 60 48" enable-background="new 0 0 60 48" xml:space="preserve">
        <polygon :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" points="18.838,18.401 11.875,25 18.876,25 19.083,25 22.397,22 21.594,22 19.75,22 18.838,22 18.838,20.875 "/>
        <polygon :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" points="7.838,31 5.979,31 -0.162,37.151 -0.162,44.272 7.838,36.259 "/>
        <path :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" d="M27.668,25h6.982l-3.313-3.183c-0.494,0.103-1.008,0.239-1.557,0.239c-1.339,0-2.521-0.274-3.512-0.883
            c-0.999-0.612-1.775-1.46-2.308-2.554c-0.516-1.06-0.777-2.285-0.777-3.66c0-0.347,0.139-0.682,0.172-1.01l-0.519,0.64v6.285v0.805
            l0.579-0.833L27.668,25z"/>
        <polygon :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" points="35.182,31 34.875,31 33.435,31 35.182,32.786 "/>
        <polygon :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" points="42.08,25 42.751,25 43.005,25.756 43.665,27.433 49.168,22 47.719,22 46.964,22 46.757,21.211 45.877,18.089 43.422,20.538 43.243,21.219 43.036,22 42.281,22 42.073,22 38.763,25 "/>
        <polygon :class="[viewTTMstyle.initPoly, isChartViewable?viewTTMstyle.chartPoly:'']" points="53.725,10.022 50.52,20.279 59.838,10.848 59.838,3.728 "/>
        <g>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M3.705,30.091v-3.818h15.17v3.818h-5.25v13.636h-4.67V30.091H3.705z"/>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M19.705,30.091v-3.818h15.17v3.818h-5.25v13.636h-4.67V30.091H19.705z"/>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M36.182,26.272h5.898l4.057,9.886h0.205l4.057-9.886h5.896v17.454H51.66v-10.09h-0.137l-3.887,9.955h-2.795l-3.887-10.023 h-0.137v10.158h-4.637V26.272z"/>
        </g>
        <g>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M17.563,8.875l-4.438,12H11.25l-4.438-12h2l3.313,9.563h0.125l3.313-9.563H17.563z"/>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M20.688,6.875c-0.359,0-0.668-0.122-0.926-0.367c-0.258-0.245-0.387-0.539-0.387-0.883s0.129-0.638,0.387-0.883
                c0.258-0.245,0.566-0.367,0.926-0.367s0.668,0.123,0.926,0.367C21.871,4.987,22,5.281,22,5.625s-0.129,0.638-0.387,0.883
                C21.355,6.753,21.047,6.875,20.688,6.875z M19.75,20.875v-12h1.844v12H19.75z"/>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M29.781,21.125c-1.156,0-2.152-0.256-2.988-0.77c-0.836-0.513-1.48-1.231-1.93-2.156c-0.451-0.924-0.676-2.001-0.676-3.23
                c0-1.229,0.225-2.313,0.676-3.254c0.449-0.94,1.08-1.674,1.891-2.203c0.809-0.528,1.756-0.793,2.84-0.793
                c0.625,0,1.242,0.104,1.852,0.313c0.609,0.208,1.164,0.546,1.664,1.012c0.5,0.466,0.898,1.082,1.195,1.848s0.445,1.708,0.445,2.828
                V15.5H25.5v-1.594h7.375c0-0.677-0.135-1.281-0.402-1.813c-0.27-0.531-0.648-0.95-1.141-1.258
                c-0.492-0.307-1.072-0.461-1.738-0.461c-0.734,0-1.369,0.181-1.902,0.543c-0.535,0.362-0.945,0.832-1.23,1.41
                c-0.287,0.578-0.43,1.198-0.43,1.859v1.063c0,0.906,0.156,1.673,0.473,2.301c0.314,0.628,0.754,1.104,1.316,1.43
                c0.563,0.326,1.215,0.488,1.961,0.488c0.484,0,0.922-0.069,1.316-0.207c0.393-0.138,0.732-0.346,1.02-0.625
                c0.285-0.278,0.508-0.626,0.664-1.043l1.781,0.5c-0.188,0.604-0.504,1.134-0.945,1.59c-0.443,0.456-0.99,0.811-1.641,1.063
                C31.324,20.998,30.594,21.125,29.781,21.125z"/>
            <path :class="[viewTTMstyle.initPath, isChartViewable?viewTTMstyle.chartPath:'']" d="M40.469,20.875l-3.656-12h1.938l2.594,9.188h0.125l2.563-9.188H46l2.531,9.156h0.125l2.594-9.156h1.938l-3.656,12h-1.813 l-2.625-9.219h-0.188l-2.625,9.219H40.469z"/>
        </g>
    </svg>   
</template>