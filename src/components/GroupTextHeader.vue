<template>
    <div class="flex flex-col gap-1" v-bind="$attrs">
        <component :is="props.title"
            v-if="$slots.title"
            :class="['font-bold text-gray-900', props.titleClass]" 
        >
            <slot name="title"></slot>
        </component>
        <component :is="props.subtitle" 
            v-if="$slots.subtitle"
            :class="['text-gray-500', props.subtitleClass]"
        >
            <slot name="subtitle"></slot>
        </component>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: {
            type: String, 
            default: 'h5',
            validator: (v) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(v)
        },
        subtitle: {
            type: String, 
            default: 'h6',
            validator: (v) => ['h5', 'h6', 'small'].includes(v)
        },
        titleClass: {
            type: String,
            default: ''
        },
        subtitleClass: {
            type: String,
            default: ''
        }
    });
</script>

<!-- text-lg  -->