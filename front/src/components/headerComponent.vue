<template>
  <nav class="flex items-center justify-between bg-white px-4">
    <div class="flex items-center flex-no-shrink mr-6">
      <img src="../assets/icon-above-font.png" alt="Groupomania" class="h-36 object-contain cursor-pointer" @click="updateCurrentPage()">
    </div>

    <!-- Si l'utilisateur est Déconnecté -->
    <div v-if="$store.state.isConnected == false" class="flex flex-wrap justify-center">
      <btnConnexion></btnConnexion>
      <btnInscription></btnInscription>
    </div>

    <!-- Si l'utilisateur est connecté -->
    <div v-if="$store.state.isConnected == true" class="flex flex-wrap justify-center">
      <btnDeconnexion></btnDeconnexion>
    </div>

  </nav>
</template>


<script>
    export default {

        methods: {
            updateCurrentPage(){
              if(this.$store.state.isConnected === true){
                this.$store.state.currentPage = '';
                this.$emit('send');
              }else{
                this.$store.state.currentPage = 'connexionForm';
              }
            }
        }

    }
</script>
