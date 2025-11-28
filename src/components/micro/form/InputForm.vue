<template>
    <Field
        v-bind="$attrs"
        :name="props.name"
        class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
        @update:modelValue="onInput"
    />
</template>
<script setup>
    import { Field } from 'vee-validate';
    
    const props = defineProps({
        name: {
            type: String,
            default: null
        }
    })

    const emits = defineEmits(['update:modelValue']);

    const onInput = (value) => {
        emits('update:modelValue', value);
    }
</script>