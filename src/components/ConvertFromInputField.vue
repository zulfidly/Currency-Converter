<script setup>
    import { watch, ref, computed } from "vue";
    import { h } from "vue"
    import { mainObj } from "../GlobalVars.js"
    import { symbolTextStyleIs, buttonStyleIs, ulStyleIs, inputStyle, convFromCtnr, tide } from "../GlobalVars.js"
    import BtnComp from "./CustomButton.vue"
    import IconSearch from "./icons/IconSearch.vue"
    import IconList from "./icons/IconList.vue"

    const userInputConFrom = ref()
    var isListConFromDisplay = ref(false)
    const duplicateConvertFrom = ref(null)      //template refs
    const inputFromField = ref(null)            //template refs

    const setConvertFromSymbol = (e, symbol, ind, Q) => {
        let x = e.target.parentElement
        mainObj.userSettings.convertFrom = symbol
        duplicateConvertFrom.value.innerHTML = `<div class="w-full h-14 px-2 flex justify-center items-center gap-x-3">${x.innerHTML}</div>`
        userInputConFrom.value = ""
        isListConFromDisplay.value = false
    }
    watch (
        () => mainObj.userSettings.convertFrom,
        () => {
            mainObj.chartingData = undefined
            let symF = mainObj.userSettings.convertFrom
            let symT = mainObj.userSettings.convertTo
            let list = [...mainObj.allSymbols]
            let offset = 0
            mainObj.allSymbols.forEach((x, ind) => {
                if(symF == x.symbol || symT == x.symbol) {
                    list.splice(ind-offset, 1)
                    offset++
                    mainObj.dynList = list
                }
                if(symF == x.symbol) mainObj.userSettings.countryFrom = x.description
                if(symT == x.symbol) mainObj.userSettings.countryTo = x.description
            })
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
        duplicateConvertFrom.value.innerHTML = `<div class="w-full h-14"></div>`
    }

    const onFocusInput = () => {
        isListConFromDisplay.value = true
        userInputConFrom.value = ""
    }
    const blurInput = () => {
        inputFromField.value.blur()
    }

    var isNoResultsTrue = computed(() => {
        if(userInputConFrom!=='' && mainObj.dynList.length==0) {
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
        if(isListConFromDisplay.value) {
            return {
                render() {
                    return mainObj.dynList.map((list, ind) => {
                        return h(
                            "li",
                            {
                                class: ulStyleIs.li,
                            },
                            h(
                                BtnComp,
                                {
                                    class: [buttonStyleIs.dynDropList, isListConFromDisplay.value?tide.high:tide.low],
                                    ariaLabel: list.symbol,
                                    key: list.symbol,
                                    ref: undefined,
                                    onmousedown: (e) => {
                                        setConvertFromSymbol(e, list.symbol, ind, this)
                                    },
                                    // onVnodeMounted: () => console.log('onVnodeMounted :', this.$el) 
                                },
                                {
                                    btn : () => [
                                        h('img', {class: 'border border-gray-900', style: {width:'48px', height:'32px'}, src: list.flagURL, alt: list.description,}),
                                        h('span', {class: symbolTextStyleIs.allsymbols,  innerHTML: list.symbol}),
                                        h('span', {class: "text-sm break-normal", innerHTML: list.description}),
                                    ]                                    
                                }
                            ),
                        )    
                    })
                }
            }
        }
        else return {render() { return null }}
    })

    var resetOrCloseBtnComp = computed(() => {
        if(isListConFromDisplay.value) {
            return {
                render() {
                    return h(
                        BtnComp,
                        {
                            class: buttonStyleIs.clear,
                            ariaLabel: "close drop down list of convert from currency",
                            onmousedown: () => { isListConFromDisplay.value =! isListConFromDisplay.value },
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
                            ariaLabel: "clear selection of convert from currency",
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
    const toggleList = () => {
        isListConFromDisplay.value = !isListConFromDisplay.value;
        console.log('toggleList', isListConFromDisplay.value);
    } 
</script>

<template>
    <div :class="[convFromCtnr.outestInit, isListConFromDisplay?convFromCtnr.onFocusInput:convFromCtnr.outest]">
        <div class="absolute left-1/2 lg:left-full -translate-x-1/2 w-[100vw] h-[100svh] backdrop-blur" v-show="isListConFromDisplay"></div>

        <div :class="[convFromCtnr.inner1]">
            <div :class="[convFromCtnr.inner2]">
                <IconList v-if="isListConFromDisplay==false" @iconlist-emit="toggleList" />
                <IconSearch v-else @iconsearch-emit="isListConFromDisplay=true"/>
                <input ref="inputFromField" @focus="onFocusInput" v-model.trim="userInputConFrom" :class="[inputStyle.symbolSearchInput]" placeholder="Convert from" type="text"/>
                <resetOrCloseBtnComp />
            </div>

            <ul @touchmove.passive="blurInput" :class="[ulStyleIs.init, isListConFromDisplay?ulStyleIs.show:ulStyleIs.hide]"  >
                <isNoResultsTrue />
                <drop-down-list />
                <!-- <dropDownList /> -->
            </ul>
        </div>

        <div id="duplicateConvertFrom" ref="duplicateConvertFrom" v-show="!isListConFromDisplay" class="h-16">
            <div class="w-full h-14 px-2 flex items-center gap-x-3 justify-center"><img class="border border-gray-900" src="/myr.png" style="width:48px; height:32px" alt="flag of Malaysia"/><span class="text-lg font-semibold">MYR</span><span class="text-sm break-normal"> Malaysian Ringgit </span><span class="absolute top-0 left-0 w-full h-full"></span></div>        
        </div>
    </div>
</template>



