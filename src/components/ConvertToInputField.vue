<script setup>
    import { watch, ref, computed } from "vue";
    import { h } from "vue"
    import { mainObj } from "../GlobalVars.js"
    import { symbolTextStyleIs, buttonStyleIs, ulStyleIs, inputStyle, convFromCtnr, tide } from "../GlobalVars.js"
    import BtnComp from "./CustomButton.vue"
    import SearchIcon from "./icons/IconSearch.vue"
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
        // console.log(mainObj.fetched);
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

    var isNoResultsTrue = computed(() => {
        if(userInputConTo!=='' && mainObj.dynList.length==0) {
            return {
                 render() {
                    return h(
                        'li',
                        {
                            class: ulStyleIs.noResult,
                            innerHTML: "No results"
                        }
                    )
                 }
            }
        }
        else return {render() { return null }}
    })

    var dropDownList = computed(() => {
        if(isListConToDisplay.value) {
            return {
                render() {
                    return mainObj.dynList.map(list => {
                        return h(
                            "li",
                            { class: ulStyleIs.li, },
                            h(
                                BtnComp,
                                {
                                    class: [buttonStyleIs.dynDropList, isListConToDisplay.value?tide.high:tide.low],
                                    ariaLabel: list.symbol,
                                    onmousedown: (e) => setConvertToSymbol(e),
                                },
                                {
                                    btn : () => [
                                        h('img', {class: 'border border-gray-900', style: {width:'48px', height:'32px'}, src: list.flagURL, alt: list.description,}),
                                        h('span', {class: symbolTextStyleIs.allsymbols, innerHTML: list.symbol}),
                                        h('span', {class: "text-sm break-normal", innerHTML: list.description}),
                                    ]                                    
                                }
                            ),
                        )    
                    })
                }
            }
        } else return {render() { return null }}
    })
    var resetOrCloseBtnComp = computed(() => {
        if(isListConToDisplay.value) {
            return {
                render() {
                    return h(
                        BtnComp,
                        {
                            class: buttonStyleIs.clear,
                            ariaLabel: "close drop down list of convert to currency",
                            onmousedown: () => { isListConToDisplay.value =! isListConToDisplay.value },
                        },
                        {
                            btn: () => "Close"
                        }
                    )
                }
            }
        } else {
            return {
                render() {
                    return h(
                        BtnComp,
                        {
                            class: buttonStyleIs.clear,
                            ariaLabel: "clear selection of convert to currency",
                            onmousedown: () => clearInput(),
                        },
                        {
                            btn: () => "Reset"
                        }
                    )
                }
            }
        }
    })

</script>

<template>
    <div :class="[convFromCtnr.outestInit, isListConToDisplay?convFromCtnr.onFocusInput:convFromCtnr.outest]">
        <div class="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:right-full w-[100vw] h-[100svh] backdrop-blur" v-show="isListConToDisplay"></div>

        <div :class="[convFromCtnr.inner1]">
            <div :class="[convFromCtnr.inner2]">
                <IconList v-if="!isListConToDisplay" @mousedown="isListConToDisplay=!isListConToDisplay" />
                <SearchIcon v-else @mousedown="isListConToDisplay=true"/>
                <input id="inputToField" @focus="onFocusInput" v-model.trim="userInputConTo" :class="[inputStyle.symbolSearchInput]" placeholder="Convert to" type="text"/>
                <resetOrCloseBtnComp />
            </div>
    
            <ul @touchmove.passive="blurInput" :class="[ulStyleIs.init, isListConToDisplay?ulStyleIs.show:ulStyleIs.hide]"  >
                <isNoResultsTrue />
                <dropDownList />
            </ul>
        </div>

        <div id="duplicateConvertTo" v-show="!isListConToDisplay" class="h-16">
            <div class="w-full h-14"></div>
        </div>
    </div>
</template>


