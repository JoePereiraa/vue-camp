<!-- FieldBridge.vue -->
<script setup>
  import { useField } from 'vee-validate';
  import { watch } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    rules: {
      type: [String, Object, Function],
      default: undefined
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // Apenas registra o field no vee-validate
  const { value } = useField(props.name, props.rules, {
    validateOnMount: false,
    syncVModel: false // IMPORTANTE: desabilita sincronização automática
  });
  
  // Apenas repassa o valor do componente filho para o vee-validate
  // SEM criar loop
  watch(() => props.modelValue, (newValue) => {
    value.value = newValue;
  }, { immediate: true });
  
  // Apenas repassa eventos do slot para o pai
  const handleUpdate = (newValue) => {
    emit('update:modelValue', newValue);
  };
  </script>
  
  <template>
    <slot 
      :modelValue="modelValue"
      @update:modelValue="handleUpdate"
    />
  </template>