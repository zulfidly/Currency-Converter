<script setup>
    import { defineComponent, onMounted } from 'vue';
    import { fetchAPI } from "./components/GlobalVars.vue"
    import HeaderTop from "./components/HeaderTop.vue";
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';
    import GoogleChart from './components/ChartingTTM.vue'

    onMounted(() => { 
        google.charts.load('current', { 'packages': ['corechart'] });
        setTimeout(() => {
            fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") 
        }, 2000)
        console.log('App mounted');
    })

</script>

<template>
    <HeaderTop />
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
    <GoogleChart />
</template>

