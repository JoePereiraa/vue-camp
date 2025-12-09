<template>
    <FlexLayout class="items-end justify-end">
        <FlexLayout v-if="props.modelValue.length > 0">
            <div 
                v-for="(item, index) in props.modelValue.slice(0, 4)" :key="index" 
                class="w-12 h-12 flex items-center justify-center bg-blue-200 text-gray-600 text-sm rounded-sm relative"
            >
                {{ item }}
                <span 
                    class="absolute -top-2 -right-2 bg-white w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer hover:bg-red-400 hover:border-none group"
                    @click="removeSelf(item)"
                >
                    <v-icon name="bi-x" class="text-red-400 group-hover:text-white"/>
                </span>
            </div>

            <div class="dropdown dropdown-end me-4 col-span-1" v-if=" props.modelValue.slice(4).length > 0">
                <div tabindex="1" role="button" class="w-10 h-12 flex items-center justify-center bg-blue-200 rounded-sm">
                    <span class="text-blue-600 font-bold">+{{ props.modelValue.slice(4).length }}</span>
                </div>
                <div tabindex="-2" class="dropdown-content bg-base-100 rounded-box z-4 w-[300px] p-2 border border-gray-300 flex gap-3 wrap">
                    <div 
                        v-for="(item, index) in props.modelValue.slice(4)" :key="index" 
                        class="w-12 h-12 flex items-center justify-center bg-blue-200 text-gray-600 text-sm rounded-sm relative"
                    >
                        {{ item }}
                        <span 
                            class="absolute -top-2 -right-2 bg-white w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer hover:bg-red-400 hover:border-none group"
                            @click="removeSelf(item)"
                        >
                            <v-icon name="bi-x" class="text-red-400 group-hover:text-white"/>
                        </span>
                    </div>
                </div>
            </div>
        </FlexLayout>


        
        <!-- The button to open modal -->
        <label for="my_modal_7" class="w-10 h-12 flex items-center justify-center bg-blue-400 rounded-sm">
            <v-icon name="bi-plus" scale="2" class="text-white"/>
        </label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my_modal_7" class="modal-toggle" />
        <dialog class="modal" role="dialog">
            <div class="modal-box max-w-[300px]">
                <TimeForm 
                    v-model="time"
                    :control-minutes-per="30"
                />
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
            </div>
            
            <label class="modal-backdrop" for="my_modal_7">Close</label>
        </dialog>


        <!-- Dropdown -->
        <!-- <div class="dropdown dropdown-end me-4 col-span-1">
            <div tabindex="1" role="button" class="w-10 h-12 flex items-center justify-center bg-blue-400 rounded-sm">
                <v-icon name="bi-plus" scale="2" class="text-white"/>
            </div>
            <div tabindex="-2" class="dropdown-content bg-base-100 rounded-box z-4 w-[300px]">
                <TimeForm 
                    v-model="time"
                    :control-minutes-per="30"
                />
            </div>
        </div> -->
    </FlexLayout>
</template>

<script setup>
    import { ref, watch } from 'vue';

    import TimeForm from '@/components/micro/form/TimeForm.vue';
    import { FlexLayout } from '@/components/micro/grid/_index';
    
    import { addIcons } from 'oh-vue-icons';
    import { BiPlus, BiX } from "oh-vue-icons/icons";
    addIcons(BiPlus, BiX);

    const props = defineProps({
        modelValue: {
            type: Array,
            default: () => [],
            required: true
        }
    });

    const emits = defineEmits(['update:modelValue']);
    
    const time = ref(null);
    const schedules = ref([...props.modelValue]);

    const emitSchedules = (payload) => {
        schedules.value = payload;
        emits('update:modelValue', payload);
    };

    const removeSelf = (target) => {
        const next = [...schedules.value];
        const indexToRemove = next.indexOf(target);
        if (indexToRemove === -1) return;
        next.splice(indexToRemove, 1);
        emitSchedules(next);
    };

    watch(() => props.modelValue, (next) => {
        schedules.value = [...next];
    }, { immediate: true });

    watch(time, (newValue) => {
        if (!newValue) return;
        emitSchedules([...schedules.value, newValue]);
    });

</script>