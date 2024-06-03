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
        <RouterLink to="/">OTP</RouterLink>
        <RouterLink to="/form">RUC</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
