<script setup>
    import { ref, computed, watch } from 'vue';
    import { mainObj } from './GlobalVars.vue';
    import { fetchAPI } from './GlobalVars.vue';
    import { buttonStyleIs, dashboardStyle } from './GlobalVars.vue';
    import ResultDashboard from './ResultDashboard.vue';

    const amtInput = ref("")
    watch(amtInput, ()=> mainObj.fetched.result = "")
    const getConversion = () => {
        console.log(mainObj);
        let base = mainObj.userSettings.convertFrom.toLowerCase()
        let res = mainObj.userSettings.convertTo.toLowerCase()
        let amt = mainObj.userSettings.amount
        let str = "https://api.exchangerate.host/convert/?" + `from=${base}` + `&to=${res}` + `&amount=${amt}`
        fetchAPI(`convertEndpoint`, str)
        // console.log(mainObj.userSettings);
    }
    function userInputChecker(e) {
        let regex = new RegExp("[0-9]", 'g')
        const chkInput = regex.test(amtInput.value.toString())

        if(mainObj.userSettings.convertFrom && chkInput) {
            const formatter = new Intl.NumberFormat(undefined, {currency: `${mainObj.userSettings.convertFrom}`, style:"currency"})
            let str = new Intl.NumberFormat().format(amtInput.value)
            str = str.replace(/,/g, "")
            mainObj.userSettings.amount = str.toString()
            mainObj.userSettings.cFromFormattedForDisplay = formatter.format(amtInput.value)
        } else {
            mainObj.userSettings.cFromFormattedForDisplay = "-unknown input-"
            mainObj.userSettings.amount = 0
        }
        console.log(mainObj.userSettings);
    }
    watch(
        () => mainObj.userSettings.convertFrom,
        () => {
            mainObj.fetched.result = undefined
            if(mainObj.userSettings.convertFrom && mainObj.userSettings.amount) {
                const formatter = new Intl.NumberFormat(undefined, {currency: `${mainObj.userSettings.convertFrom}`, style:"currency"})
                mainObj.userSettings.cFromFormattedForDisplay = formatter.format(amtInput.value)
            }
        }
    )
    const isConvertible = computed(() => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = mainObj.userSettings.amount
        return x && y && z
    })

</script>

<template>
    <div :class="[dashboardStyle.outest]">
        <section class="flex">
            <p class="bg-[var(--color-background-mute)] rounded-l-md text-xl h-[50px] px-3 flex items-center border-dotted border-r-[0.5px] border-[var(--color-text)]"> {{ mainObj.userSettings.convertFrom  }}</p>
            <input 
            @input="userInputChecker"
            v-model="amtInput"
            class="bg-[var(--color-background-mute)] text-center text-xl w-full h-[50px] rounded-r-md tracking-widest flex items-center placeholder:text-center italic"
            placeholder="Amount" type="number"
            />
        </section>

        <ResultDashboard>
            <template #convertBtn>
                <button @click="getConversion" :class="[buttonStyleIs.convertBtn, isConvertible?buttonStyleIs.convertBtnActive:buttonStyleIs.convertBtnNotActive]">Convert</button>
            </template>
                <template #baseCurrency>{{ mainObj.userSettings.cFromFormattedForDisplay }} </template>
                <template #baseCountry> {{ mainObj.userSettings.countryFrom }}</template>
                <template #outputCurrency> {{ mainObj.fetched.result }}</template>
                <template #outputCountry> {{ mainObj.userSettings.countryTo }}</template>

                <template #rate>{{ mainObj.fetched.rate }}</template>
                <template #lastupdate> {{ mainObj.fetched.lastUpdated }}</template>


        </ResultDashboard>
    </div>
</template>