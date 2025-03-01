<script setup lang="ts" >
import "./assets/main.css";
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import { RouterView } from 'vue-router'


</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
</template>
