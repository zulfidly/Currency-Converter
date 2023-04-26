<script setup>
    import { RouterView, useRouter } from "vue-router"
    import { onMounted } from 'vue';
    import { defineAsyncComponent } from "vue";
    import { fetchAPI } from "./components/GlobalVars.vue"
    import HeaderTop from "./components/HeaderTop.vue";

    const GoogleChart = defineAsyncComponent(() => 
        import("./components/ChartingTTM.vue")
    )
    const router = useRouter()
    router.push("/")
    onMounted(() => { fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") })

</script>

<template>
    <GoogleChart />
    <HeaderTop />
    <RouterView />
</template>

