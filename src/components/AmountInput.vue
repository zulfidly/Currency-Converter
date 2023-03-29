<script setup>
    import { ref, computed, watch } from 'vue';
    import { mainObj } from './GlobalVars.vue';
    import { fetchAPI } from './GlobalVars.vue';
    import { buttonStyleIs, inputStyle, dashboardStyle } from './GlobalVars.vue';
    import ResultDashboard from './ResultDashboard.vue';
    import github from './icons/github.vue';

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
        let domrectF = document.getElementById("duplicateConvertFrom").getBoundingClientRect()
        let domrectT = document.getElementById("duplicateConvertTo").getBoundingClientRect()
        console.log(domrectF);
        console.log(domrectT);
        mainObj.swapCurr.from.top = domrectF.top + "px"
        mainObj.swapCurr.from.left = domrectF.left + "px"
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
            <p :class="[dashboardStyle.baseNameTag]"> {{ mainObj.userSettings.convertFrom  }}</p>
            <input 
            @input="userInputChecker"
            v-model="amtInput"
            :class="[inputStyle.amtinput]"
            placeholder="Amount" type="number"
            />
        </section>

        <ResultDashboard>
            <template #convertBtn>
                <button @click="getConversion" :class="[buttonStyleIs.convertBtn, isConvertible?buttonStyleIs.convertBtnActive:buttonStyleIs.convertBtnNotActive]">
                    Convert
                    <svg v-if="mainObj.isFetching" class="absolute left-full mt-[5px] ml-2 w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    
                </button>
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