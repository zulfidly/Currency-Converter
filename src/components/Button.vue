<script setup>
    import btnsensor from "./ButtonSensor.vue"
    defineProps({
        ariaLabel: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <button :aria-label="ariaLabel">
        <slot name="btn"></slot>
        <btnsensor/>
    </button>
</template>