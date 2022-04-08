<template>
  <div id="app" class="bg-rose min-h-screen">
    <headerComponent @send="getPostsData"></headerComponent>
    <div class="flex justify-center">
      <div class="my-4 mx-4 w-full md:w-2/4">

        <!-- Page des posts -->
        <div v-if="$store.state.isConnected == true">
          <inputText class="bg-white" @send="getPostsData"></inputText>

          <!-- Boucle des posts -->
          <div v-for="post in posts" :key="post.id" class="mt-4">
            <post v-bind:post="post" @send="getPostsData"></post>
          </div>
        </div>

        <!-- Fomulaire de connexion -->
        <div v-if="$store.state.isConnected == false && $store.state.currentPage == 'connexionForm'" class="mt-4">
          <connexionForm @send="getPostsData"></connexionForm>
        </div>

        <!-- Fomulaire d'inscription -->
        <div v-if="$store.state.isConnected == false && $store.state.currentPage == 'inscriptionForm'" class="mt-4">
          <inscriptionForm @send="getPostsData"></inscriptionForm>
        </div>

        <!-- Bouton suppression de compte -->
        <div v-if="($store.state.isConnected == true && $store.state.isAdmin == false && ($store.state.currentPage == '' || $store.state.currentPage == $store.state.currentUser)) || $store.state.isConnected == true && $store.state.isAdmin == true && $store.state.currentPage != '' && $store.state.currentPage != $store.state.currentUser" class="mt-4">
          <btnSuppressionCompte @send="getPostsData"></btnSuppressionCompte>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
      
      data: function () {
          return {
            posts:[],
          }
      },

      methods: {

        async getPostsData() {
          if(this.$store.state.currentPage !== 'connexionForm' && this.$store.state.currentPage !== 'inscriptionForm' && this.$store.state.isConnected === true){
            try {
              let response = await fetch("http://localhost:3000/api/posts",{
                method: 'POST',
                body:JSON.stringify({
                    currentPage: this.$store.state.currentPage,
                    userId: this.$store.state.currentUser
                }),
                headers:{"content-type": "application/json", "authorization": this.$store.state.jwt}
                });
              let posts = await response.json();

              this.posts = posts;

            } catch (error) {
              console.log(error);
            }
          }
        },

        async getConnectLocalStorage(){
          if(JSON.parse(localStorage.getItem('isConnected')) === true){
            try {
                let response = await fetch("http://localhost:3000/api/connect",{
                method: 'POST',
                body:JSON.stringify({
                    email: JSON.parse(localStorage.getItem('email')),
                    password: JSON.parse(localStorage.getItem('password'))
                }),
                headers:{"content-type": "application/json"}
              }); // Envoyer mailAddress + password

              let objectResponse = await response.json();

              if(objectResponse.message !== "Bons identifiants"){
                this.$store.state.currentPage = 'connexionForm';
                alert("Identifiants incorrects");
              }else{
                this.$store.state.jwt = objectResponse.token;
                this.$store.state.isConnected = true;
                this.$store.state.currentUser = objectResponse.name;
                this.$store.state.currentPage = '';
                this.getPostsData();
              }
              if(objectResponse.isAdmin === 1 || objectResponse.isAdmin === true){
                this.$store.state.isAdmin = true;
              }else{
                this.$store.state.isAdmin = false;
              }
            } catch (error) {
              console.log(error);
            }
          }
        }

      },

      mounted() {
        this.getPostsData();
      },

      created() {
        this.getConnectLocalStorage();
      }

    }
</script>
