<template>
  <v-container class="px-6" fluid fill-height>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <logo light text />
      </div>

      <v-spacer/>

      <v-btn
        @click="sair"
        text
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-col align-self="start" class="py-10">
      <v-row align="baseline" class="mb-6">
        <span class="page-title">Relatório</span>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Busca"
          single-line
          hide-details
        />
      </v-row>
      <v-data-table
        :headers="headers"
        :items="registros"
        :search="search"
      ></v-data-table>
    </v-col>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Logo from '../components/Logo'
  import { mapMutations } from 'vuex'

  export default {
    name: 'RelatorioView',
    components: {
      Logo
    },
    data () {
      return {
        search: '',
        headers: [
          { text: 'Operação', value: 'operacao' },
          { text: 'Id Usuário', value: 'id_usuario' },
          { text: 'Id Operador', value: 'id_operador' },
          { text: 'Campos alterados', 
            align: 'start',
            value: 'campos_alterados' }
        ],
        registros: []
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
    mounted (){
      axios.get('listardocumentos',
        { headers: { Accept: 'application/json'} })
        .then(res => {
            this.registros = res.data;
            console.log(res.data);
        })
        .catch(error => {
            console.log(error)
        })
    },
    methods: {
      ...mapMutations([
          'setCurrentUser'
      ]),
      sair () {
        this.currentUser = null
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
.page-title {
  font-weight: 700;
  font-size: 25px;
}
</style>
