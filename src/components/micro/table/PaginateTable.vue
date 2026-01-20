<template>
    <div v-if="paginate" class="my-7 lg:my-4 flex lg:justify-between justify-center items-center gap-2 flex-col lg:flex-row ">
        <div class="text-sm text-gray-600 max-md:order-3">
            Página <strong>{{ paginate.current_page }}</strong> de <strong>{{ paginate.last_page }}</strong>
        </div>

        <!-- <p class="text-sm text-gray-700 max-md:order-2">
            Mostrando
            <span class="font-medium">{{ paginate.from }} - {{ paginate.to }}</span>
            de
            <span class="font-medium">{{ paginate.total }}</span>
            resultados
        </p> -->

      <div class="flex item-center gap-2 max-md:order-1">
        <button 
            @click="prevPage"
            class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs md:text-sm lg:text-md"
            :disabled="paginate.prev_page_url === null"
        >
            Página Anterior
        </button>
      
        <button 
            @click="nextPage"
            class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs md:text-sm lg:text-md"
            :disabled="paginate.next_page_url === null"
        >
            Próxima Página
        </button>
      </div>
    </div>
    <div v-else class="bg-gray-100 p-4 rounded-b-lg">
        <span class="text-gray-900 font-medium text-sm">Paginação não foi vinculada</span>
    </div>
</template>
<script setup>
    const props = defineProps({
        paginate: {
            type: Object,
            default: null,
            required: true
        }
    })

    const emits = defineEmits(['prev-page', 'next-page']);

    const prevPage = () => emits('prev-page', extractPageFromUrl(props.paginate.prev_page_url));
    const nextPage = () => emits('next-page', extractPageFromUrl(props.paginate.next_page_url));

    const extractPageFromUrl = (url) =>  {
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('page');
        } catch (_) {
            const match = /[?&]page=(\d+)/.exec(url);
            return match ? match[1] : null;
        }
    }
</script>