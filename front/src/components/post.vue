<template>
    <div class="rounded bg-white py-4 px-6 flex flex-col mb-4">

        <!-- Contenu du post -->
        <div class="flex flex-row py-2">
            <div class="bg-white rounded-full w-6 h-6 cursor-pointer">
                <img src="../assets/profil-icon.png" alt="Profil">
            </div>
            <p class="self-end ml-2 font-bold cursor-pointer">{{post.userName}}</p>
        </div>
        <p class="text-grisTxt my-2">{{post.userMessageContent}}</p>
        
        <!-- Option message / Cacher si non propriétaire du message -->
        <div v-if="this.post.userName == $store.state.currentUser" class="flex my-2">
            <p @click="deletePost()" class="mr-8 text-orange italic text-sm cursor-pointer">Supprimer</p>
        </div>

        <!-- Options de réponse -->
        <div v-if="this.seeResponses == false" class="my-4 flex flex-row">

            <!-- Cacher si aucune réponse / Cacher si Option 2 inactif -->
            <div class="flex mr-8 cursor-pointer" @click="seeResponses = true">
                <img src="../assets/seemore-icon.png" class="w-4 h-3 self-center">
                <p class="text-orange font-semibold mx-2 self-center text-sm">Voir les réponses</p>
            </div>
            <div class="flex mr-8 cursor-pointer" @click="seeResponses = true">
                <img src="../assets/answer-icon.png" class="w-4 h-4 self-center">
                <p class="text-orange font-semibold mx-2 self-center text-sm">Répondre</p>
            </div>
        </div>

        <div v-if="this.seeResponses == true" class="px-4 pt-2 bg-gris">
            <!-- Boucle réponses -->
            <div v-for="response in post.responses" :key="response.id">
                <div class="flex flex-row py-2">
                    <div class="bg-white rounded-full w-6 h-6 cursor-pointer">
                        <img src="../assets/profil-icon.png" alt="Profil">
                    </div>
                    <p class="self-end ml-2 font-bold cursor-pointer">{{response.userName}}</p>
                </div>
                <p class="text-grisTxt my-2">{{response.userMessageContent}}</p>

                <!-- Option message / Cacher si non propriétaire du message -->
                <div class="flex my-2" v-if="response.userName == $store.state.currentUser"> 
                    <p @click="deletePost()" class="mr-8 text-orange italic text-sm cursor-pointer">Supprimer</p>
                </div>
            </div>
            <inputText></inputText>
        </div>

        <!-- Options de r&ponse 2 / Cacher si Option 1 inactif -->
        <div v-if="this.seeResponses == true" class="flex flex-row mt-4">
            <div class="flex pr-8" @click="seeResponses = false">
                <img src="../assets/seemore-icon.png" class="w-4 h-3 self-center transform rotate-180 cursor-pointer">
                <p class="text-orange font-semibold mx-2 self-center text-sm cursor-pointer">Masquer les réponses</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: Object
        },

        data: function () {
            return {
                seeResponses: false
            }
        },

        methods: {
            async deletePost() {
                try {
                // SI post.userId === $storer.state.userId ALORS
                    // let response = await fetch("http://localhost:3000/api/deletePost"); // postId
                // FIN SI
                } catch (error) {
                console.log(error);
                }
            },
        }

    }
</script>
