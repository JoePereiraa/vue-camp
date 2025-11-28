export const filters = [
    {
        id: 1,
        displayName: "Tipo de cliente",
        searchTemplate: {
            type: "radio",
            key: "cliente_tipo"
        },
        type: "client_type",
        description: null,
        fieldType: null,
        shouldShowInContext: true
    },
    {
        id: 2,
        displayName: "Origem do cadastro adasd",
        searchTemplate: {
            type: "multiple",
            key: "origem_cadastro"
        },
        type: "origem_cadastro",
        description: null,
        fieldType: null,
        shouldShowInContext: true
    },
    {
        id: 3,
        displayName: "Origem do cliente",
        searchTemplate: {
            type: "multiple",
            key: "origem_cliente"
        },
        type: "origem_cliente",
        description: null,
        fieldType: null,
        shouldShowInContext: true
    },
    {
        id: 4, 
        displayName: "Consultores",
        searchTemplate: {
            type: "multiple",
            key: "consultores"
        },
        type: "consultores",
        description: null,
        fieldType: null,
        shouldShowInContext: true
    }
]