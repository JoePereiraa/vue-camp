<script setup>
  import { provide, reactive, toRef, } from 'vue';
  
  import ClientForm from './components/forms/ClientForm.vue';
  import GroupTextHeader from "./components/GroupTextHeader.vue";
  import { GridLayout, ColumnLayout } from './components/micro/grid/_index';
  import { SelectForm, MultiSelectSimple, LabelForm, RadioForm } from "./components/micro/form/_index";

  import { addIcons } from 'oh-vue-icons';
  import { PrUsers, RiRepeatOneFill, RiRepeat2Fill, HiSolidChevronDown, BiPlus, BiX, MdInfooutlineTwotone } from "oh-vue-icons/icons";
  addIcons(PrUsers, RiRepeatOneFill, RiRepeat2Fill, HiSolidChevronDown, BiPlus, BiX, MdInfooutlineTwotone);

  import FlexLayout from './components/micro/grid/FlexLayout.vue';
  import GroupTitle from './components/micro/form/GroupTitle.vue';
  import TimerPart from './components/forms/parts/SchedulesPart.vue';
  import CardForm from './components/micro/form/CardForm.vue';

  import RequiredForm from './components/micro/form/RequiredForm.vue';
  
  import { computeSchedule } from './utils/validationDatesHelper';
  import { isIn } from './utils/validationHelpers';
  import { useFormsStore } from './stores/forms';

  const formStore = useFormsStore();

  const campaing = reactive({
    nome_campanha: 'Teste',
    instacia_id: 3,
    dias_disparo: [
      'qui',
      'sex'
    ],
    data_disparo: [
      '2025-11-14',
      '2025-11-30'
    ],
    disparo_unico: false,
    tipo_documento: 2,
    diario: false,
    diario_quantidade: 400,
    horarios: [
      '8:30',
      '12:00',
      '15:30',
      '18:00'
    ],
    intervalo: [60, 120]
  });

  provide('campanha-diario', toRef(campaing, 'diario'));

  const {  
    totalMessages,
    avgMessage,
    avgDelaySec,
    intervals,
    overflow 
  } = computeSchedule({
      totalMessages: campaing.diario_quantidade,
      minDelaySec: campaing.intervalo[0],
      maxDelaySec: campaing.intervalo[1],
      timeSlots: campaing.horarios
  });
</script>

