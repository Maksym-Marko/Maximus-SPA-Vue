<template>
  
  <div
    v-if="messages.length>0 || (errors && Object.keys( errors ).length>0)"
    :style="{
      position: 'fixed',
      right: '20px',
      bottom: '20px'      
    }"
  >  

      <p 
        v-if="messages"
        v-for="message in messages"
        class="fixed p-5 bg-green-200 rounded bottom-2 right-2 max-w-xs text-green-900"
      >
        {{ message }}
      </p>

      <p 
        v-if="Object.keys( errors ).length>0" 
        v-for="error in errors"
        class="fixed p-5 bg-red-200 rounded bottom-2 right-2 max-w-xs text-red-900"
      >
        {{ error[0] }}
      </p>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import store from '@/store'

const messages = computed( () => store.getters['notify/getMessages'] )
const errors = computed( () => store.getters['notify/getErrors'] )

</script>
