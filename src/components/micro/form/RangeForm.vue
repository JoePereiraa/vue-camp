

<template>
  <div class="relative min-w-[300px] h-12">
    <div class="absolute top-5/12 w-full h-3 bg-gray-300 rounded-full translate-y-6/12">
      <div 
        class="absolute h-full bg-linear-to-r from-blue-400/25 to-blue-400 rounded-sm" 
        :style="{ left: rangeStart + '%', width: rangeWidth + '%' }"
      ></div>
    </div>

    <input 
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="localMin"
      @input="validateMin"
      :style="{ zIndex: multiple ? 2 : 1 }"
    />

    <input 
      v-if="multiple"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="localMax"
      @input="validateMax"
      style="z-index: 2;"
    />

    <div class="values-display">
      <div v-if="multiple" class="flex items-center justify-between px-5">
        <div class="font-medium flex flex-col">
            {{ localMin }}
        </div>
        <span class="font-medium flex flex-col">
            {{ localMax }}
        </span>
    </div>
      <span v-else>Valor: {{ localMin }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  // Se 'true', teremos dois handles (min/max). Se 'false', apenas um.
  multiple: {
    type: Boolean,
    default: false,
  },
  // Valor inicial. Pode ser number (único) ou [min, max] (múltiplo).
  modelValue: {
    type: [Number, Array],
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:modelValue']);

// --- Estado Local ---

// Inicializa os valores. Se 'multiple' for true, garante que é um array.
const localMin = ref(props.multiple ? props.modelValue[0] : props.modelValue);
const localMax = ref(props.multiple ? props.modelValue[1] : props.max); 

// --- Watchers para Sincronização e Validação ---

// Sincroniza o estado local com a prop 'modelValue' quando o componente é montado ou a prop muda
watch(() => props.modelValue, (newValue) => {
    if (props.multiple) {
        localMin.value = newValue[0];
        localMax.value = newValue[1];
    } else {
        localMin.value = newValue;
    }
}, { immediate: true });

// Emite a mudança de valor
const handleUpdate = () => {
  if (props.multiple) {
    // Garante que o min nunca seja maior que o max
    if (localMin.value > localMax.value) {
      // Ajusta o min para o valor do max, ou vice-versa, para evitar inversão
      // Neste exemplo simples, vamos apenas garantir a ordem no array
      emit('update:modelValue', [localMin.value, localMax.value].sort((a, b) => a - b));
    } else {
      emit('update:modelValue', [localMin.value, localMax.value]);
    }
  } else {
    emit('update:modelValue', localMin.value);
  }
};

// --- Lógica para a Barra de Conexão (Highlight) ---

// Calcula a porcentagem de deslocamento (left) para a barra de highlight
const clampPercentage = (value) => Math.min(100, Math.max(0, value));
const normalizeWidth = (start, width) => Math.max(0, Math.min(100 - start, width));

const rangeStart = computed(() => {
    if (props.multiple) {
        // Para seleção múltipla, a barra começa no min
        return clampPercentage(((localMin.value - props.min) / (props.max - props.min)) * 100);
    }
    // Para seleção única, a barra começa em 0%
    return 0;
});

// Calcula a largura da barra de highlight (width)
const rangeWidth = computed(() => {
    const range = props.max - props.min;
    if (range <= 0) {
        return 0;
    }

    if (props.multiple) {
        // A largura é a diferença entre max e min
        const start = rangeStart.value;
        const width = clampPercentage(((localMax.value - localMin.value) / range) * 100);
        return normalizeWidth(start, width);
    }
    // A largura é do 0 até o valor do handle
    const width = clampPercentage(((localMin.value - props.min) / range) * 100);
    return normalizeWidth(0, width);
});

// Assegura que o handle de mínimo não ultrapasse o handle de máximo
const validateMin = () => {
    if (props.multiple && localMin.value > localMax.value) {
        localMin.value = localMax.value;
    }
    handleUpdate();
}

// Assegura que o handle de máximo não ultrapasse o handle de mínimo
const validateMax = () => {
    if (props.multiple && localMax.value < localMin.value) {
        localMax.value = localMin.value;
    }
    handleUpdate();
}
</script>

<style scoped>
    input[type=range] {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    appearance: none; 
    background: transparent; 
    cursor: pointer;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1px solid #007bff;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #FFF;
        cursor: pointer;
        margin-top: 2px; 
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px; 
        background: transparent;
        border-radius: 4px;
    }

    input[type=range]:nth-of-type(2) {
        z-index: 3; 
    }
</style>