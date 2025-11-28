<template>
    <span class="font-medium">{{ props.title }}</span>
</template>
<script setup>

    const props = defineProps({
        title:  {
            type: String,
            default: null,
            required: true
        }
    });
</script>