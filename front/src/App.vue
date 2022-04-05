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
                  currentPage: this.$store.state.currentPage
              }),
              headers:{"content-type": "application/json"}
              });
              let posts = await response.json();

              this.posts = posts;

            } catch (error) {
              console.log(error);
            }
          }
        }

      },

      mounted() {
        this.getPostsData();
      }

    }
</script>
