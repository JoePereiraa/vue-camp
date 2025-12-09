<template>
    <div class="relative w-full flex flex-col gap-1">  
      <div 
        :class="[
            'w-full bg-gray-100 rounded-xl border border-gray-300 px-4 py-2 flex items-center justify-between cursor-pointer select-none',
        ]"
        @click="isDropdownOpen = !isDropdownOpen"
      >
        <span class="truncate">{{ selectedText }}</span>
        <v-icon name="pr-chevron-down" :flip="isDropdownOpen ? 'vertical' : 'horizontal'"/>
      </div>
  
      <div v-if="isDropdownOpen" class="absolute top-[44px] bg-white border border-gray-300 p-2 rounded-md w-full">
        <div 
            v-for="option in options" 
            :key="option.value"
            :class="[ 
                'p-2 cursor-pointer flex justify-between items-center hover:bg-gray-100',
                { 'bg-gray-200 font-medium': isSelected(option.value) }
            ]"
          @click.stop="selectOption(option.value)"
        >
          {{ option.text }}
          <v-icon v-if="multiple && isSelected(option.value)" name="bi-check-lg" class="text-blue-400"/>
        </div>

        <!-- bottom left arrow -->
        <div class="left-[39px] absolute top-0 transform -translate-x-1/2 -translate-y-1/2 rotate-225 w-4 h-4 bg-white border-r border-b border-gray-300"></div>
        <!-- end bottom left arrow -->
      </div>
  
    </div>
</template>

<script setup>
    import { ref, watch, computed } from 'vue';
    import { useField } from 'vee-validate';

    import { PrChevronDown, BiCheckLg } from "oh-vue-icons/icons";
    import { addIcons } from 'oh-vue-icons';
    addIcons(PrChevronDown, BiCheckLg);

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number, Array, null],
            required: true,
        },
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    });

    const emit  = defineEmits(['update:modelValue']);

    const { value: selectedValue } = useField(
        props.name,
        undefined, 
        { 
            type: props.multiple ? 'array' : 'string',
            initialValue: props.modelValue,
        }
   );

    const isDropdownOpen = ref(false);
    const localSelected = ref(props.multiple ? selectedValue.value || [] : selectedValue.value || '');

    watch(localSelected, (newValue) => selectedValue.value = newValue );

    const selectOption = (optionValue) => {
        if (!props.multiple) {
            localSelected.value = optionValue;
            isDropdownOpen.value = false;
            emit('update:modelValue', localSelected.value);
            return
        } 

        const index = localSelected.value.indexOf(optionValue);

        if (index > -1) {
            localSelected.value.splice(index, 1); 
        } else {
            localSelected.value.push(optionValue);
        }
        
        emit('update:modelValue', localSelected.value);
    };

    const isSelected = (optionValue) => {
        if (props.multiple) {
            return localSelected.value.includes(optionValue);
        }
        return localSelected.value === optionValue;
    };

    const selectedText = computed(() => {
        if (!localSelected.value || (props.multiple && localSelected.value.length === 0)) return 'Nenhuma opção selecionada';

        if (props.multiple) {
            const labels = props.options
                .filter(opt => localSelected.value.includes(opt.value))
                .map(opt => opt.text);
            return labels.join(', ');
        }

        const selectedOption = props.options.find(opt => opt.value === localSelected.value);

        return selectedOption ? selectedOption.text : 'Nenhuma opção selecionada';
    });
</script>