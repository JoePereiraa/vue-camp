import * as yup from 'yup';

export const storeSchema = yup.object({
    nome_campanha: yup.string().required('O titulo da campanha é obrigatório'),
    instacia_id: yup.number().required('Selecione uma instância para continuar'),
    data_inicio: yup.date('Precisa ser uma data válida').nullable(),
    data_fim: yup.date('Precisa ser uma data válida').nullable(),
    disparo_unico: yup.string().required(),
});

