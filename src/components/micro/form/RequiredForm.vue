<template>
    <FlexLayout class="items-center">
        <div class="inline-grid *:[grid-area:1/1] -mt-[2px]">
            <div class="status status-error animate-ping"></div>
            <div class="status status-error"></div>
        </div>
        <small class="text-red-500">{{ props.message }}</small>
    </FlexLayout>
</template>
<script setup>
    import { FlexLayout } from '../grid/_index';

    const props = defineProps({
        message: {
            type: String, 
            default: 'Campo obrigatório'
        }
    });
</script>