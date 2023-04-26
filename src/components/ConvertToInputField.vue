<script setup>
    import { watch, ref } from "vue";
    import { mainObj } from "./GlobalVars.vue"
    import { symbolTextStyleIs, buttonStyleIs, ulStyleIs, inputStyle, convFromCtnr, tide } from "./GlobalVars.vue"
    import Btn from "./Button.vue"
    import SearchIcon from "./icons/SearchIcon.vue"
    import IconList from "./icons/IconList.vue";

    const userInputConTo = ref()
    var isListConToDisplay = ref(false)

    const setConvertToSymbol = (e) => {
        let x = e.target.parentElement
        mainObj.userSettings.convertTo = x.firstElementChild.nextElementSibling.textContent
        document.getElementById("duplicateConvertTo").innerHTML = `<div class="w-full h-14 px-2 flex justify-center items-center gap-x-3">${x.innerHTML}</div>`
        userInputConTo.value = ""
        isListConToDisplay.value = false
    }
    watch (
        () => mainObj.userSettings.convertTo,
        () => {
            // console.log('updating dynList');
            mainObj.chartingData = undefined
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
        document.getElementById("duplicateConvertTo").innerHTML = `<div class="w-full h-14"></div>`
    }

    const onFocusInput = () => {
        isListConToDisplay.value = true
        userInputConTo.value = ""
    }
    const blurInput = () => {
        let x = document.getElementById("inputToField")
        x.blur()
    }
</script>

<template>
    <div :class="[convFromCtnr.outestInit, isListConToDisplay?convFromCtnr.onFocusInput:convFromCtnr.outest]">
<<<<<<< HEAD
=======

>>>>>>> 648d347 (edit18)
        <div class="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:right-full w-[100vw] h-[100svh] backdrop-blur" v-show="isListConToDisplay"></div>

        <div :class="[convFromCtnr.inner1]">
            <div :class="[convFromCtnr.inner2]">
                <IconList v-if="!isListConToDisplay" @mousedown="isListConToDisplay=!isListConToDisplay" />
                <SearchIcon v-else @mousedown="isListConToDisplay=true"/>
                <input id="inputToField" @focus="onFocusInput" v-model.trim="userInputConTo" :class="[inputStyle.symbolSearchInput]" placeholder="Convert to" type="text"/>
                <Btn v-if="!isListConToDisplay" @mousedown="clearInput" :class="[buttonStyleIs.clear]"  aria-label="clear selection of convert to currency">
                    <template #btn>Reset</template>
                </Btn>
                <Btn v-else @mousedown="isListConToDisplay=!isListConToDisplay; userInputConTo = ''" :class="[buttonStyleIs.clear]" aria-label="close drop down list of convert to currency">
                    <template #btn>Close</template>
                </Btn>
            </div>
    
            <ul @touchmove="blurInput" :class="[ulStyleIs.init, isListConToDisplay?ulStyleIs.show:ulStyleIs.hide]"  >
                <li :class="[ulStyleIs.noResult]" v-show="userInputConTo!=='' && mainObj.dynList.length==0">No results</li>
                <li v-for="list in mainObj.dynList" :class="ulStyleIs.li">
                    <Btn @mousedown="setConvertToSymbol" :class="[buttonStyleIs.dynDropList, isListConToDisplay?tide.high:tide.low]" :aria-label="list.symbol">
                        <template #btn>
                            <img class="border border-gray-900" :src="list.flagURL" :alt="list.description" style="width:48px; height:32px"/>
                            <span :class="symbolTextStyleIs.allsymbols"> {{ list.symbol }} </span>
                            <span class="text-sm break-normal"> [{{ list.description }}] </span>
                        </template>
                    </Btn>
                </li>
            </ul>
        </div>
<<<<<<< HEAD
=======

>>>>>>> 648d347 (edit18)
        <div id="duplicateConvertTo" v-show="!isListConToDisplay" class="h-16">
            <div class="w-full h-14"></div>
        </div>
    </div>
<<<<<<< HEAD


    
=======
>>>>>>> 648d347 (edit18)
</template>