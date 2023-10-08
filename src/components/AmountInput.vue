<script setup>
    import { ref, computed, watch } from 'vue';
    import { mainObj } from '../GlobalVars.js';
    import { fetchAPI } from '../GlobalVars.js';
    import { getStartEndDates } from '../GlobalVars.js';
    import { swapCurrencies } from '../GlobalVars.js';
    import { buttonStyleIs, inputStyle, dashboardStyle, swapIconStyle } from '../GlobalVars.js';
    import ResultDashboard from './ResultDashboard.vue';
    import IconSwap from './icons/IconSwap.vue';
    // import IconViewTTM from "./icons/IconViewTTM.vue"

    const amtInput = ref("")

    watch(amtInput, ()=> mainObj.fetched.result = "")

    const isConvertible = computed(() => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = mainObj.userSettings.amount
        if(x && y && z) return true
        else return false
    })
    const isSwappable = computed(() => {
        let x = mainObj.userSettings.convertFrom
        let y = mainObj.userSettings.convertTo
        let z = mainObj.isSwapping
        if(x && y && !z) return true
        else return false
    })
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
    const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
    const getConversion = () => {
        let base = mainObj.userSettings.convertFrom
        let res = mainObj.userSettings.convertTo
        let amt = mainObj.userSettings.amount
        let str = `${mainObj.netlifyURL}/convert?access_key=${ACCESS_KEY}` + `&from=${base}` + `&to=${res}` + `&amount=${amt}`
        fetchAPI(`convertEndpoint`, str)
    }

    const viewTTM = () => {
        let base = mainObj.userSettings.convertFrom
        let res = mainObj.userSettings.convertTo
        let amt = mainObj.userSettings.amount || "1"
        let x = getStartEndDates()
        // console.log(x);
        let str = `${mainObj.netlifyURL}/timeframe?access_key=${ACCESS_KEY}` + `&base=${base}` + `&symbols=${res}` + `&amount=${amt}` + `&start_date=${x.startDate}` + `&end_date=${x.endDate}`
        fetchAPI("getChartingData", str)
    }

    function userInputChecker() {
        let regex = new RegExp("[0-9]", 'g')
        const chkInput = regex.test(amtInput.value.toString())

        if(mainObj.userSettings.convertFrom && chkInput) {
            const formatter = new Intl.NumberFormat(undefined, {currency: `${mainObj.userSettings.convertFrom}`, style:"currency"})
            let str = new Intl.NumberFormat().format(amtInput.value)
            str = str.replace(/,/g, "")
            mainObj.userSettings.amount = str.toString()
            mainObj.userSettings.cFromFormattedForDisplay = formatter.format(amtInput.value)
        } else {
            mainObj.userSettings.cFromFormattedForDisplay = "-invalid input-"
            mainObj.userSettings.amount = 0
        }
    }

</script>

<template>
    <div :class="[dashboardStyle.outest]">
        <section class="flex">
            <p :class="[dashboardStyle.baseNameTag]"> {{ mainObj.userSettings.convertFrom  }}</p>
            <input            
                name="userInputChecker"
                @input="userInputChecker"
                v-model.number="amtInput"
                :class="[inputStyle.amtinput]"
                placeholder="Amount" type="number"
            />
        </section>

        <ResultDashboard>
            <template #convertBtn>
                <button :disabled="!isSwappable" @click="swapCurrencies" :class="[swapIconStyle.init, isSwappable?swapIconStyle.swapOn:'']" aria-label="swap currencies">
                    <IconSwap />
                </button>
                <button :disabled="!isConvertible" @click="getConversion" :class="[buttonStyleIs.convertBtn, isConvertible?buttonStyleIs.convertBtnActive:buttonStyleIs.convertBtnNotActive]" aria-label="perform currency conversion">
                    Convert
                </button>
                <!-- <button :disabled="!isSwappable" @click="viewTTM" aria-label="view trailing twelve months chart" >
                    <IconViewTTM />
                </button> -->
            </template>

            <template #baseCurrency>{{ mainObj.userSettings.cFromFormattedForDisplay }} </template>
            <template #baseCountry> {{ mainObj.userSettings.countryFrom }}</template>
            <template #outputCurrency>
                <svg v-show="mainObj.isFetching" class="mx-auto w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>                    
                {{ mainObj.fetched.result }}
            </template>
            <template #outputCountry> {{ mainObj.userSettings.countryTo }}</template>
            <template #rate>{{ mainObj.fetched.rate }}</template>
            <template #lastupdate> {{ mainObj.fetched.lastUpdated }}</template>
        </ResultDashboard>
    </div>
</template>