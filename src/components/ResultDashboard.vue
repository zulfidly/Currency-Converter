<script setup>
    import { dashboardStyle } from './GlobalVars.vue';
</script>

<template>
    <div :class="[dashboardStyle.ctnr]">

        <div :class="[dashboardStyle.convertBtnDiv]">
            <slot name="convertBtn"></slot>
        </div>

        <div class="my-4 py-4 border-y-[1px] border-dotted flex justify-evenly items-center">
            <div>
                <p :class="[dashboardStyle.basecurr]">
                    <slot name="baseCurrency"></slot>
                </p>
                
                <p :class="[dashboardStyle.baseCountry]">
                    <slot name="baseCountry"></slot>
                </p>
            </div>
            <p class="text-3xl px-2">=</p>
            <div>
                <p :class="[dashboardStyle.outcurr]">
                    <slot name="outputCurrency"></slot>
                </p>
                
                <p :class="[dashboardStyle.outCountry]">
                    <slot name="outputCountry"></slot>
                </p>
            </div>
        </div>
    
        <div>
            <p :class="[dashboardStyle.rate]">
                <slot name="rate"></slot>
            </p>
            <p :class="[dashboardStyle.lastUpdate]">
                <slot name="lastupdate"></slot>
            </p>
        </div>


    </div>
</template>