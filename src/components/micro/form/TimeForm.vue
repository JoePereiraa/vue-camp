<template>
    <div class="max-w-[300px] min-h-[300px] border border-gray-300 rounded-xl p-4 flex flex-col gap-4 justify-between">
        <div class="flex flex-col items-center gap-2">
            <span class="font-medium">Horário</span>
            <hr class="text-gray-200 w-full border"/>
        </div>

        <div class="flex justify-center gap-8">
            <div class="flex flex-col gap-3 w-fit">
                <button type="button" class="btn border bg-white border-gray-300 rounded-lg p-2" @click="incrementHour">
                    <v-icon name="hi-solid-chevron-down" flip="vertical"/>
                </button>
                <div class="flex flex-col items-center">
                    <input type="number" :value="hour" class="font-semibold text-lg text-center w-[40px] focus:outline-0 ml-4" min="0" max="23">
                    <span class="text-gray-500">{{ hour > 1 ? 'horas' : 'hora' }}</span>
                </div>
                <button type="button" class="btn border bg-white border-gray-300 rounded-lg p-2" @click="decrementHour">
                    <v-icon name="hi-solid-chevron-down"/>
                </button>
            </div>

            <div class="flex flex-col gap-3 w-fit">
                <button type="button" class="btn border bg-white border-gray-300 rounded-lg p-2" @click="incrementMinute">
                    <v-icon name="hi-solid-chevron-down" flip="vertical"/>
                </button>
                <div class="flex flex-col items-center">
                    <input type="number" :value="minute" class="font-semibold text-lg text-center w-[40px] focus:outline-0 ml-4" min="0" max="59">
                    <span class="text-gray-500">min</span>
                </div>
                <button type="button" class="btn border bg-white border-gray-300 rounded-lg p-2" @click="decrementMinute">
                    <v-icon name="hi-solid-chevron-down"/>
                </button>
            </div>
        </div>
        
        <span class="text-center font-medium text-gray-700">{{ formattedTime }}</span>

        <div class="flex flex-col items-center gap-4">
            <hr class="text-gray-200 w-full border"/>
            <div class="flex flex-col gap-3 w-full">
                <button type="button" class="btn bg-blue-500 rounded-lg text-white" @click.stop="triggerTime">OK</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, watch } from 'vue';
    import { addHours, addMinutes, subHours, subMinutes, format, parse } from 'date-fns';

    import { addIcons } from 'oh-vue-icons';
    import { HiSolidChevronDown } from 'oh-vue-icons/icons';
    addIcons(HiSolidChevronDown);
    
    const props = defineProps({
        modelValue: {
            type: [String, Date],
            default: null,
            required: false
        },
        controlMinutesPer: {
            type: Number,
            default: 1,
            validator: (value) => [1, 5, 15, 30].includes(value)
        }
    });

    const emits = defineEmits(['update:modelValue']);

    const resolveToDate = (value) => {
        if (value instanceof Date) {
            const clone = new Date(value.getTime());
            clone.setSeconds(0, 0);
            return clone;
        }
        if (typeof value === 'string' && value.length > 0) {
            const parsed = parse(value, 'HH:mm', new Date());
            parsed.setSeconds(0, 0);
            return parsed;
        }
        const date = new Date();
        date.setHours(8, 30, 0, 0);
        return date;
    };

    const currentTime = ref(resolveToDate(props.modelValue));

    watch(() => props.modelValue, (next) => {
        currentTime.value = resolveToDate(next);
    });

    const hour = computed(() => currentTime.value.getHours());
    const minute = computed(() => currentTime.value.getMinutes());
    const formattedTime = computed(() => format(currentTime.value, 'HH : mm'));

    const incrementHour = () => currentTime.value = addHours(currentTime.value, 1);
    const decrementHour = () => currentTime.value = subHours(currentTime.value, 1);

    const incrementMinute = () => currentTime.value = addMinutes(currentTime.value, props.controlMinutesPer);
    const decrementMinute = () => currentTime.value = subMinutes(currentTime.value, props.controlMinutesPer);

    const triggerTime = () => {
        emits('update:modelValue', format(currentTime.value, 'HH:mm'));
    }
</script>