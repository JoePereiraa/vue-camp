import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFormsStore = defineStore('forms', () => {
    const form = ref({
        form_name: null,
        fields: {}
    });

    const resetForm = (formName = null) => {
        form.value = {
            form_name: formName,
            fields: {}
        };
    };

    /**
     * Sempre que um campo de um formulário diferente for registrado,
     * o formulário atual é automaticamente substituído.
     */
    const ensureFormName = (formName) => {
        if (!formName) return;
        if (form.value.form_name !== formName) {
            resetForm(formName);
        }
    };

    const registerField = ({ formName, name, type = 'radio', meta = {} }) => {
        if (!formName || !name) return;
        ensureFormName(formName);

        const existing = form.value.fields[name];

        if (!existing) {
            form.value.fields[name] = {
                name,
                type,
                selectedValues: [],
                meta: { ...meta }
            };
        } else {
            form.value.fields[name] = {
                ...existing,
                meta: {
                    ...existing.meta,
                    ...meta
                }
            };
        }
    };

    const unregisterField = ({ name }) => {
        if (!name) return;
        if (!form.value.fields[name]) return;

        delete form.value.fields[name];
    };

    const setFieldValue = ({ formName, name, value, title = null, id = null }) => {
        if (!formName || !name) return;
        ensureFormName(formName);

        if (!form.value.fields[name]) {
            form.value.fields[name] = {
                name,
                type: 'radio',
                selectedValues: [],
                meta: {}
            };
        }

        form.value.fields[name].selectedValues = [
            {
                id,
                title,
                value
            }
        ];
    };

    return {
        form,
        resetForm,
        registerField,
        unregisterField,
        setFieldValue
    };
});


