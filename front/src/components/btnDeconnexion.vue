<template>
    <button @click="getConnectData" class="bg-orange px-4 py-2 rounded-3xl text-white font-semibold mx-4 my-2">Déconnexion</button>
</template>

<script>
    export default {

      methods: {
        getConnectData() {
            localStorage.setItem('isConnected', false);
            this.$store.state.currentUser = ''; 
            this.$store.state.isAdmin = false; 
            this.$store.state.currentPage = 'connexionForm'; 
            this.$store.state.isConnected = false; 
            this.$store.state.jwt = '';
        },
      }

    }
</script>
