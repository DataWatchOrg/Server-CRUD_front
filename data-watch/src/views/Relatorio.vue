<template>
  <v-card>
    <v-card-title>
      Relatório
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Busca"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="registros"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'RelatorioView',
    data () {
      return {
        search: '',
        headers: [
          { text: 'Campos alterados', 
            align: 'start',
            value: 'campos_alterados' },
          { text: 'Id Usuário', value: 'id_usuario' },
          { text: 'Operação', value: 'operacao' },
          { text: 'Id Operador', value: 'id_operador' },
        ],
        registros: []
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
    }
  }
</script>
