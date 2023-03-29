<script setup>
    import { watch, ref } from "vue";
    import { mainObj } from "./GlobalVars.vue"
    import { symbolTextStyleIs, buttonStyleIs, ulStyleIs, convFromCtnr, tide } from "./GlobalVars.vue"
    import Btn from "./Button.vue"
    import SearchIcon from "./icons/SearchIcon.vue"

    const userInputConTo = ref()
    var isListConToDisplay = ref(false)

    const setConvertFromSymbol = (e) => {
        let x = e.target.parentElement
        let id = e.target.parentElement.id;
        mainObj.userSettings.convertTo = id
        document.getElementById("duplicateConvertTo").innerHTML = `<div class="w-full h-14 px-2 flex justify-center items-center gap-x-3">${x.innerHTML}</div>`
        // console.log(x.outerHTML);
        userInputConTo.value = ""
    }
    watch (
        () => mainObj.userSettings.convertTo,
        () => {
            // console.log('updating dynList');
            mainObj.fetched.result = undefined
            let symF = mainObj.userSettings.convertFrom
            let symT = mainObj.userSettings.convertTo
            let list = [...mainObj.allSymbols]
            let offset = 0
            mainObj.allSymbols.forEach((x, ind) => {
                if(symF == x.symbol || symT == x.symbol) {
                    // console.log('found', x.symbol, 'at ', ind);
                    list.splice(ind-offset, 1)
                    offset++
                    mainObj.dynList = list
                }
                if(symF == x.symbol) mainObj.userSettings.countryFrom = x.description
                if(symT == x.symbol) mainObj.userSettings.countryTo = x.description
            })
            // console.log(mainObj.userSettings);
        }
    )
    watch (
        () => userInputConTo.value,
        () => {
            let temp = []
            mainObj.allSymbols.forEach((x) => {
                let input = userInputConTo.value.toLowerCase()
                let sym = x.symbol.toLowerCase()
                if(sym.startsWith(input) && x.symbol!==mainObj.userSettings.convertFrom && x.symbol!==mainObj.userSettings.convertTo) {
                    temp.push(x)
                }
            })
            mainObj.dynList = temp
            // console.log(dynamicList.value);
        }
    )

    const clearInput = () => {
        console.log(mainObj.fetched);
        userInputConTo.value = ""
        mainObj.fetched = {}
        mainObj.userSettings.convertTo = undefined
        mainObj.userSettings.countryTo = undefined
        document.getElementById("duplicateConvertTo").innerHTML = ""
    }

    const onFocusInput = () => {
        isListConToDisplay.value = !isListConToDisplay.value
        userInputConTo.value = ""
    }
</script>

<template>
    <div :class="[convFromCtnr.outestInit, isListConToDisplay?convFromCtnr.onFocusInput:convFromCtnr.outest]">
        <div :class="[convFromCtnr.inner1]">
            <div :class="[convFromCtnr.inner2]">
                <SearchIcon/>
                <input @focus="onFocusInput" v-on:blur="onFocusInput" v-model="userInputConTo" :class="[buttonStyleIs.symbolSearchInput]" placeholder="Convert to" type="text"/>
                <Btn @mousedown="clearInput" :class="[buttonStyleIs.clear]">
                    <template #btn>Reset</template>
                </Btn>
            </div>
    
            <ul :class="[ulStyleIs.init, isListConToDisplay?ulStyleIs.show:ulStyleIs.hide]"  >
                <li :class="[ulStyleIs.noResult]" v-show="userInputConTo!=='' && mainObj.dynList.length==0">No results</li>
                <li v-for="list in mainObj.dynList" :class="ulStyleIs.li">
                    <Btn @mousedown="setConvertFromSymbol" :id="list.symbol" :class="[buttonStyleIs.dynDropList, isListConToDisplay?tide.high:tide.low]" >
                        <template #btn>
                            <img class="border border-gray-900" :src="list.flagURL" :alt="list.description"/>
                            <span :class="symbolTextStyleIs.allsymbols"> {{ list.symbol }} </span>
                            <span class="text-sm break-normal"> [{{ list.description }}] </span>
                        </template>
                    </Btn>
                </li>
            </ul>
        </div>
        <div id="duplicateConvertTo" v-show="!isListConToDisplay" class="h-16"></div>
    </div>


    
</template>