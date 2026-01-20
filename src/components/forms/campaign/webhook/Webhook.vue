<template>
    <form @submit="onSubmit">
        <GridLayout class="gap-5">
            <ColumnLayout>
                <GroupTextHeader>
                    <template #title>Configuração do Webhook</template>
                    <template #subtitle>siga cada passo para decidir como a campanha irá funcionar</template>
                </GroupTextHeader>
            </ColumnLayout>

            <ColumnLayout class="col-span-12">
                <CardForm>
                    <GroupTitleForm title="1. Nomeie o webhook e defina sua URL"/>

                    <GridLayout class="gap-3">
                        <ColumnLayout class="flex flex-col gap-2 col-span-7!">
                            <LabelForm>Titulo da webhook</LabelForm>
                            <FlexLayout class="flex-col gap-1!">
                                <InputForm 
                                    v-model="webhook.titulo"
                                    name="titulo"
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                                <RequiredForm v-if="e.titulo" :message="e.titulo"/>
                            </FlexLayout>
                        </ColumnLayout>

                        <ColumnLayout class="flex flex-col gap-2 col-span-5!">
                            <LabelForm>URL</LabelForm>
                            <FlexLayout class="flex-col gap-1!">
                                <InputForm 
                                    v-model="webhook.url"
                                    name="url"
                                    type="text"
                                    placeholder="Ex: http://exemplo.com.br"
                                />
                                <RequiredForm v-if="e.url" :message="e.url"/>
                            </FlexLayout>
                        </ColumnLayout>
                    </GridLayout>
                </CardForm>
            </ColumnLayout>

             <!-- 2. Metodo -->
             <ColumnLayout class="col-span-6!">
                <CardForm class="justify-between h-full">
                    <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                        <template #title>2. Metodo de Requisição</template>
                        <template #subtitle>Essa configuração define como se dará o envio de mensagens para o destinatário, disparando várias mensagens ou somente uma mensagem.</template>
                    </GroupTextHeader>
        
                    <FlexLayout class="flex-col">
                        <FlexLayout class="flex-col gap-2!">
                            <LabelForm>Metodo de Requisição</LabelForm>
                            <RadioForm 
                                v-model="webhook.metodo"
                                name="metodo"
                                :options="[
                                    {id: 1, title: 'POST', icon: 'ri-repeat-2-fill',  value: 'POST' },
                                    {id: 2, title: 'GET', icon: 'ri-repeat-one-fill', value: 'GET' },
                                ]"
                                variation="secondary"
                                :ocult_radio="true"
                            >
                                <template #options="{ item }">
                                    <!-- <v-icon :name="item.icon"/> -->
                                    {{ item.title }}
                                </template>
                            </RadioForm>
                            <RequiredForm v-if="e.metodo" :message="e.metodo"/>
                        </FlexLayout>
                    </FlexLayout>
                </CardForm>
            </ColumnLayout>

            <ColumnLayout class="col-span-12">
                <CardForm>
                    <GroupTextHeader title-class="font-medium" subtitle-class="text-sm">
                        <template #title>3. Dados a serem enviados</template>
                        <template #subtitle>Envie os dados no formato json.</template>
                    </GroupTextHeader>
                    <GridLayout class="gap-3">
                        <ColumnLayout class="flex flex-col gap-2 col-span-6!">
                            <FlexLayout class="flex-col gap-1!">
                                <InputForm 
                                    as="textarea"
                                    v-model="webhook.campos"
                                    name="campos"
                                    rows="10"
                                    placeholder="Digite aqui..."
                                    @blur="formatJson"
                                />
                                <RequiredForm v-if="e.campos" :message="e.campos"/>
                            </FlexLayout>
                        </ColumnLayout>

                        <ColumnLayout class="flex flex-col gap-2 col-span-6!">
                            <CardForm>
                                <FlexLayout class="items-center justify-between">
                                    <span class="font-semibold">Visualização de saída</span>
                                    <FlexLayout>
                                        <span class="bg-white border border-gray-300 rounded-full h-8 w-[100px] flex items-center px-2">JSON</span>
                                    </FlexLayout>
                                </FlexLayout>
                                <FlexLayout>
                                    <span class="text-sm text-gray-400">Dados exibidos abaixo somente para propósito de visualização</span>
                                </FlexLayout>
                                <VueJsonPretty v-if="isValidJson" root-path="res" :data="parseToJson" showIcon showLineNumber/>
                            </CardForm>
                           
                        </ColumnLayout>
                    </GridLayout>
                </CardForm>
            </ColumnLayout>
        </GridLayout>

        <button type="submit" class="btn bg-blue-400 rounded-lg text-white mt-2 shadow-sm">
            Salvar
        </button>
    </form>
</template>
<script setup>
    import { reactive, ref, computed } from 'vue';

    import VueJsonPretty from "vue-json-pretty";
    import "vue-json-pretty/lib/styles.css";

    import { 
        CardForm, GroupTitleForm, InputForm, 
        SelectForm, MultiSelectSimple, LabelForm, 
        RadioForm, RequiredForm, GenericFieldForm
    } from "@/components/micro/form/_index";
    import { GridLayout, ColumnLayout, FlexLayout } from '@/components/micro/grid/_index';
    import GroupTextHeader from "@/components/GroupTextHeader.vue"; 

    import { useForm } from 'vee-validate';
    import { webhookSchema } from '../validations';

    const webhook = reactive({
        titulo: '',
        url: '',
        metodo: null,
        campos: null
    });


    const { handleSubmit, isSubmitting, errors: e } = useForm({
        validationSchema: webhookSchema,
        initialValues: webhook,
        validateOnMount: false
    });

    const onSubmit = handleSubmit((values, { resetForm }) => {
        console.log(values);

        // resetForm();
    });    

    const isValidJson = computed(() => {
        if (!webhook.campos) return false;
        
        try {
            JSON.parse(webhook.campos);
            return true;
        } catch {
            return false;
        }
    });


    const parseToJson = computed(() => {
        if (!webhook.campos) return null;
        
        try {
            return JSON.parse(webhook.campos);
        } catch {
            return null;
        }
    });

    const formatJson = () => {
        if (!webhook.campos) return;
        
        try {
            const parsed = JSON.parse(webhook.campos);
            webhook.campos = JSON.stringify(parsed, null, 2); // Formata com indentação
        } catch {
            // Se não for válido, não faz nada
        }
    };
</script>