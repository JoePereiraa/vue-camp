export const items = (itensKey) => {
    const array = [
        {
            id: 1,
            key: 'origem_cadastro',
            values: [
                { id: 1, title: 'Site', value: 'site' },
                { id: 2, title: 'Indicação', value: 'indicacao' },
                { id: 3, title: 'WhatsApp', value: 'whatsapp' }
            ]
        },
        {
            id: 2,
            key: 'origem_cliente',
            values: [
                { id: 1, title: 'Facebook', value: 'facebook' },
                { id: 2, title: 'Instagram', value: 'instagram' },
                { id: 3, title: 'Google', value: 'google' }
            ]
        },
        {
            id: 3,
            key: 'consultores',
            values: [
                { id: 1, title: 'Consultor 1', value: 'consultor1' },
                { id: 2, title: 'Consultor 2', value: 'consultor2' },
                { id: 3, title: 'Consultor 3', value: 'consultor3' }
            ]
        },
        {
            id: 5,
            key: 'cliente_tipo',
            values: [
                { id: 1, title: 'Lead', value: 'lead' },
                { id: 2, title: 'Cliente', value: 'cliente' },
                { id: 3, title: 'Prospecto', value: 'prospecto' }
            ]
        }
    ];

    return array.filter((item) => item.key == itensKey)[0].values;
}