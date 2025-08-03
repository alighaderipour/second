<script setup>
import { RouterLink } from 'vue-router'
import Categories from "@/views/Categories.vue";
</script>

<template>
<RouterLink to="/">Home</RouterLink>
  <Categories />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
</style>
