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
        <button class="btnCSV" v-on:click="downloadCSV">Download</button>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="registros"
        :search="search"
        id="excel-table"
      ></v-data-table>
    </v-col>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Logo from '../components/Logo'
  import { mapMutations } from 'vuex'
  import * as XLSX from 'xlsx'; 

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
      },
      downloadCSV: function (){
        axios.get('relatorio',
        { headers: { Accept: 'application/download'} })
        .then(res => {
            
            let element = document.getElementById('excel-table'); 
            const ws = XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw:true});
            const wb = XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
            XLSX.writeFile(wb, 'Relatório.xlsx');

            console.log(res.data);
        })
        .catch(error => {
            console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
.page-title {
  font-weight: 700;
  font-size: 25px;
}
.btnCSV{
    background: #00ff1f;
    padding: 1px 10px 1px 10px;
    margin-left: 20px;
    color: #fff;
}
</style>
