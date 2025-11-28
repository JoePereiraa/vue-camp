<template>
    <!-- Simple Select -->
    <div :class="[
        'flex items-center gap-1',
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
    <span v-if="showRequiredMessage" class="text-sm text-red-400">{{ required_message }}</span>
</template>
<script setup>
    import { computed, onMounted, ref } from 'vue';
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
        required: {
            type: Boolean,
            default: false
        },
        required_message: {
            type: String,
            default: "Seleção obrigatória"
        },
        variation: {
            type: String,
            default: 'primary'
        }
    });

    const selectedItems = ref(Array.isArray(props.modelValue) ? [...props.modelValue] : [])
    
    const { errorMessage, meta, handleChange , handleBlur } = useField(
        props.name,
        props.required ? 'required' : undefined,
        { initialValue: props.modelValue ?? [] }
    );

    const isChecked = (value) => props.modelValue.includes(value);

    const handleCheckboxChange = (value) => {
        if (!meta.touched) handleBlur();
        
        if(selectedItems.value.includes(value) == true) {
            const indexOfItem = selectedItems.value.indexOf(value);
        
            if(indexOfItem > -1) selectedItems.value.splice(indexOfItem, 1);
            return;
        }

        selectedItems.value.push(value);
        
        emit('update:modelValue', selectedItems.value);
        handleChange(value);
    };

    const showRequiredMessage = computed(() => props.required && meta.touched && errorMessage);
    
    const variationClass = computed(() => {
        switch (props.variation) {
            case 'primary': return 'text-gray-400! flex items-center gap-2';
            case 'secondary': return 'outline outline-gray-300 rounded-lg bg-gray-100 p-1 text-gray-300';
            default: return '';
        }
    })

    onMounted(() => {
        const checkeds = props.items.filter((item) => item.checked == true);
        checkeds.map((item) => {
            selectedItems.value.push(item.value);
        });
        emit('update:modelValue', selectedItems.value);
    });
</script>