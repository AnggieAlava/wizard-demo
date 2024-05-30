<template>
  <div>
    <form @submit.prevent="submit">
      <label for="name">Nombre:</label>
      <input id="name" v-model="name" type="text" required />

      <label for="lastname">Apellido:</label>
      <input id="lastname" v-model="lastname" type="text" required />

      <label for="phone">Número de Teléfono:</label>
      <input id="phone" v-model="phone" type="tel" required />

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      lastname: '',
      phone: '',
    };
  },
  methods: {
    submit() {
      console.log('Nombre:', this.name);
      console.log('Apellido:', this.lastname);
      console.log('Número de Teléfono:', this.phone);
      alert('Formulario enviado');
    },
  },
};
</script>
