<script setup>
    import { onMounted } from 'vue';
    import { onBeforeMount } from 'vue';
    import { fetchAPI } from "./GlobalVars.js"
    import HeaderTop from "./components/HeaderTop.vue";
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';
    import GoogleChart from './components/ChartingTTM.vue'

    onMounted(() => { 
        // setTimeout(() => {
            fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") 
        // }, 0)
    })
</script>

<template>
    <HeaderTop />
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
    <GoogleChart />
</template>

