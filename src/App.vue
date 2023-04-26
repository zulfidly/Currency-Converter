<script setup>
    import { onMounted } from 'vue';
    import { defineAsyncComponent } from "vue";
    import { fetchAPI } from "./components/GlobalVars.vue"
    import HeaderTop from "./components/HeaderTop.vue";
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';

    const GoogleChart = defineAsyncComponent(() => 
        import("./components/ChartingTTM.vue")
    )
    onMounted(() => { fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") })

</script>

<template>
    <GoogleChart />
    <HeaderTop />
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
</template>

