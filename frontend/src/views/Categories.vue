<template>
  <div class="categories">
    <h1>دسته‌بندی‌ها</h1>

    <form @submit.prevent="addCategory" class="add-form">
      <input
        v-model="newCategory"
        placeholder="نام دسته‌بندی جدید..."
        class="new-input"
        :disabled="loadingAdd"
      />
      <button :disabled="loadingAdd || !newCategory" class="add-btn">
        {{ loadingAdd ? "در حال ثبت..." : "ثبت" }}
      </button>
    </form>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul v-if="!loading" class="category-list">
      <li v-for="cat in categories" :key="cat.id" class="category-item">
        {{ cat.name }}
      </li>
    </ul>

    <div v-else>در حال بارگذاری...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/stores/mysecond'

const categories = ref([])
const loading = ref(true)
const error = ref(null)
const newCategory = ref('')
const loadingAdd = ref(false)

const fetchCategories = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await apiRequest('GET', '/api/categories/')
    categories.value = Array.isArray(res) ? res : (res.results ?? [])
  } catch (err) {
    error.value = err.message || 'خطا در دریافت دسته‌بندی‌ها'
  } finally {
    loading.value = false
  }
}

const addCategory = async () => {
  if (!newCategory.value.trim()) return
  loadingAdd.value = true
  try {
    await apiRequest('POST', '/api/categories/', { name: newCategory.value.trim() })
    newCategory.value = ''
    await fetchCategories()
  } catch (err) {
    error.value = err.message || 'خطا در افزودن دسته‌بندی'
  } finally {
    loadingAdd.value = false
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
.add-form {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  direction: rtl;
}
.new-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
}
.add-btn {
  padding: 0.6rem 1.2rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  transition: background 0.15s;
  cursor: pointer;
}
.add-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}
.error {
  color: #b91c1c;
  background: #fee2e2;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  font-size: 1rem;
}
.category-list {
  list-style: none;
  padding: 0;
}
.category-item {
  background: #eff6ff;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
</style>
