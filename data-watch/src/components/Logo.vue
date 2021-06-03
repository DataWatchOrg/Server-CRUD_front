<template>
    <div class="logo">
        <v-icon color="primary" class="mr-1" :x-large="!text">mdi-eye-circle</v-icon>
        <span v-if="text">
            <span class="logo-data">Data</span>Watch
        </span>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: Boolean,
            default: false
        }
    }
}
</script>


<style scoped>
 .logo {
    font-size: 27px;
    color: #1976d2;
    font-weight: 300;
    margin: 10px;
  }

  .logo-data {
    font-weight: 700;
  }

  .logo-icon-huge {
      font-size: 35px;
  }
</style>