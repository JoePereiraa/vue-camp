<template>
    <a class="w-8 h-8 border border-gray-300 flex justify-center items-center gap-3 rounded-sm shadow-sm transition transform hover:-translate-y-0.5" v-bind="$attrs">
        <slot></slot>
        <span v-if="props.text">{{ props.text }}</span>
    </a>
</template>
<script setup>

    const props = defineProps({
        text: {
            type: String,
            default: null
        }
    })
</script>