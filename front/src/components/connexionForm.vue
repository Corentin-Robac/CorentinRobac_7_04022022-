<template>
    <div class="rounded bg-white py-4 px-6 flex flex-col mb-4 2xl:mx-48">
        <p class="font-bold text-2xl text-center mb-6">Formulaire de Connexion</p>
        <div class="w-full">
            <form class="bg-white rounded px-8 pt-6 pb-8">
                <div class="mb-4">
                    <label class="block text-gray-700 text-md font-bold mb-2" for="mailAdress">Adresse mail</label>
                    <input v-model="mailAddress" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mailAdress" type="text" placeholder="adresse@mail.com">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-md font-bold mb-2" for="password">Mot de passe</label>
                    <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button @click="getConnectData()" class="bg-orange hover:bg-orangeClair text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Connexion</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
      
      data: function () {
          return {
            mailAddress: "",
            password: ""
          }
      },

      methods: {
        async getConnectData() {
          try {
              let response = await fetch("http://localhost:3000/api/connect",{
              method: 'POST',
              body:JSON.stringify({
                  email: this.mailAddress,
                  password: this.password
              }),
              headers:{"content-type": "application/json"}
            }); // Envoyer mailAddress + password

            let objectResponse = await response.json();

            if(objectResponse.message !== "Bons identifiants"){
              alert("Identifiants incorrects");
            }else{
              this.$store.state.jwt = objectResponse.token;
              this.$store.state.isConnected = true;
              this.$store.state.currentUser = objectResponse.name;
              this.$store.state.currentPage = '';
              localStorage.setItem('isConnected', true);
              localStorage.setItem('email', JSON.stringify(this.mailAddress));
              localStorage.setItem('password', JSON.stringify(this.password));
              this.$emit('send');
            }
            if(objectResponse.isAdmin === 1 || objectResponse.isAdmin === true){
              this.$store.state.isAdmin = true;
            }else{
              this.$store.state.isAdmin = false;
            }
          } catch (error) {
            console.log(error);
          }
        },
      }

    }
</script>
