<script setup lang="ts">
</script>

<template>
  <div class="mt-auto px-4 py-6 dark:bg-gray-100 dark:text-gray-600">
    <div class="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:space-y-0">
      <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-[#0060bf]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"
          class="w-5 h-5 rounded-full dark:text-gray-50">
          <path
            d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z">
          </path>
        </svg>
      </div>
      <ul class="flex flex-wrap pl-8 space-x-4 sm:space-x-8">
        <li>
          <router-link to="#">Instagram</router-link>
        </li>
        <li>
          <router-link to="#">Facebook</router-link>
        </li>
        <li>
          <router-link to="#">Twitter</router-link>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center pt-6 text-md">
      <span class="dark:text-gray-600">© Copyright 2025 by Adi. All Rights Reserved.</span>
    </div>
  </div>
</template>
