import * as yup from 'yup';

/**Store */
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

/**Store Webhook */
export const webhookSchema = yup.object({
    titulo: yup.string().required('O titulo do webhook é obrigatório'),
    url: yup.string().url('Defina uma URL válida').required('A URL do webhook é obrigatória'),
    metodo: yup.string().oneOf(['POST', 'GET']).required('O metódo da requisição é obrigátorio'),
    campos: yup
        .string()
        .required('Os dados JSON são obrigatórios')
        .test('is-json', 'O formato JSON está inválido', (value) => {
            if (!value) return false;
            
            try {
                JSON.parse(value);
                return true;
            } catch {
                return false;
            }
        })
});