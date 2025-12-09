<template>
    <FlexLayout class="flex-col border border-gray-200 p-4 rounded-xl shadow-sm" v-bind="$attrs">
        <slot></slot>
    </FlexLayout>
</template>
<script setup>
    import { FlexLayout } from '../grid/_index';
</script>