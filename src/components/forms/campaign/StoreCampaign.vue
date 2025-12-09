<template>
    <form 
        @submit="onSubmit" 
    >
        <GridLayout class="gap-5">
            <ColumnLayout class="col-span-7!">
                <GridLayout class="gap-3">
                    <ColumnLayout class="col-span-12">
                        <GroupTextHeader>
                            <template #title>Configuração da campanha</template>
                            <template #subtitle>siga cada passo para decidir como a campanha irá funcionar</template>
                        </GroupTextHeader>
                    </ColumnLayout>
            
                    <ColumnLayout class="col-span-12">
                        <CardForm>
                            <GroupTitleForm title="1. Nomeie a campanha e selecione uma instância"/>
            
                            <GridLayout class="gap-3">
                                <ColumnLayout class="flex flex-col gap-2 col-span-7!">
                                    <LabelForm>Titulo da campanha - {{ valuesForm?.nome_campanha }}</LabelForm>
                                    <FlexLayout class="flex-col gap-1!">
                                        <InputForm 
                                            v-model="campaing.nome_campanha"
                                            name="nome_campanha"
                                            type="text"
                                            placeholder="Digite aqui..."
                                        />
                                        <RequiredForm v-if="e.nome_campanha" :message="e.nome_campanha"/>
                                    </FlexLayout>
                                </ColumnLayout>
            
                                <ColumnLayout class="flex flex-col gap-2 col-span-5!">
                                    <LabelForm>Instância - {{ valuesForm?.instancia_id }}</LabelForm>
                                    <FlexLayout class="flex-col gap-1!">
                                        <SelectForm 
                                            name="instancia_id"
                                            v-model="campaing.instancia_id"
                                            :options="[
                                                { value: null, text: 'Nenhuma opção selecionada'},
                                                { value: 1, text: 'Instancia 01' },
                                                { value: 2, text: 'Instancia 02' },
                                                { value: 3, text: 'Instancia 03' },
                                                { value: 4, text: 'Instancia 04' },
                                            ]"
                                        >
                                        </SelectForm>
                                        <RequiredForm v-if="e.instancia_id" :message="e.instancia_id"/>
                                    </FlexLayout>
                                </ColumnLayout>
                            </GridLayout>
                        </CardForm>
                    </ColumnLayout>
            
                    <!-- Periodo de atuação -->
                    <ColumnLayout class="col-span-6!">
                        <CardForm>
                        <GroupTitleForm title="2. Defina o periodo de atuação da campanha"/>
                        
                        <FlexLayout class="flex-col">
                            <!-- Periodo de disparo -->
                            <FlexLayout class="flex-col gap-2!">
                                <LabelForm>Período de disparo - {{ valuesForm?.data_inicio }} a {{ valuesForm?.data_fim }}</LabelForm>
                                <!-- #AINDA NAO DEFINIDO -->
                                <FlexLayout class="flex-wrap">
                                    <FlexLayout class="flex-col gap-1!">
                                        <InputForm 
                                            v-model="campaing.data_inicio"
                                            name="data_inicio"
                                            type="date" 
                                            placeholder="Digite aqui" 
                                            class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                                            :max="campaing?.data_fim"
                                        />
                                        <RequiredForm v-if="e.data_inicio" :message="e.data_inicio"/>
                                    </FlexLayout>
                                        _
                                    <FlexLayout class="flex-col gap-1!">
                                        <InputForm 
                                            v-model="campaing.data_fim"
                                            name="data_fim"
                                            type="date" 
                                            placeholder="Digite aqui" 
                                            class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                                            :min="campaing?.data_inicio"
                                        />
                                        <RequiredForm v-if="e.data_fim" :message="e.data_fim"/>
                                    </FlexLayout>
                                </FlexLayout>
                            </FlexLayout>
                            <!-- Dias de disparo -->
                            <FlexLayout class="flex-col gap-2!">
                                <LabelForm>Selecione os dias de disparo das mensagens - { {{ valuesForm?.dias_disparo }}}</LabelForm>
                                <MultiSelectSimple
                                    name="dias_disparo"
                                    :items="[
                                        { id: 1, title: 'Dom.', value: 'dom' },
                                        { id: 2, title: 'Seg.', value: 'seg' },
                                        { id: 3, title: 'Ter.', value: 'ter' },
                                        { id: 4, title: 'Qua.', value: 'qua' },
                                        { id: 5, title: 'Qui.', value: 'qui' },
                                        { id: 6, title: 'Sex.', value: 'sex' },
                                        { id: 7, title: 'Sáb.', value: 'sab' }
                                    ]" 
                                    v-model="campaing.dias_disparo"
                                    variation="secondary"
                                />
                                <RequiredForm v-if="e.dias_disparo" :message="e.dias_disparo"/>
                            </FlexLayout>
                        </FlexLayout>
                        </CardForm>
                    </ColumnLayout>
            
                    <!-- Tipo de disparo -->
                    <ColumnLayout class="col-span-6!">
                        <CardForm class="justify-between h-full">
                        <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                        <template #title>3. Tipo de disparo da campanha</template>
                        <template #subtitle>Essa configuração define como se dará o envio de mensagens para o destinatário, disparando várias mensagens ou somente uma mensagem.</template>
                        </GroupTextHeader>
            
                        <FlexLayout class="flex-col">
                            <FlexLayout class="flex-col gap-2!">
                                <LabelForm>Tipo de disparo - {{ valuesForm?.disparo_unico }}</LabelForm>
                                <RadioForm 
                                    v-model="campaing.disparo_unico"
                                    name="disparo_unico"
                                    :options="[
                                        {id: 1, title: 'Disparo recorrente', icon: 'ri-repeat-2-fill',  value: false },
                                        {id: 2, title: 'Disparo único', icon: 'ri-repeat-one-fill', value: true },
                                    ]"
                                    variation="secondary"
                                    :ocult_radio="true"
                                    form-id="asgard"
                                >
                                    <template #options="{ item }">
                                        <v-icon :name="item.icon"/>
                                        {{ item.title }}
                                    </template>
                                </RadioForm>
                                <RequiredForm v-if="e.disparo_unico" :message="e.disparo_unico"/>
                            </FlexLayout>
                        </FlexLayout>
                        </CardForm>
                    </ColumnLayout>
            
                    <ColumnLayout class="col-span-12">
                        <CardForm>
                            <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                                <template #title>4. Selecione o tipo de documento para esta campanha</template>
                                <template #subtitle>siga cada passo para decidir como a campanha irá funcionar</template>
                            </GroupTextHeader>
                            <!-- Tipo de documento -->
                            <FlexLayout class="flex-col gap-1!">
                                <LabelForm>Tipo de documento - {{ valuesForm?.tipo_documento }}</LabelForm>
                                <RadioForm 
                                    form-id="store-campaign"
                                    name="tipo_documento"
                                    v-model="campaing.tipo_documento"
                                    :options="[
                                        { id: 1, title: 'Cotação',  value: 1 },
                                        { id: 2, title: 'Cliente', value: 2 },
                                        { id: 3, title: 'Indicação', value: 3 },
                                        { id: 4, title: 'Indicações do Consultor', value: 4 },
                                        { id: 5, title: 'Documentos da Cotação', value: 5 },
                                        { id: 6, title: 'Vistoria', value: 6 },
                                    ]"
                                    :ocult_radio="true"
                                />
                                <RequiredForm v-if="e.tipo_documento" :message="e.tipo_documento"/> 
                            </FlexLayout>
            
                            <FlexLayout class="flex-col">
                                <FlexLayout class="justify-between items-end">
                                    <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                                        <template #title>5. Defina as condições</template>
                                        <template #subtitle>Defina as condições para filtrar quando esta campanha estiver em execução.</template>
                                    </GroupTextHeader>
            
                                    <!-- Seleção por data -->
                                    <FlexLayout class="flex-col items-end gap-1!">
                                        <LabelForm>Seleção por data - {{ valuesForm?.diario }}</LabelForm>
                                        <RadioForm 
                                            form-id="store-campaign"
                                            name="data_selecao"
                                            v-model="campaing.diario"
                                            :options="[
                                                {id: 1, title: 'Igual', icon: 'ri-repeat-2-fill',  value: false, info: 'A data será definida como Igual ou seja dado determinado periodo...' },
                                                {id: 2, title: 'Maior ou Igual', icon: 'ri-repeat-one-fill', value: true, info: 'A data será definida como Maior ou Igual ou seja dado determinado periodo...' },
                                            ]"
                                            :ocult_radio="true"
                                        >
                                            <template #options="{ item }">
                                                <div class="tooltip tooltip-left tooltip-info" :data-tip="item.info">
                                                <v-icon :name="item.icon"/>
                                                {{ item.title }}
                                                </div>
                                            </template>
                                        </RadioForm>
                                    </FlexLayout>
                                </FlexLayout>
                                
                                <hr class="my-3 text-gray-300 w-[50%]">
            
                                <Transition name="fade">
                                    <GridLayout v-if="campaing.diario" class="gap-4 items-end">
                                        <ColumnLayout class="col-span-6!">
                                            <FlexLayout class="items-end justify-between">
                                                <GroupTextHeader title-class="text-sm font-medium text-gray-500" subtitle-class="text-sm ">
                                                    <template #title>Total de mensagens por dia</template>
                                                    <template #subtitle>Número máximo de mensagens que será enviadas via instância atual, por dia.</template>
                                                </GroupTextHeader>
                                                <!-- Total de mensagens -->
                                                <div class="relative ">
                                                    <LabelForm>{{ valuesForm?.diario_quantidade }}</LabelForm>
                                                    <InputForm 
                                                        v-model="campaing.diario_quantidade"
                                                        type="number"
                                                        name="diario_quantidade"
                                                        placeholder="Digite aqui..."
                                                        min="0"
                                                        max="1000"
                                                        class="max-w-20"
                                                    />

                                                    <div v-if="overflowRef > 0" class="inline-grid *:[grid-area:1/1] absolute right-3 top-3">
                                                        <div class="status status-error animate-ping"></div>
                                                        <div class="status status-error"></div>
                                                    </div>
                                                </div>
                                            </FlexLayout>
                                            
                                        </ColumnLayout>
            
                                        <!-- Intervalo de disparo -->
                                        <ColumnLayout class="col-span-6!">
                                            <FlexLayout class="flex-col">
                                            <LabelForm>Intervalo de disparo entre cada mensagem - {{ valuesForm?.intervalo }}</LabelForm>
                                            <div class="grid grid-cols-2 rounded-xl">
                                                <div class="dropdown dropdown-end me-4 col-span-1">
                                                    <div tabindex="0" role="button" class="w-full flex items-center bg-gray-100 gap-3 border border-gray-300 h-10 rounded-xl px-2 justify-between">
                                                        <span class="truncate">{{ formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.title ?? 'Selecione um intervalo' }}</span>
                                                        <v-icon name="hi-solid-chevron-down"/>
                                                    </div>
                                                    <div tabindex="-1" class="dropdown-content bg-base-100 rounded-box z-4 min-w-[256px] p-2 shadow-sm">
                                                        <LabelForm>Pré definição</LabelForm>
                                                        <RadioForm
                                                            form-id="asgard"
                                                            name="intervalo_disparo"
                                                            v-model="campaing.intervalo_disparo" 
                                                            :options="[
                                                                { id: 0, title: 'Selecione um intervalo', value: [] },
                                                                { id: 1, title: '15s - 30s', value: [15, 30] },
                                                                { id: 2, title: '1m - 2m', value: [60, 120] },
                                                                { id: 3, title: '2m30s - 3m', value: [90, 180] },
                                                                { id: 4, title: '3m30s - 4m30s', value: [240, 300] },
                                                                { id: 5, title: '5m - 5m30s', value: [360, 420] }
                                                            ]"
                                                            variation="primary"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="flex items-end gap-2">
                                                    <div>
                                                        <span class="text-gray-400 text-sm">{{ formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.title }}</span>
                                                        <div class="flex items-center gap-1">
                                                            <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id, [1,2,3,4,5]) }]"></div>
                                                            <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id, [2,3,4,5]) }]"></div>
                                                            <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id, [3,4,5]) }]"></div>
                                                            <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id, [4,5]) }]"></div>
                                                            <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id, [5]) }]"></div>
                                                        </div>
                                                    </div>
                                                    <span v-if="formStore.form.fields?.intervalo_disparo?.selectedValues[0]?.id == 3" class="text-xs">Médio(sugerimos esta opção)</span>
                                                </div>
                                            </div>
                                            </FlexLayout>
                                        </ColumnLayout>

                                        <ColumnLayout v-if="e.diario_quantidade || e.intervalo_disparo">
                                            <GridLayout>
                                                <ColumnLayout class="col-span-6!">
                                                    <RequiredForm v-if="e.diario_quantidade" :message="e.diario_quantidade"/> 
                                                </ColumnLayout>
                                                <ColumnLayout class="col-span-6!">
                                                    <RequiredForm v-if="e.intervalo_disparo" :message="e.intervalo_disparo"/> 
                                                </ColumnLayout>
                                            </GridLayout>
                                        </ColumnLayout>
                                        
            
                                        <!-- Horarios -->
                                        <ColumnLayout class="col-span-6!">
                                            <GroupTextHeader title-class="text-sm font-medium text-gray-500" subtitle-class="text-sm ">
                                                <template #title>Horários</template>
                                                <template #subtitle v-if="avgMessageRef">
                                                    Número máximo de mensagens que serão enviadas via instância atual, por dia. 
                                                    <br/>
                                                    <span class="text-blue-300">
                                                    (média de 
                                                    <div class="badge badge-soft badge-info">{{ avgMessageRef }}</div>
                                                    mensagens/horário definido)
                                                    </span>
                                                </template>

                                                <template #subtitle>
                                                    <RequiredForm v-if="e.horarios" :message="e.horarios"/> 
                                                </template>
                                            </GroupTextHeader>
                                        </ColumnLayout>
                                        
                                        <ColumnLayout class="col-span-6!">
                                            <GenericFieldForm 
                                                name="horarios" 
                                                v-model="campaing.horarios"
                                            >
                                                <template #default="slotProps">
                                                    <TimerPart v-bind="slotProps" />
                                                </template>
                                            </GenericFieldForm>
                                        </ColumnLayout>
                                    </GridLayout>
                                </Transition>
            
                                <div v-if="overflowRef > 0" role="alert" class="alert alert-warning alert-dash relative">
                                    <FlexLayout class="flex-col gap-2!">
                                        <FlexLayout class="items-center gap-1!">
                                            <v-icon name="md-infooutline-twotone"/>
                                            <span>Atenção a quantidade de mensagens excedeu o horário definido</span>
                                        </FlexLayout>
            
                                        <FlexLayout class="items-center">
                                            <span class="text-gray-500">Limite Excedido</span>
                                            <span class="border border-dashed border-gray-300 w-40 h-1"></span>
                                            <FlexLayout class="gap-1! items-center">
                                                <div class="badge badge-neutral badge-dash">{{ overflowRef }}</div> 
                                                <span class="text-gray-500">mensagens</span>
                                            </FlexLayout>
                                        </FlexLayout>
                                    </FlexLayout>
            
                                    <div class="inline-grid *:[grid-area:1/1] absolute right-3 top-3">
                                        <div class="status status-error animate-ping"></div>
                                        <div class="status status-error"></div>
                                    </div>
                                </div>
                            </FlexLayout>
                        </CardForm>       
                    </ColumnLayout>
                </GridLayout>
            </ColumnLayout>
            <ColumnLayout class="col-span-3!">
                <FlexLayout class="flex-col gap-2!">
                    Valores iniciais:
                    <VueJsonPretty root-path="res" :data="campaing" showIcon showLineNumber/>
                </FlexLayout>

                <FlexLayout class="flex-col gap-2!">
                    Valores finais:
                    <VueJsonPretty v-if="valuesForm !== null" root-path="res" :data="valuesForm" showIcon showLineNumber/>
                </FlexLayout>
            </ColumnLayout>
        </GridLayout>

        <button class="btn bg-blue-400 rounded-lg text-white mt-2 shadow-sm">
            Salvar
        </button>
    </form>
