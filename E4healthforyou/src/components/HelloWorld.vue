<template>
  
  <h1 class="green">{{ msg }}</h1>
  
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>


<style scoped>

</style>
