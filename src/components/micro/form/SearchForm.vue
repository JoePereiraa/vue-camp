<template>
    <div class="relative w-fit">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <v-icon name="io-search-sharp" class="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        </div>
        <input 
            type="text" 
            id="searchFilter" 
            v-model="searchQuery"
            class="bg-gray-100 rounded-xl border border-gray-300 ps-10 px-4 py-2"
            placeholder="Pesquise aqui..." 
            v-bind="$attrs"
        />
        <button v-if="searchQuery != ''" @click="clearEntry" class="absolute right-2 inset-y-0 flex items-center cursor-pointer z-10">
            <v-icon name="md-clear-round" class="w-4 h-4 text-red-400"/>
        </button>
    </div>
</template>
<script setup>
    import { ref, watch } from 'vue';
    
    import { addIcons } from 'oh-vue-icons';
    import { IoSearchSharp, MdClearRound } from 'oh-vue-icons/icons';
    addIcons(MdClearRound, IoSearchSharp);

    const emits = defineEmits(['search-event'])

    const searchQuery = ref('');
    let debounceTimeout = null

    const clearEntry = () => {
        searchQuery.value = '';
    }

    watch(() => searchQuery.value, (_newValue) => {
        clearTimeout(debounceTimeout);
        
        debounceTimeout = setTimeout(() => {
            if(_newValue == '') _newValue = null;
            emits('search-event', _newValue)
        }, 500)
    });
</script>