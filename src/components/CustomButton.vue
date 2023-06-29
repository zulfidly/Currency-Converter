<script setup>
    import btnsensor from "./ButtonSensor.vue"
    defineProps({
        ariaLabel: {
            type: String,
            required: true,
        },
        templateRef: {
            type: Function,
            // required: true,
        },
    })
</script>

<template>
    <button :ref="templateRef" :aria-label="ariaLabel">
        <slot name="btn"></slot>
        <btnsensor/>
    </button>
</template>