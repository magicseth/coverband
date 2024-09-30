<template>
  <div class="manage-cards">
    <h1>Manage Cards</h1>
    <CardEditor />
    <AllCards />
  </div>
</template>

<script setup lang="ts">
import CardEditor from '../components/CardEditor.vue'
import AllCards from '../components/AllCards.vue'
</script>

<style scoped>
.manage-cards {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>
