<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="125"
      height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/form">Form</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
