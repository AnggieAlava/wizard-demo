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
        Solicitar código
      </v-btn>
      <v-text-field
        v-model="code"
        :rules="codeRules"
        label="Código"
        required></v-text-field>
      <v-btn color="success" class="mr-4" @click="verifyCode">
        Validar Código
      </v-btn>
      <v-text-field
        v-if="id"
        v-model="ruc"
        :rules="rucRules"
        label="Número de RUC"
        required
        append-icon="mdi-magnify"
        @click:append="openModalRuc"></v-text-field>
    </v-form>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline">Crear Demo</v-card-title>
        <v-card-text>
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
            <v-text-field
              v-model="address"
              label="Dirección"
              required></v-text-field>
            <v-btn type="submit">Crear Demo</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nameRules: [(v) => !!v || 'El nombre es requerido'],
      lastname: '',
      lastnameRules: [(v) => !!v || 'El apellido es requerido'],
      phone: '',
      phoneRules: [(v) => !!v || 'El número telefónico es requerido'],
      code: '',
      codeRules: [(v) => !!v || 'El código es requerido'],
      ruc: '',
      rucRules: [(v) => !!v || 'El número de RUC es requerido'],
      id: null,
      dialog: false,
      valid: true,
      businessName: '',
      email: '',
      subsidiaries: ['001', '002', '003'],
      selectedSubsidiary: null,
      commercialName: '',
      address: '',
    };
  },
  methods: {
    async getCode() {
      try {
        const phone = this.phone.replace(/^0+/, ''); // Remove leading zeros
        const response = await fetch(
          `https://test.wanqara.com/api/send-code?phone=${phone}`,
          { mode: 'no-cors' }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Error al enviar código', error);
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
          console.error('Error al verificar código', data);
        }
      } catch (error) {
        console.error('Error al verificar código', error);
      }
    },
    async saveLead() {
      try {
        const phone = this.phone.replace(/^0+/, ''); // Remove leading zeros
        const response = await fetch('https://test.wanqara.com/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            lastname: this.lastname,
            phone: phone,
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
    openModalRuc() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
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
      }
    },
    async handleSubmit() {
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
            ruc: this.ruc,
            businessname: this.businessName,
            email: this.email,
            commercialname: this.commercialName,
            address: this.address,
            id: this.id,
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
