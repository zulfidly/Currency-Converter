<script setup>
    import { RouterView, useRouter } from "vue-router"
    import { onBeforeMount, createApp } from 'vue';
    import { fetchAPI } from "./components/GlobalVars.vue"
    import { mainObj, tide } from "./components/GlobalVars.vue";
    import HeaderTop from "./components/HeaderTop.vue";
    import IconClose from "./components/icons/IconClose.vue";
    
    const router = useRouter()
    router.push("/")
    onBeforeMount(() => { fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") })



const unmountChart = () => {
    mainObj.isChartDisplaying = false
    document.getElementById("curve_chart").innerHTML = ""
}

</script>

<template>
    <button @mousedown="unmountChart" class="fixed top-4 left-4 z-40 text-[var(--color-text)]" v-show="mainObj.isChartDisplaying">
        <IconClose />
    </button>
    <div id="curve_chart" v-show="mainObj.isChartDisplaying"> 
    
    </div>

    <HeaderTop />
    <RouterView />
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