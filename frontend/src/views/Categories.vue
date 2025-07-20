<template>
  <div class="categories">
    <h1>دسته‌بندی‌ها</h1>

    <div v-if="loading" class="loading">در حال دریافت...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul v-if="categories.length" class="category-list">
        <li v-for="cat in categories" :key="cat.id" class="category-item">
          {{ cat.name }}
        </li>
      </ul>
      <div v-else class="empty">هنوز هیچ دسته‌بندی ثبت نشده است.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/stores/mysecond' // مطمئن باش مسیر درست است!

const categories = ref([])
const loading = ref(true)
const error = ref(null)

const fetchCategories = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await apiRequest('GET', '/api/categories/')
    // اگر جواب یک آرایه هست:
    categories.value = Array.isArray(res) ? res : (res.results ?? [])
  } catch (err) {
    error.value = err.message || 'خطا در دریافت دسته‌بندی‌ها'
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
.categories {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(80,80,80,0.04);
}
h1 {
  text-align: right;
  margin-bottom: 1.8rem;
  color: #37517e;
  font-size: 1.5rem;
}
.loading {
  text-align: center;
  color: #3b82f6;
}
.error {
  background: #fff1f0;
  color: #e53e3e;
  text-align: center;
  border-radius: 6px;
  padding: 0.8rem;
  margin: 1.5rem 0;
}
.category-list {
  list-style: none;
  padding: 0;
}
.category-item {
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.6rem;
  background: #e0e7ef;
  color: #22275b;
  border-radius: 5px;
  font-size: 1.05rem;
  transition: background 0.2s;
}
.category-item:hover {
  background: #d1d7ed;
}
.empty {
  color: #6b7280;
  text-align: center;
  padding: 1rem;
}
</style>
