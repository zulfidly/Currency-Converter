<script setup>
    import github from './icons/github.vue';
    import exchangehost from './icons/exchangehost.vue';
    import { headerStyleIs } from '../GlobalVars.js';

</script>

<template>
    <header :class="[headerStyleIs.header]">
        <github></github>
        <section>
            <exchangehost></exchangehost>
            <p :class="[headerStyleIs.msg]">API provider</p>
        </section>
    </header>

    <p :class="[headerStyleIs.disclaimer]">- this is a coding practice project -</p>
</template>