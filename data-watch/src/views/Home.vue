<template>
  <!-- <hello-world /> -->
  <v-container class="login-container" fluid fill-height>
    <v-row justify="center">
      <v-card class="pa-4" max-width="300px">
        <v-row justify="center">
          <v-card-title>
            <logo text/>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                dense
                outlined
                label="E-mail"
              />
              <v-text-field
                dense
                outlined
                :type="'password'"
                label="Senha"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              class="px-4 entrar-button"
              color="blue-grey"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import Logo from '../components/Logo'

  export default {
    name: 'Home',
    components: {
      Logo
    }
  }
</script>

<style scoped>
  .login-container {
    background-color: #1976d2;
    overflow: hidden;
  }

  .entrar-button {
    color: white !important;
  }
</style>
