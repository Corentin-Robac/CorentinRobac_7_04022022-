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
              posts:[
                {
                  userImageUrl: '../assets/profil-icon.png',
                  userName: 'John Doe',
                  userMessageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem dolor. Vivamus ac est vehicula, maximus massa eu, semper dui. Proin rhoncus faucibus lorem a hendrerit. Suspendisse dignissim dapibus interdum.',
                  responses: [
                      {
                          userImageUrl: '../assets/profil-icon.png',
                          userName: 'Jeanne Ode',
                          userMessageContent: 'Phasellus sed libero id enim bibendum tempor id eu nisl ?'
                      },
                      {
                          userImageUrl: '../assets/profil-icon.png',
                          userName: 'Jean Edo',
                          userMessageContent: 'Libero id enim bibendum  consectetur adipiscing elit.'
                      },
                  ]
                },
                {
                  userImageUrl: '../assets/profil-icon.png',
                  userName: 'Jack Joe',
                  userMessageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem dolor. Vivamus ac est vehicula, maximus massa eu, semper dui. Proin rhoncus faucibus lorem a hendrerit. Suspendisse dignissim dapibus interdum.',
                  responses: [
                      {
                          userImageUrl: '../assets/profil-icon.png',
                          userName: 'Ole Fern',
                          userMessageContent: 'Phasellus sed libero id enim bibendum tempor id eu nisl ?'
                      },
                      {
                          userImageUrl: '../assets/profil-icon.png',
                          userName: 'Anne Ed',
                          userMessageContent: 'Libero id enim bibendum  consectetur adipiscing elit.'
                      },
                  ]
                }
              ],
            }
        }
    }
</script>
