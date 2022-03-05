<template>
  <div id="app" class="bg-rose min-h-screen">
    <headerComponent></headerComponent>
    <div class="flex justify-center">
      <div class="my-4 mx-4 w-full md:w-2/4">

        <!-- Page des posts -->
        <div v-if="$store.state.isConnected == true">
          <inputText class="bg-white"></inputText>

          <!-- Boucle des posts -->
          <div v-for="post in posts" :key="post.id" class="mt-4">
            <post v-bind:post="post"></post>
          </div>
        </div>

        <!-- Fomulaire de connexion -->
        <div v-if="$store.state.isConnected == false && $store.state.currentPage == 'connexionForm'" class="mt-4">
          <connexionForm></connexionForm>
        </div>

        <!-- Fomulaire d'inscription -->
        <div v-if="$store.state.isConnected == false && $store.state.currentPage == 'inscriptionForm'" class="mt-4">
          <inscriptionForm></inscriptionForm>
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
          try {
            let response = await fetch("http://localhost:3000/api/posts");
            let objectResponse = await response.json();
            this.posts = objectResponse.posts;
          } catch (error) {
            console.log(error);
          }
        },
      },

      created() {
        this.getPostsData();
      }
    }
</script>
