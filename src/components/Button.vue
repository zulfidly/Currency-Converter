<script setup>
    import btnsensor from "./ButtonSensor.vue"
</script>

<template>
    <button>
        <slot name="btn"></slot>
        <btnsensor/>
    </button>
</template>