<script setup>
    import HeaderTop from "./components/HeaderTop.vue";
    import { RouterView, useRouter } from "vue-router"
    import { onBeforeMount } from 'vue';
    import { fetchAPI } from "./components/GlobalVars.vue"
    
    const router = useRouter()
    router.push("/")
    
    onBeforeMount(() => {
      fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/")
    })
</script>

<template>

    <HeaderTop />
    <RouterView />
    
</template>