<template>
  <GridLayout class="gap-5">
    <ColumnLayout>
      <pre>
        total_mensagem: {{totalMessages}}
        media_messagem: {{ avgMessage }}
        media_delay_seg: {{avgDelaySec}}
        intervalos: {{intervals}}
        ultrapassou: {{overflow}}
      </pre>
    </ColumnLayout>
    <!--Card Main-->
    <ColumnLayout class="col-span-3!">
      <div class="border border-gray-300 rounded-xl pb-5 shadow-sm top-3 bg-white">
        <div class="p-5">
          <span class="text-lg font-semibold text-gray-900">
            NT.16 - Aviso de venda parada no status (7 dias)
          </span>
        </div>

        <div class="px-3 py-4 border-gray-300 border-t border-b">
          <div class="flex items-center gap-4">
            <span class="text-gray-500">Habilitar Campanha</span>
            <input type="checkbox" checked="checked" class="toggle toggle-info" />
          </div>
        </div>

        <div class="flex flex-col p-3 gap-2 text-gray-500">
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <v-icon name="pr-users" class="w-5 h-5"/>
              <span>Clientes encontrados</span>
            </div>
            <div class="min-w-[45px] badge badge-outline badge-info">01</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <v-icon name="pr-users" class="w-5 h-5"/>
              <span>Mensagens enviadas</span>
            </div>
            <div class="min-w-[45px] badge badge-outline badge-info">05</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <v-icon name="pr-users" class="w-5 h-5"/>
              <span>Requisições enviadas</span>
            </div>
            <div class="min-w-[45px] badge badge-outline badge-info">02</div>
          </div>
        </div>
        
        <div class="px-4 flex flex-col">
          <span class="text-gray-400 text-xs">Última atualização</span>
          <span>29 de agosto 2025. 11:31pm</span>
          <!-- <span>{{ Date('h:y') }}</span> -->
          </div>
          </div>
        <div>

        <pre>
          {{ campaing }}
        </pre>
      </div>
    </ColumnLayout>

    <ColumnLayout class="col-span-9!">
      <div class="tabs tabs-lift">
        <!-- Definicões da campanha -->
        <input type="radio" name="my_tabs_3" class="tab [--tab-border-color:blue]" aria-label="Definições da Campanha" checked="checked"/>
        <div class="tab-content bg-base-100 border-base-300 p-6">
          <ColumnLayout class="col-span-9!">
            <GridLayout class="gap-3">
              <ColumnLayout class="col-span-12">
                  <GroupTextHeader>
                    <template #title>Configuração da campanha</template>
                    <template #subtitle>siga cada passo para decidir como a campanha irá funcionar</template>
                  </GroupTextHeader>
              </ColumnLayout>

              <ColumnLayout class="col-span-12">
                <CardForm>
                    <GroupTitle title="1. Nomeie a campanha e selecione uma instância"/>

                    <GridLayout class="gap-3">
                      <ColumnLayout class="flex flex-col gap-2 col-span-7!">
                        <LabelForm>Titulo da campanha</LabelForm>
                        <FlexLayout class="flex-col gap-1!">
                          <input 
                            v-model="campaing.nome_campanha"
                            type="text" 
                            placeholder="Digite aqui" 
                            class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                          />
                          <RequiredForm message="O titulo da campanha é obrigatório"/>
                        </FlexLayout>
                      </ColumnLayout>

                      <ColumnLayout class="flex flex-col gap-2 col-span-5!">
                        <LabelForm>Instância</LabelForm>
                        <FlexLayout class="flex-col gap-1!">
                            <SelectForm 
                              name="status"
                              v-model="campaing.instacia_id"
                              :options="[
                                { value: 1, text: 'Instancia 01' },
                                { value: 2, text: 'Instancia 02' },
                                { value: 3, text: 'Instancia 03' },
                                { value: 4, text: 'Instancia 04' },
                              ]"
                            >
                            </SelectForm>
                            <RequiredForm message="Selecione uma instância para continuar"/>
                        </FlexLayout>
                      </ColumnLayout>
                    </GridLayout>
                </CardForm>
              </ColumnLayout>

              <!-- Periodo de atuação -->
              <ColumnLayout class="col-span-6!">
                <CardForm>
                  <GroupTitle title="2. Defina o periodo de atuação da campanha"/>
                  
                  <FlexLayout class="flex-col">
                    <!-- Periodo de disparo -->
                    <Flex class="flex-col gap-2!">
                      <LabelForm>Período de disparo</LabelForm>
                      <!-- #AINDA NAO DEFINIDO -->
                      <FlexLayout>
                        <input 
                          v-model="campaing.data_disparo[0]"
                          type="date" 
                          placeholder="Digite aqui" 
                          class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                          :max="campaing?.data_disparo[1]"
                        />
                        _
                        <input 
                          v-model="campaing.data_disparo[1]"
                          type="date" 
                          placeholder="Digite aqui" 
                          class="bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                          :min="campaing?.data_disparo[0]"
                        />
                      </FlexLayout>
                    </Flex>
                    <!-- Dias de disparo -->
                    <FlexLayout class="flex-col gap-2!">
                      <LabelForm>Selecione os dias de disparo das mensagens</LabelForm>
                      <MultiSelectSimple
                        name="week_days"
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
                        required_message="Selecione um ou mais dias para continuar"
                      />
                    </FlexLayout>
                  </FlexLayout>
                </CardForm>
              </ColumnLayout>

              <!-- Tipo de disparo -->
              <ColumnLayout class="col-span-6!">
                <CardForm>
                  <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                  <template #title>3. Tipo de disparo da campanha</template>
                  <template #subtitle>Essa configuração define como se dará o envio de mensagens para o destinatário, disparando várias mensagens ou somente uma mensagem.</template>
                  </GroupTextHeader>

                  <FlexLayout class="flex-col">
                    <FlexLayout class="flex-col gap-2!">
                      <RadioForm 
                        form-id="asgard"
                        name="disparo_unico"
                        v-model="campaing.disparo_unico"
                        :options="[
                          {id: 1, title: 'Disparo recorrente', icon: 'ri-repeat-2-fill',  value: false },
                          {id: 2, title: 'Disparo único', icon: 'ri-repeat-one-fill', value: true },
                        ]"
                        variation="secondary"
                        :ocult_radio="true"
                      >
                        <template #options="{ item }">
                          <v-icon :name="item.icon"/>
                          {{ item.title }}
                        </template>
                      </RadioForm>
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
                    <RadioForm 
                      form-id="asgard"
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
                    <RequiredForm message="Selecione o tipo de documento dessa campanha"/> 
                  </FlexLayout>

                  <FlexLayout class="flex-col">
                    <FlexLayout class="justify-between items-end">
                      <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                        <template #title>5. Defina as condições</template>
                        <template #subtitle>Defina as condições para filtrar quando esta campanha estiver em execução.</template>
                      </GroupTextHeader>

                      <!-- Seleção por data -->
                      <FlexLayout class="flex-col items-end gap-1!">
                        <LabelForm>Seleção por data</LabelForm>
                        <RadioForm 
                          form-id="asgard"
                          name="data_selecao"
                          v-model="campaing.diario"
                          :options="[
                            {id: 1, title: 'Igual', icon: 'ri-repeat-2-fill',  value: true, info: 'A data será definida como Igual ou seja dado determinado periodo...' },
                            {id: 2, title: 'Maior ou Igual', icon: 'ri-repeat-one-fill', value: false, info: 'A data será definida como Maior ou Igual ou seja dado determinado periodo...' },
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
                      <div v-if="!campaing.diario">
                        <GridLayout class="gap-4 items-end">
                          <ColumnLayout class="col-span-6!">
                            <FlexLayout class="items-end justify-between relative">
                              <GroupTextHeader title-class="text-sm font-medium text-gray-500" subtitle-class="text-sm ">
                                <template #title>Total de mensagens por dia</template>
                                <template #subtitle>Número máximo de mensagens que será enviadas via instância atual, por dia.</template>
                              </GroupTextHeader>
                              <!-- Total de mensagens -->
                              <input 
                                v-model="campaing.diario_quantidade"
                                type="number" 
                                placeholder="Digite aqui" 
                                min="0"
                                max="1000"
                                class="max-w-20 bg-gray-100 rounded-xl border border-gray-300 px-4 py-2"
                              />

                              <div v-if="overflow > 0" class="inline-grid *:[grid-area:1/1] absolute right-3 top-3">
                                <div class="status status-error animate-ping"></div>
                                <div class="status status-error"></div>
                              </div>
                            </FlexLayout>
                          </ColumnLayout>
                          <!-- Intervalo de disparo -->
                          <ColumnLayout class="col-span-6!">
                            <FlexLayout class="flex-col">
                              <LabelForm>Intervalo de disparo entre cada mensagem</LabelForm>
                              <div class="grid grid-cols-2 rounded-xl">
                                <div class="dropdown dropdown-end me-4 col-span-1">
                                  <div tabindex="0" role="button" class="w-full flex items-center bg-gray-100 gap-3 border border-gray-300 h-10 rounded-xl px-2 justify-between">
                                      <span>{{ formStore.form.fields?.test?.selectedValues[0]?.title ?? 'Selecione' }}</span>
                                      <v-icon name="hi-solid-chevron-down"/>
                                  </div>
                                  <div tabindex="-1" class="dropdown-content bg-base-100 rounded-box z-4 w-auto p-2 shadow-sm">
                                      <LabelForm>Pré definição</LabelForm>
                                      <RadioForm
                                          form-id="asgard"
                                          name="test"
                                          v-model="campaing.intervalo" 
                                          :options="[
                                            { id: 0, title: 'Selecione um', value: [] },
                                            { id: 1, title: '15s - 30s', value: [15, 30] },
                                            { id: 2, title: '1m - 2m', value: [60, 120] },
                                            { id: 3, title: '2m30s - 3m', value: [90, 180] },
                                            { id: 4, title: '3m30s - 4m30s', value: [240, 300] },
                                            { id: 5, title: '5m - 5m30s', value: [360, 420] }
                                          ]"
                                          variation="primary"
                                      />
                                      <!-- <div class="mt-2">
                                        <LabelForm>Personalizado</LabelForm>
                                        <RangeForm v-model="range" multiple/>
                                      </div> -->
                                  </div>
                                </div>
                                <div class="flex items-end gap-2">
                                  <div>
                                    <span class="text-gray-400 text-sm">{{ formStore.form.fields?.test?.selectedValues[0]?.title }}</span>
                                    <div class="flex items-center gap-1">
                                      <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.test?.selectedValues[0]?.id, [1,2,3,4,5]) }]"></div>
                                      <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.test?.selectedValues[0]?.id, [2,3,4,5]) }]"></div>
                                      <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.test?.selectedValues[0]?.id, [3,4,5]) }]"></div>
                                      <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.test?.selectedValues[0]?.id, [4,5]) }]"></div>
                                      <div :class="['w-4 h-4 rounded-full bg-gray-300', { 'bg-blue-400!': isIn(formStore.form.fields?.test?.selectedValues[0]?.id, [5]) }]"></div>
                                    </div>
                                  </div>
                                  <span v-if="formStore.form.fields?.test?.selectedValues[0]?.id == 3" class="text-xs">Médio(sugerimos esta opção)</span>
                                </div>
                              </div>
                            </FlexLayout>
                          </ColumnLayout>
                          <!-- Horarios -->
                          <ColumnLayout class="col-span-6!">
                            <GroupTextHeader title-class="text-sm font-medium text-gray-500" subtitle-class="text-sm ">
                              <template #title>Horários</template>
                              <template #subtitle>
                                Número máximo de mensagens que serão enviadas via instância atual, por dia. 
                                <br>
                                <div class="text-blue-300">
                                  (média de 
                                  <div class="badge badge-soft badge-info">{{ avgMessage }}</div>
                                  mensagens/horário definido)
                                </div>
                              </template>
                            </GroupTextHeader>
                          </ColumnLayout>
                          <ColumnLayout class="col-span-6!">
                            <TimerPart v-model="campaing.horarios"/>
                          </ColumnLayout>
                        </GridLayout>
                      </div>
                    </Transition>

                    <div v-if="overflow > 0">
                      <div role="alert" class="alert alert-warning alert-dash relative">
                        <FlexLayout class="flex-col gap-2!">
                          <FlexLayout class="items-center gap-1!">
                            <v-icon name="md-infooutline-twotone"/>
                            <span>Atenção a quantidade de mensagens excedeu o horário definido</span>
                          </FlexLayout>
                          <FlexLayout class="items-center">
                            <span class="text-gray-500">Limite Excedido</span>
                            <span class="border border-dashed border-gray-300 w-40 h-1"></span>
                            <FlexLayout class="gap-1! items-center">
                              <div class="badge badge-neutral badge-dash">{{ overflow }}</div> 
                              <span class="text-gray-500">mensagens</span>
                            </FlexLayout>
                          </FlexLayout>
                        </FlexLayout>

                        <div class="inline-grid *:[grid-area:1/1] absolute right-3 top-3">
                          <div class="status status-error animate-ping"></div>
                          <div class="status status-error"></div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="tabs tabs-border">
                      <input type="radio" name="my_tabs_4" class="tab" aria-label="Cliente" checked/>
                      <div class="tab-content bg-base-100 border-base-300 p-6">
                        <ClientForm/>
                      </div>
                    </div> -->
                  </FlexLayout>
                </CardForm>       
              </ColumnLayout>
            </GridLayout>
          </ColumnLayout>
        </div>

        <input type="radio" name="my_tabs_3" class="tab" aria-label="Personalizar Mensagens" />
        <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

        <input type="radio" name="my_tabs_3" class="tab" aria-label="Processos" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
          <!-- <ul>
            <li>Requisicoes</li>
            <li>Disparos</li>
            <li>Mensagens enviadas</li>
          </ul> -->
        </div>
      </div>
    </ColumnLayout>
  </GridLayout>
</template>