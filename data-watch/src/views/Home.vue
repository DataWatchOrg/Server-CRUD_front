<template>
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
                v-model="form.email"
              />
              <v-text-field
                dense
                outlined
                :type="'password'"
                label="Senha"
                v-model="form.senha"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              class="px-4 entrar-button"
              color="blue-grey"
              @click="entrar"
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
  import { mapMutations } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      Logo
    },
    data () {
      return {
        form: {
          email: '',
          senha: ''
        },
        error: ''
      }
    },
    computed: {
      currentUser: {
        get () {
            return this.$store.state.currentUser
        },
        set (value) {
            this.setCurrentUser(value);
        }
      }
    },
    methods: {
      ...mapMutations([
          'setCurrentUser'
      ]),
      entrar () {
        if (this.form.email && this.form.senha) {
          axios.post('main/usuario/logar', { email: this.form.email, senha: this.form.senha})
            .then(res => {
              const user = { 'nome': res.nome, 'email': res.email}
              this.currentUser = user
              this.$router.push('/about')
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('digita, caramba')
        }
      }
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
