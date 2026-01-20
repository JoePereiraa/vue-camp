<script setup>
  import Mount from './components/forms/campaign/informations/Mount.vue';
  import StoreCampaign from '@/components/forms/campaign/StoreCampaign.vue';
  import Webhook from './components/forms/campaign/webhook/Webhook.vue';
  import Index from './components/forms/campaign/webhook/Index.vue';
</script>

<template>
  <div class="tabs tabs-border">
    <!-- Dados da campanha -->
    <input type="radio" name="my_tabs_1" class="tab" aria-label="Dados da campanha" checked="checked"/>
    <div class="tab-content border-base-300 bg-base-100 p-10">
      <StoreCampaign/>
    </div>

    <!-- Automações -->
    <input type="radio" name="my_tabs_1" class="tab" aria-label="Automações"/>
    <div class="tab-content border-base-300 bg-base-100 p-10">
      Automações
    </div>

    <!-- Mensagens -->
    <input type="radio" name="my_tabs_1" class="tab" aria-label="Mensagens"/>
    <div class="tab-content border-base-300 bg-base-100 p-10">
      Mensagens
    </div>

    <!-- Webhook -->
    <input type="radio" name="my_tabs_1" class="tab" aria-label="Webhook"/>
    <div class="tab-content border-base-300 bg-base-100 p-10">
      <Webhook/>
    </div>

    <input type="radio" name="my_tabs_1" class="tab" aria-label="Informações e Logs"/>
      <div class="tab-content border-base-300 bg-base-100 p-10">
        <Mount/>
    </div>
  </div>
    
    <!-- <Webhook/> -->
    <!-- <Index/> -->
</template>