</template>

<script setup>
    import { reactive, ref, watch } from 'vue';

    import TimerPart from '@/components/forms/parts/SchedulesPart.vue';
    import GroupTextHeader from "@/components/GroupTextHeader.vue"; 
    import { 
        CardForm, GroupTitleForm, InputForm, 
        SelectForm, MultiSelectSimple, LabelForm, 
        RadioForm, RequiredForm, GenericFieldForm
    } from "@/components/micro/form/_index";
    import { GridLayout, ColumnLayout, FlexLayout } from '@/components/micro/grid/_index';

    import VueJsonPretty from "vue-json-pretty";
    import "vue-json-pretty/lib/styles.css";

    import { addIcons } from 'oh-vue-icons';
    import { PrUsers, RiRepeatOneFill, RiRepeat2Fill, HiSolidChevronDown, BiPlus, BiX, MdInfooutlineTwotone } from "oh-vue-icons/icons";
    addIcons(PrUsers, RiRepeatOneFill, RiRepeat2Fill, HiSolidChevronDown, BiPlus, BiX, MdInfooutlineTwotone);

    import { computeSchedule } from '@/utils/validationDatesHelper';
    import { isIn } from '@/utils/validationHelpers';
    import { useFormsStore } from '@/stores/forms';
    import { useForm, Form } from 'vee-validate';
    import { storeSchema } from './validations';

    const formStore = useFormsStore();

    const campaing = reactive({
        nome_campanha: '',
        instancia_id: null,
        dias_disparo: [],
        data_inicio: null,
        data_fim: null,
        disparo_unico: false,
        tipo_documento: null,
        diario: true,
        diario_quantidade: null,
        horarios: ['8:00', '12:00', '18:00'],
        intervalo_disparo: null
    });

    const { handleSubmit, isSubmitting, errors: e } = useForm({
        validationSchema: storeSchema,
        initialValues: campaing,
        validateOnMount: false
    });

    const avgMessageRef = ref(null);
    const overflowRef = ref(null);

    watch(() => [campaing.diario_quantidade, campaing.horarios, campaing.intervalo_disparo], ([_newValueDiaryQuantity, _newValueTime, _newInterval]) => {
        if(_newValueDiaryQuantity != null && _newValueTime.length >= 1 && _newInterval?.length == 2) {
            const {  
                totalMessages,
                avgMessage,
                avgDelaySec,
                intervals,
                overflow 
            } = computeSchedule({
                totalMessages: _newValueDiaryQuantity,
                minDelaySec: _newInterval[0],
                maxDelaySec: _newInterval[1],
                timeSlots: _newValueTime
            });


            avgMessageRef.value = avgMessage;
            overflowRef.value = overflow;
        }
    }, { deep: true });

    const valuesForm = ref(null);
    const onSubmit = handleSubmit((values, { resetForm }) => {
        valuesForm.value = values;
        console.log(values);

        // resetForm();
    });
</script>