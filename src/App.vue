<script setup>
    import { RouterView, useRouter } from "vue-router"
    import { onBeforeMount } from 'vue';
    import { fetchAPI } from "./components/GlobalVars.vue"
    import HeaderTop from "./components/HeaderTop.vue";
    import GoogleChart from "./components/ChartingTTM.vue"    
    const router = useRouter()
    router.push("/")
    onBeforeMount(() => { fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") })

</script>

<template>
    <GoogleChart />
    <HeaderTop />
    <RouterView />
</template>

