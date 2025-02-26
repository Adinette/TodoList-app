<script setup >
import "./assets/main.css";
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'


</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
</template>
