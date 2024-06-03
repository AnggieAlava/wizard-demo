<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nombre"
        required></v-text-field>

      <v-text-field
        v-model="lastname"
        :rules="nameRules"
        label="Apellido"
        required></v-text-field>

      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        label="Número Telefónico"
        required></v-text-field>

      <v-btn color="success" class="mr-4" @click="getCode">
        Solicitar codigo
      </v-btn>

      <v-text-field
        v-model="code"
        :rules="codeRules"
        label="Código code"
        required></v-text-field>

      <v-btn color="success" class="mr-4" @click="verifyCode">
        Validar Codigo
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    nameRules: [(v) => !!v || 'El nombre es requerido'],
    lastname: '',
    lastnameRules: [(v) => !!v || 'El apellido es requerido'],
    phone: '',
    phoneRules: [(v) => !!v || 'El número telefónico es requerido'],
    code: '',
    codeRules: [(v) => !!v || 'El código code es requerido'],
  }),
  methods: {
    async getCode() {
      try {
        const response = await fetch(
          `http://test.wanqara.com/api/send-code?phone=${this.phone}`,
          { mode: 'no-cors' }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Error al enviar code', error);
      }
    },
    async verifyCode() {
      try {
        const response = await fetch(
          `https://test.wanqara.com/api/verify-code?code=${this.code}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          await this.saveLead();
        } else {
          console.error('Error al verificar code', data);
        }
      } catch (error) {
        console.error('Error al verificar code', error);
      }
    },
    async saveLead() {
      try {
        const response = await fetch('https://test.wanqara.com/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            lastname: this.lastname,
            phone: this.phone,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          this.id = data.data.id;
        }
      } catch (error) {
        console.error('Error al guardar lead', error);
      }
    },
  },
};
</script>
