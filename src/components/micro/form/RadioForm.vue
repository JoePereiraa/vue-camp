<template>
    <div class="flex flex-col gap-1">
        <div :class="[
            'flex',
            { 'flex-col gap-2 items-start rounded-none bg-transparent border-none w-full': variation == 'primary' },
            { 'items-center flex-wrap gap-1 p-1 bg-gray-100 border border-gray-300 rounded-xl w-fit': variation == 'secondary' }
        ]">
            <div 
                v-for="(item, index) in options"
                :key="item?.id ?? index"
                :class="[
                    'flex items-center gap-2 select-none',
                    { 'grow w-full': variation == 'primary' }, 
                    { 'bg-blue-400!': variation == 'secondary' && isChecked(item.value) },
                    variationClass,
                ]"
            >
                <input 
                    v-show="variation == 'primary' || !props.ocult_radio"
                    type="radio" 
                    :id="`${props.name}-${item.id}`" 
                    :name="props.name" 
                    class="radio radio-neutral" 
                    :value="item.value"
                    :checked="isChecked(item.value)"
                    @change="handleRadioChange(item.value)"
                    @blur="handleBlur"
                />
                <label 
                    :class="[
                        'text-sm font-medium cursor-pointer text-gray-500 flex grow w-full items-center gap-1',
                        { 'text-white': variation == 'secondary' && isChecked(item.value)}
                    ]" 
                    :for="`${props.name}-${item.id}`"
                >
                    <slot name="options" :item="item">
                        {{ item.title }}
                    </slot>
                </label>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { computed, onMounted, onBeforeUnmount, watch } from 'vue';
    import { useField, defineRule } from 'vee-validate';
    import { required as required_validate } from '@vee-validate/rules';
    import { useFormsStore } from '@/stores/forms';
    
    defineRule('required', required_validate);

    const props = defineProps({
        formId: {
            type: String,
            default: null,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String, Number, Boolean, null, Array],
            default: null
        },
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        required: {
            type: Boolean,
            default: false
        },
        required_message: {
            type: String,
            default: "Seleção obrigatória"
        },
        ocult_radio: {
            type: Boolean,
            default: false
        },
        variation: {
            type: String,
            default: 'secondary'
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const formsStore = useFormsStore();

    const { meta, handleChange, handleBlur } = useField(
        props.name,
        props.required ? 'required' : undefined,
        { initialValue: props.modelValue }
    );

    const isEqual = (a, b) => {
        // Comparação profunda para arrays (ex.: [15, 30])
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => item === b[index]);
        }

        // Para tipos primitivos continua a comparação simples
        return a === b;
    };

    const isChecked = (value) => isEqual(props.modelValue, value);

    const syncFieldValueToStore = (value) => {
        if (!props.formId) return;

        const selectedOption = props.options.find((option) =>
            isEqual(option.value, value)
        );

        formsStore.setFieldValue({
            formName: props.formId,
            name: props.name,
            value,
            id: selectedOption?.id ?? null,
            title: selectedOption?.title ?? null
        });
    };

    onMounted(() => {
        if (!props.formId) return;

        formsStore.registerField({
            formName: props.formId,
            name: props.name,
            type: 'radio',
            meta: {
                options: props.options
            }
        });

        syncFieldValueToStore(props.modelValue);
    });

    onBeforeUnmount(() => {
        if (!props.formId) return;

        formsStore.unregisterField({
            name: props.name
        });
    });

    watch(
        () => props.modelValue,
        (newValue) => {
            syncFieldValueToStore(newValue);
        }
    );

    const handleRadioChange = (value) => {
        if (!meta.touched) {
            handleBlur();
        }
        emit('update:modelValue', value);
        handleChange(value);
    };

    // const showRequiredMessage = computed(() => meta.touched && errorMessage.value);

    const variationClass = computed(() => {
        switch (props.variation) {
            case 'primary': return 'h-auto';
            case 'secondary': return 'h-8 border bg-white border-gray-300 rounded-full px-2';
            default: return '';
        }
    })
</script>