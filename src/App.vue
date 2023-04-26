<script setup>
<<<<<<< HEAD
    import { RouterView, useRouter } from "vue-router"
=======
>>>>>>> 648d347 (edit18)
    import { onMounted } from 'vue';
    import { defineAsyncComponent } from "vue";
    import { fetchAPI } from "./components/GlobalVars.vue"
    import HeaderTop from "./components/HeaderTop.vue";
<<<<<<< HEAD
=======
    import ConvertFromInputField from './components/ConvertFromInputField.vue';
    import ConvertToInputField from './components/ConvertToInputField.vue';
    import AmountInput from './components/AmountInput.vue';
>>>>>>> 648d347 (edit18)

    const GoogleChart = defineAsyncComponent(() => 
        import("./components/ChartingTTM.vue")
    )
<<<<<<< HEAD
    const router = useRouter()
    router.push("/")
=======
>>>>>>> 648d347 (edit18)
    onMounted(() => { fetchAPI("constructMainObj", "https://api.exchangerate.host/symbols/") })

</script>

<template>
    <GoogleChart />
    <HeaderTop />
<<<<<<< HEAD
    <RouterView />
=======
    <ConvertFromInputField />
    <ConvertToInputField   />
    <AmountInput />
>>>>>>> 648d347 (edit18)
</template>

