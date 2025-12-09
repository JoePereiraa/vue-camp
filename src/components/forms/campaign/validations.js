import * as yup from 'yup';

export const storeSchema = yup.object({
    nome_campanha: yup.string().required('O titulo da campanha é obrigatório'),
    instancia_id: yup.number().required('Selecione uma instância para continuar'),
    data_inicio: yup.date('Precisa ser uma data válida').nullable(),
    data_fim: yup.date('Precisa ser uma data válida').nullable(),
    disparo_unico: yup.string().required(),
    tipo_documento: yup.number().required('Selecione um tipo de documento para continuar'),
    data_selecao: yup.boolean(),
    diario_quantidade: yup
        .number()
        .min(1, 'A quantidade de mensagens precisa ser maior que 0')
        .when('data_selecao', {
            is: true,
            then: schema => schema.required('Defina a quantidade de mensagens por dia'),
            otherwise: schema => schema.nullable()
        }),
    intervalo_disparo: yup
        .array()
        .of(yup.number())
        .when('data_selecao', {
            is: true,
            then: schema => schema.required('Selecione um intervalo para continuar'),
            otherwise: schema => schema.nullable()
        }),
    horarios: yup
        .array()
        .min(1, 'Selecione ao menos um dia de disparo'),
    dias_disparo: yup
        .array()
});
