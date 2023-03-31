<script setup>
    import { watch, ref, computed } from "vue";
    import { mainObj } from "./GlobalVars.vue"
    import { symbolTextStyleIs, buttonStyleIs, ulStyleIs, inputStyle, convFromCtnr, tide } from "./GlobalVars.vue"
    import Btn from "./Button.vue"
    import SearchIcon from "./icons/SearchIcon.vue"
    import IconList from "./icons/IconList.vue"

    const userInputConFrom = ref()
    var isListConFromDisplay = ref(false)

    const setConvertFromSymbol = (e) => {
        let x = e.target.parentElement
        let id = e.target.parentElement.id;
        console.log(x.parentElement.parentElement);
        mainObj.userSettings.convertFrom = id
        document.getElementById("duplicateConvertFrom").innerHTML = `<div class="w-full h-14 px-2 flex justify-center items-center gap-x-3">${x.innerHTML}</div>`
        userInputConFrom.value = ""
        isListConFromDisplay.value = false

    }
    watch (
        () => mainObj.userSettings.convertFrom,
        () => {
            // console.log('updating dynList');
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
            // console.log(mainObj);
        }
    )
    watch (
        () => userInputConFrom.value,
        () => {
            let temp = []
            mainObj.allSymbols.forEach((x) => {
                let input = userInputConFrom.value.toLowerCase()
                let sym = x.symbol.toLowerCase()
                if(sym.startsWith(input) && x.symbol!==mainObj.userSettings.convertFrom && x.symbol!==mainObj.userSettings.convertTo) {
                    temp.push(x)
                }
            })
            mainObj.dynList = temp       
        }
    )

    const clearInput = () => {
        userInputConFrom.value = ""
        mainObj.userSettings.convertFrom = undefined
        mainObj.userSettings.countryFrom = undefined
        mainObj.userSettings.cFromFormattedForDisplay = undefined

        document.getElementById("duplicateConvertFrom").innerHTML = `<div class="w-full h-14"></div>`
    }

    const onFocusInput = () => {
        isListConFromDisplay.value = true
        // isListConFromDisplay.value = !isListConFromDisplay.value
        userInputConFrom.value = ""
    }
    const blurInput = () => {
        let x = document.getElementById("inputFormField")
        x.blur()
    }

</script>

<template>
    <div :class="[convFromCtnr.outestInit, isListConFromDisplay?convFromCtnr.onFocusInput:convFromCtnr.outest]">
        <div :class="[convFromCtnr.inner1]">
            <div :class="[convFromCtnr.inner2]">
                <IconList v-if="!isListConFromDisplay" @mousedown="isListConFromDisplay=!isListConFromDisplay" />
                <SearchIcon v-else @mousedown="isListConFromDisplay=true"/>
                <input id="inputFormField" @focus="onFocusInput" v-model="userInputConFrom" :class="[inputStyle.symbolSearchInput]" placeholder="Convert from" type="text"/>
                <Btn v-if="!isListConFromDisplay" @mousedown="clearInput" :class="[buttonStyleIs.clear]">
                    <template #btn>Reset</template>
                </Btn>
                <Btn v-else @mousedown="isListConFromDisplay=!isListConFromDisplay; userInputConFrom = ''" :class="[buttonStyleIs.clear]">
                    <template #btn>Close</template>
                </Btn>
            </div>
    
            <ul @touchmove="blurInput" :class="[ulStyleIs.init, isListConFromDisplay?ulStyleIs.show:ulStyleIs.hide]"  >
                <li :class="[ulStyleIs.noResult]" v-show="userInputConFrom!=='' && mainObj.dynList.length==0">No results</li>
                <li v-for="list in mainObj.dynList" :class="ulStyleIs.li">
                    <Btn @mousedown="setConvertFromSymbol" :id="list.symbol" :class="[buttonStyleIs.dynDropList, isListConFromDisplay?tide.high:tide.low]" >
                        <template #btn>
                            <img class="border border-gray-900" :src="list.flagURL" :alt="list.description"/>
                            <span :class="symbolTextStyleIs.allsymbols"> {{ list.symbol }} </span>
                            <span class="text-sm break-normal"> [{{ list.description }}] </span>
                        </template>
                    </Btn>
                </li>
            </ul>
        </div>
        <div id="duplicateConvertFrom" v-show="!isListConFromDisplay" class="h-16">
            <div class="w-full h-14 px-2 flex items-center gap-x-3 justify-center"><img class="border border-gray-900" src="https://wise.com/public-resources/assets/flags/rectangle/myr.png"><span class="text-lg font-semibold">MYR</span><span class="text-sm break-normal"> [Malaysian Ringgit] </span><span class="absolute top-0 left-0 w-full h-full"></span></div>        
        </div>
    </div>


    
</template>