<template>
    <!-- Simple Select -->
    <div :class="[
        'flex items-center gap-1 flex-wrap',
        { 'flex-col items-start': variation == 'primary' }
    ]">
        <!-- Item -->
        <div
            v-for="(item, index) in items"
            :key="item?.id ?? index"
            :class="[
                variationClass,
                'cursor-pointer select-none',
                { 'bg-blue-400! text-white outline-none': variation == 'secondary' && isChecked(item.value) }  
            ]"
            @click="variation === 'secondary' ? handleCheckboxChange(item.value) : null"
        >
            <input 
                v-show="variation == 'primary'"
                type="checkbox" 
                :id="`${props.name}-${item.id}`" 
                :name="props.name" 
                class="checkbox" 
                :value="item.value"
                :checked="isChecked(item.value)"
                @change="handleCheckboxChange(item.value)"
                @blur="handleBlur"
            />
            <label 
                :class="[
                    'text-md font-medium cursor-pointer text-gray-500 flex items-center gap-1 select-none',
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
</template>
<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { useField, defineRule } from 'vee-validate';
    import { required as required_validate } from '@vee-validate/rules';
    
    defineRule('required', required_validate);

    const emit = defineEmits(['update:modelValue']);

    const props = defineProps({
        modelValue: { 
            type: [Array, null],
            default: null
        },
        name: {
            type: String,
            default: crypto.randomUUID()
        },
        items: {
            type: Array,
            default: () => []
        },
        variation: {
            type: String,
            default: 'primary'
        }
    });

    const selectedItems = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : []);
    
    const { meta, handleChange , handleBlur } = useField(
        props.name,
        props.required ? 'required' : undefined,
        { initialValue: props.modelValue ?? [] }
    );

    const isChecked = (value) => selectedItems.value.includes(value);

    const handleCheckboxChange = (value) => {
        if (!meta.touched) handleBlur();

        const next = [...selectedItems.value];
        const indexOfItem = next.indexOf(value);

        if(indexOfItem > -1) {
            next.splice(indexOfItem, 1);
        } else {
            next.push(value);
        }

        selectedItems.value = next;
        emit('update:modelValue', next);
        handleChange(next);
    };
    
    const variationClass = computed(() => {
        switch (props.variation) {
            case 'primary': return 'text-gray-400! flex items-center gap-2';
            case 'secondary': return 'outline outline-gray-300 rounded-lg bg-gray-100 p-1 text-gray-300';
            default: return '';
        }
    })

    watch(() => props.modelValue, (value) => {
        selectedItems.value = Array.isArray(value) ? [...value] : [];
    });

    onMounted(() => {
        const checkeds = props.items.filter((item) => item.checked == true);
        checkeds.map((item) => {
            selectedItems.value.push(item.value);
        });
        emit('update:modelValue', selectedItems.value);
    });
</script>