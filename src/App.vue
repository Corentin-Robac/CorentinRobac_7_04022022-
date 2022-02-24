<template>
  <div id="app" class="bg-rose min-h-screen">
    <headerComponent></headerComponent>
    <div class="flex justify-center">
      <div class="my-4 mx-4 w-full md:w-2/4">

        <!-- Page des posts -->
        <div v-if="$store.state.isConnected == true">
          <inputText class="bg-white"></inputText>

          <!-- Boucle des posts -->
          <div class="mt-4">
            <post></post>
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
  <!-- Pour manipuler le store -->
  <!-- @click="$store.commit('setCurrentStep')" -->
</template>

<script>
    export default {
      // Utilisation des props
        // props: {
        //     datas: Object
        // }
    }
</script>
