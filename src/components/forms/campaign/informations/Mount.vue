<template>
    <div>
        <div class="tabs tabs-border">
            <!-- Requisições -->
            <input type="radio" name="my_tabs_2" class="tab" aria-label="Requisições" checked="checked"/>
            <div class="tab-content border-base-300 bg-base-100 p-10">
                <Requests/>
            </div>

            <!-- Disparos realizados -->
            <input type="radio" name="my_tabs_2" class="tab" aria-label="Disparos realizados"/>
            <div class="tab-content border-base-300 bg-base-100 p-10">
                <SentConcluded/>
            </div>

            <!-- Mensagens enviadas -->
            <input type="radio" name="my_tabs_2" class="tab" aria-label="Mensagens enviadas"/>
            <div class="tab-content border-base-300 bg-base-100 p-10">
                <MessagesSubmited/>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Requests from './Requests.vue';
    import SentConcluded from './SentConcluded.vue';
    import MessagesSubmited from './MessagesSubmited.vue';
</script>