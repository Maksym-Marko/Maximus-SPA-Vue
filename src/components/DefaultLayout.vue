<template>

    <Navigation />
   
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        
        <router-view />

      </div>
    </main>    

    <FlashMessage />
    
</template>

<script setup>
    import Navigation from '@/components/Navigation.vue'
    import FlashMessage from '@/components/FlashMessage.vue'
</script>