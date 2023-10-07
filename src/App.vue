<script setup>
    import { onMounted } from 'vue';
    import { fetchAPI } from "./GlobalVars.js"
    import { mainObj } from './GlobalVars.js';
    import HeaderTop from "./components/HeaderTop.vue";
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';
    import GoogleChart from './components/ChartingTTM.vue'

    const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
    onMounted(() => { 
        fetchAPI("constructMainObj", `${mainObj.netlifyURL}/list?access_key=${ACCESS_KEY}`) 
    })
</script>

<template>
    <HeaderTop />
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
    <GoogleChart />
</template>

