<template>
    <FlexLayout class="flex-col border border-gray-300 p-4 rounded-xl" v-bind="$attrs">
        <slot></slot>
    </FlexLayout>
</template>
<script setup>
    import { FlexLayout } from '../grid/_index';
</script>