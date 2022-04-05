<template>
    <button @click="deleteAccount()" class="bg-orange px-4 py-2 rounded-3xl text-white font-semibold mx-4 my-2">Supprimer le compte</button>
</template>


<script>
    export default {
      methods: {

        async deleteAccount() {
            let userToDelete;
            if(this.$store.state.isAdmin === false){
                userToDelete = this.$store.state.currentUser
            }else {
                userToDelete = this.$store.state.currentPage
            }
            try {
                let response = await fetch("http://localhost:3000/api/deleteUser",{
                method: 'DELETE',
                body:JSON.stringify({
                    userToDelete: userToDelete
                }),
                headers:{"content-type": "application/json"}
                });

            let objectResponse = await response.json();

            if(objectResponse.message !== "Utilisateur supprimé"){
              alert("Erreur lors de la suppression");
            }else{
                if(this.$store.state.isAdmin == false){
                    this.$store.state.isConnected = false;
                    this.$store.state.currentUser = '';
                    this.$store.state.currentPage = 'connexionForm';
                }else{
                    this.$emit('send');
                }
            }
            } catch (error) {
                console.log(error);
            }
        }

      }
    }
</script>