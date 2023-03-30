<script setup>
    import { ref, computed, watch } from 'vue';
    import { mainObj } from './GlobalVars.vue';
    import { fetchAPI } from './GlobalVars.vue';
    // import { swapCurrencies } from './GlobalVars.vue';
    import { buttonStyleIs, inputStyle, dashboardStyle, swapIconStyle } from './GlobalVars.vue';
    import ResultDashboard from './ResultDashboard.vue';
    import github from './icons/github.vue';
    import IconSwap from './icons/IconSwap.vue';

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

    const getConversion = () => {
        let base = mainObj.userSettings.convertFrom.toLowerCase()
        let res = mainObj.userSettings.convertTo.toLowerCase()
        let amt = mainObj.userSettings.amount
        let str = "https://api.exchangerate.host/convert/?" + `from=${base}` + `&to=${res}` + `&amount=${amt}`
        fetchAPI(`convertEndpoint`, str)
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
    const swapCurrencies = () => {
        mainObj.isSwapping = true
        let Fid = document.getElementById("duplicateConvertFrom").firstElementChild
        let Tid = document.getElementById("duplicateConvertTo").firstElementChild
        document.getElementById("duplicateConvertFrom").firstElementChild.classList.add("swappingFrom_To")
        document.getElementById("duplicateConvertTo").firstElementChild.classList.add("swappingTo_From")

        var r = document.querySelector(':root')
        var rs = getComputedStyle(r)
        let delay = rs.getPropertyValue("--swap-duration")
        delay = Number(delay.replace(/ms/g, ""))

        setTimeout(timeout, delay)

        function timeout() {
            console.log('setTimeout at swap currencies');
            Fid.classList.remove("swappingFrom_To")
            Tid.classList.remove("swappingTo_From")
            document.getElementById("duplicateConvertTo").innerHTML = Fid.outerHTML
            document.getElementById("duplicateConvertFrom").innerHTML = Tid.outerHTML
            let q = mainObj.userSettings.convertFrom.toString()
            let w = mainObj.userSettings.convertTo.toString()
            mainObj.userSettings.convertFrom = w
            mainObj.userSettings.convertTo = q
            mainObj.isSwapping = false
        }
    }
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
                <button :disabled="!isSwappable" @click="swapCurrencies" :class="[swapIconStyle.init, isSwappable?swapIconStyle.swapOn:'']">
                    <IconSwap />
                </button>
                <button :disabled="!isConvertible" @click="getConversion" :class="[buttonStyleIs.convertBtn, isConvertible?buttonStyleIs.convertBtnActive:'']">
                    Convert
                </button>
            </template>

            <template #baseCurrency>{{ mainObj.userSettings.cFromFormattedForDisplay }} </template>
            <template #baseCountry> {{ mainObj.userSettings.countryFrom }}</template>
            <template #outputCurrency>
                <svg v-if="mainObj.isFetching" class="mx-auto w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
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