<template>
  <v-container>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="ruc"
        label="RUC"
        @change="fetchRUCData"
        required></v-text-field>
      <v-text-field
        v-model="businessName"
        label="Razón Social"
        required></v-text-field>
      <v-text-field
        v-model="email"
        label="Correo Electrónico"
        required></v-text-field>
      <v-select
        v-model="selectedSubsidiary"
        :items="subsidiaries"
        item-text="commercial_name"
        label="Seleccionar Sucursal"
        @change="updateSubsidiaryDetails"
        required></v-select>
      <v-text-field
        v-model="commercialName"
        label="Nombre Comercial"
        required></v-text-field>
      <v-text-field v-model="address" label="Dirección" required></v-text-field>
      <v-btn type="submit">Actualizar Lead</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ruc: '',
      businessName: '',
      email: '',
      subsidiaries: [],
      selectedSubsidiary: null,
      commercialName: '',
      address: '',
      code: '',
    };
  },
  methods: {
    async fetchRUCData() {
      try {
        const response = await fetch(`/api/ruc/${this.ruc}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data.status) {
          this.businessName = data.data.businessname;
          this.subsidiaries = data.data.subsidiaries;
        } else {
          console.error('Error al obtener datos del RUC');
        }
      } catch (error) {
        console.error('Error al obtener datos del RUC', error);
      }
    },
    updateSubsidiaryDetails() {
      const selected = this.subsidiaries.find(
        (s) => s.commercial_name === this.selectedSubsidiary
      );
      if (selected) {
        this.commercialName = selected.commercial_name;
        this.address = selected.address;
        this.code = selected.code;
      }
    },
    async handleSubmit() {
      try {
        const response = await fetch('http://test.illarli.com/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.$route.params.name,
            lastname: this.$route.params.lastname,
            phone: this.$route.params.phone,
            ruc: this.ruc,
            businessname: this.businessName,
            email: this.email,
            commercialname: this.commercialName,
            address: this.address,
            code: this.code,
            id: this.$route.params.id,
          }),
        });
        const data = await response.json();
        if (data.status) {
          console.log('Lead actualizado correctamente');
        } else {
          console.error('Error al actualizar lead');
        }
      } catch (error) {
        console.error('Error al actualizar lead', error);
      }
    },
  },
};
</script>
