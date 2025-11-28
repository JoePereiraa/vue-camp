<template>
    <GridLayout class="gap-3">
        <ColumnLayout class="col-span-5!">
            <div 
                v-for="(component, index) in components" 
                :key="index"
                class="dropdown"
            >
                <div tabindex="0" role="button" class="btn m-1 flex items-center">
                    {{ component.displayName }}
                    <button @click.stop="mountComponent(component)" class="group pointer-events-auto">
                        <v-icon name="bi-x-lg" class="group-hover:text-red-400"/>
                    </button>
                </div>
                <ul tabindex="-1" class="dropdown-content bg-base-100 border border-gray-200 rounded-box z-1 w-75 p-2 shadow-sm">
                    <li>
                        <!-- RadioForm -->
                        <RadioForm
                            v-if="component.searchTemplate.type === 'radio'"
                            :name="component.searchTemplate.key"
                            v-model="componentValues[component.searchTemplate.key]"
                            :options="items(component.searchTemplate.key)"
                            variation="primary"
                        />
                        <!-- MultiSelectSimple -->
                        <MultiSelectSimple
                            v-else-if="component.searchTemplate.type === 'multiple'"
                            :name="component.searchTemplate.key"
                            v-model="componentValues[component.searchTemplate.key]"
                            :items="items(component.searchTemplate.key)"
                        />
                        <!-- SelectForm -->
                        <SelectForm
                            v-else-if="component.searchTemplate.type === 'select'"
                            :name="component.searchTemplate.key"
                            v-model="componentValues[component.searchTemplate.key]"
                            :options="getComponentOptions(component)"
                        />
                    </li>
                </ul>
            </div>

            <div class="dropdown">
                <div tabindex="0" role="button" class="btn flex items-center">
                    <span>Filtro</span>
                    <v-icon name="bi-filter" class="group-hover:text-red-400"/>
                </div>
                <div tabindex="-1" class="dropdown-content bg-base-100 rounded-box z-1 w-75 p-2 shadow-sm">
                    <ul class="flex flex-col gap-2">
                        <li
                            v-for="(item, index) in filters"
                            :key="index"
                            @click="mountComponent(item);"
                            class="flex items-start gap-2 cursor-pointer m-h-6 group hover:bg-gray-100 rounded-sm"
                        >   
                            <input 
                                type="checkbox"
                                :class="[
                                    'checkbox',
                                    'checked:checkbox-neutral',
                                    { 'group-hover:bg-gray-300': !isComponentSelected(item) }
                                ]" 
                                :checked="isComponentSelected(item)"
                            />
                            <span>{{ item.displayName }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </ColumnLayout>

        <ColumnLayout class="col-span-7! ps-8">
            <div class="relative">
                <div class="flex items-center gap-3 justify-between h-12 border border-gray-300 bg-gray-100 rounded-2xl">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-12 h-full rounded-tl-2xl rounded-bl-2xl border-r border-r-gray-300">
                            <v-icon name="bi-grid-fill" class="text-gray-400" />
                        </div>
                        <span class="font-medium">status do cliente é</span>
                    </div>
                        <!-- MultiSelectSimple -->
                    <div class="dropdown dropdown-end me-4">
                        <div tabindex="0" role="button" class="flex items-center gap-3">
                            <span>Selecione</span>
                            <v-icon name="hi-solid-chevron-down"/>
                        </div>
                        <div tabindex="-1" class="dropdown-content bg-base-100 rounded-box z-1 w-75 p-2 shadow-sm">
                            <MultiSelectSimple
                                name="status_cliente"
                                v-model="status"
                                :items="[
                                    { id: 1, title: 'Ativo', value: 'ativo' },
                                    { id: 1, title: 'Inativo', value: 'inativo' },
                                    { id: 1, title: 'Excluido', value: 'excluido' }
                                ]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-5 h-15 border border-gray-300 border-r-0 -my-5 -ms-5 flex items-center">
                <span class="bg-blue-400 -ms-4 px-3 rounded-2xl text-white font-bold">E</span>
            </div>

            <div class="relative">
                <div class="flex items-center gap-3 justify-between h-12 border border-gray-300 bg-gray-100 rounded-2xl">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-12 h-full rounded-tl-2xl rounded-bl-2xl border-r border-r-gray-300">
                            <v-icon name="bi-grid-fill" class="text-gray-400" />
                        </div>
                        <div class="font-medium flex items-center justify-between grow gap-3 pe-1">
                            <div>
                                <span>Tempo no status atual é</span>
                                <span class="text-sm bg-blue-400 px-2 py-1 mx-2 rounded-full text-white">{{ campaingDiary ? 'Igual' : 'Maior ou Igual' }}</span>
                                <span>a:</span>
                            </div>
                            <div class="w-[225px] border border-gray-300 rounded-xl flex items-center gap-1 focus-within:border-blue-300 justify-between">
                                <input 
                                    type="number" 
                                    placeholder="Q" 
                                    min="0"
                                    max="100"
                                    class="max-w-22  px-4 py-2 focus:outline-0"
                                />

                                <span class="w-1 h-4 bg-gray-400"></span>

                                <div class="dropdown dropdown-end me-4">
                                    <div tabindex="0" role="button" class="flex items-center gap-3">
                                        <span>{{ test ?? 'Selecione' }}</span>
                                        <v-icon name="hi-solid-chevron-down"/>
                                    </div>
                                    <div tabindex="-1" class="dropdown-content bg-base-100 rounded-box z-1 w-75 p-2 shadow-sm">
                                        <RadioForm
                                            name="test"
                                            v-model="test"
                                            :options="[
                                                { id: 1, title: 'Minutos', value: 'minutos' },
                                                { id: 2, title: 'Horas', value: 'horas' },
                                                { id: 3, title: 'Dias', value: 'dias' },
                                                { id: 4, title: 'Semanas', value: 'semanas' },
                                                { id: 5, title: 'Meses', value: 'meses' }
                                            ]"
                                            variation="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ColumnLayout>
    </GridLayout>
