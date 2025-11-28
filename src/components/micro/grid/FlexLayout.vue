<template>
    <div :class="['flex gap-3', $attrs._class]" v-bind="rest">
        <slot></slot>
    </div>
</template>
<script setup>
import { useAttrs } from 'vue';

    const { class: _class, ...rest } = useAttrs();
</script>