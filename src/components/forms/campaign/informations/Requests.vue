<template>
    <FlexLayout class="justify-between items-center mb-4">
        <SearchForm @search-event="triggerSearchEvent"/>
        <FlexLayout>
            <ActionButton href="">
                <v-icon name="bi-file-earmark-excel"/>
            </ActionButton>

            <ActionButton href="">
                <v-icon name="bi-trash"/>
            </ActionButton>

            <ActionButton href="">
                <v-icon name="bi-send"/>
            </ActionButton>

            <ActionButton href="">
                <v-icon name="bi-arrow-repeat"/>
            </ActionButton>
        </FlexLayout>
    </FlexLayout>

    <div class="overflow-x-auto">
        <table class="table table-xs">
            <thead>
                <tr>
                <th></th>
                <th>Em</th>
                <th>Tipo</th>
                <th>URL</th>
                <th>Metodo</th>
                <th>Status</th>
                <th>Dados</th>
                <th>Retorno</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th>
                    <div class="flex gap-1">
                    <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">A</div>
                    <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">B</div>
                    <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">C</div>
                    </div>
                </th>
                <th>Disparo UnixForm</th>
                <th></th>
                <th>http://unixform.com.br</th>
                <th>
                    <span class="bg-orange-400  rounded-full h-6 w-[100px] flex items-center px-2">GET</span>
                </th>
                <th></th>
                <th></th>
                <th></th>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- v-if="!isLoading && paginate" -->
    <PaginateTable
        :paginate="paginate"
        @prev-page="triggerPaginate"
        @next-page="triggerPaginate"
    />
</template>
<script setup>
    import { ref } from 'vue';
    import { SearchForm } from '@/components/micro/form/_index';

    const paginate = ref({
		current_page: 1,
		first_page_url: "https://api.fivechat.com.br/api/contas?page=1",
		from: 1,
		last_page: 2,
		last_page_url: "https://api.fivechat.com.br/api/contas?page=2",
		next_page_url: "https://api.fivechat.com.br/api/contas?page=2",
		path: "https://api.fivechat.com.br/api/contas",
		per_page: "10",
		prev_page_url: null,
		to: 10,
		total: 12
	}); 

    import { GridLayout, ColumnLayout, FlexLayout } from '@/components/micro/grid/_index';
    import { ActionButton } from '@/components/micro/buttons/_index';
    import { PaginateTable } from '@/components/micro/table/_index';

    const triggerSearchEvent = async (searchQuery) => await index(searchQuery, null);

    // const triggerPaginate = async (page) =>
    //     page ? await index(null, page) : Promise.resolve(null); 
</script>