</template>
<script setup>
  import { ref, reactive, inject } from 'vue';
  import { SelectForm, MultiSelectSimple, RadioForm } from "@/components/micro/form/_index";

  import { GridLayout, ColumnLayout } from '@/components/micro/grid/_index';

  import { PrUsers, RiRepeatOneFill, RiRepeat2Fill, BiXLg, BiFilter, BiGridFill, HiSolidChevronDown } from "oh-vue-icons/icons";
  import { addIcons } from 'oh-vue-icons';
  addIcons(PrUsers, RiRepeatOneFill, RiRepeat2Fill, BiXLg, BiFilter, BiGridFill, HiSolidChevronDown);

    import { filters } from "./construct";
    import { items } from './items';
    // const client_type = ref('lead');

    const components = ref([]);
    const componentValues = reactive({});
    const test = ref(null);
    const campaingDiary = inject('campanha-diario');

    const status = ref([]);

    // Função para obter as opções do componente (para RadioForm e SelectForm)
    const getComponentOptions = (component) => {
        // TODO: Buscar opções do backend baseado no component.type ou component.searchTemplate.key
        // Por enquanto, retornando exemplos baseados no tipo do filtro
        const key = component.searchTemplate.key;
        
        if (key === 'client_type') {
            return [
                { id: 1, title: 'Lead', value: 'lead' },
                { id: 2, title: 'Cliente', value: 'cliente' },
                { id: 3, title: 'Prospecto', value: 'prospecto' }
            ];
        }
        
        // Exemplo genérico para outros tipos
        return [
            { id: 1, title: 'Opção 1', value: 'opcao1' },
            { id: 2, title: 'Opção 2', value: 'opcao2' },
            { id: 3, title: 'Opção 3', value: 'opcao3' }
        ];
    };

    // Função para obter os items do componente (para MultiSelectSimple)
    const isComponentSelected = (component) => components.value.includes(component);

    const mountComponent = (componentReceive) => {   
        if(components.value.includes(componentReceive) == true) {
            const indexOfItem = components.value.indexOf(componentReceive);
        
            if(indexOfItem > -1) {
                components.value.splice(indexOfItem, 1);
                // Limpar o valor quando o componente é removido
                delete componentValues[componentReceive.searchTemplate.key];
            }

            return;
        }
        
        components.value.push(componentReceive);
        // Inicializar o valor do componente
        if (componentReceive.searchTemplate.type === 'multiple') {
            componentValues[componentReceive.searchTemplate.key] = [];
        } else {
            componentValues[componentReceive.searchTemplate.key] = null;
        }
    }
</script>