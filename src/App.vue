<script setup>
    import { onMounted } from 'vue';
    import { fetchAPI } from "./GlobalVars.js"
    import { mainObj } from './GlobalVars.js';
    import HeaderTop from "./components/HeaderTop.vue";
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';
    import GoogleChart from './components/ChartingTTM.vue'

    onMounted(() => { 
        fetchAPI("constructMainObj", `${mainObj.netlifyURL}/list?access_key=de421138240d84290a01b8eef88060c9`) 
    })
</script>

<template>
    <HeaderTop />
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
    <GoogleChart />
</template>

