<template>
    <div class="rounded bg-white py-4 px-6 flex flex-col mb-4">

        <!-- Contenu du post -->
        <div class="flex flex-row py-2">
            <div class="bg-white rounded-full w-6 h-6 cursor-pointer">
                <img src="../assets/profil-icon.png" alt="Profil">
            </div>
            <p class="self-end ml-2 font-bold cursor-pointer">John Doe</p>
        </div>
        <p class="text-grisTxt my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem dolor. Vivamus ac est vehicula, maximus massa eu, semper dui. Proin rhoncus faucibus lorem a hendrerit. Suspendisse dignissim dapibus interdum.</p>
        
        <!-- Option message / Cacher si non propriétaire du message -->
        <div class="flex my-2">
            <p class="mr-8 text-orange italic text-sm cursor-pointer">Supprimer</p>
            <p class="mr-8 text-orange italic text-sm cursor-pointer">Modifier</p>
        </div>

        <!-- Options de réponse -->
        <div class="my-4 flex flex-row">

            <!-- Cacher si aucune réponse / Cacher si Option 2 inactif -->
            <div class="flex pr-8">
                <img src="../assets/seemore-icon.png" class="w-4 h-3 self-center cursor-pointer">
                <p class="text-orange font-semibold mx-2 self-center text-sm cursor-pointer">Voir les réponses</p>
            </div>
            <div class="flex pr-8">
                <img src="../assets/answer-icon.png" class="w-4 h-4 self-center cursor-pointer">
                <p class="text-orange font-semibold mx-2 self-center text-sm cursor-pointer">Répondre</p>
            </div>
        </div>

        <!-- Boucle réponses -->
        <div class="px-4 py-2 bg-gris">
            <div class="flex flex-row py-2">
                <div class="bg-white rounded-full w-6 h-6 cursor-pointer">
                    <img src="../assets/profil-icon.png" alt="Profil">
                </div>
                <p class="self-end ml-2 font-bold cursor-pointer">Jeanne Ode</p>
            </div>
            <p class="text-grisTxt my-2">Phasellus sed libero id enim bibendum tempor id eu nisl ?</p>
            
            <!-- Option message / Cacher si non propriétaire du message -->
            <div class="flex my-2">
                <p class="mr-8 text-orange italic text-sm cursor-pointer">Supprimer</p>
                <p class="mr-8 text-orange italic text-sm cursor-pointer">Modifier</p>
            </div>
            <inputText></inputText>
        </div>

        <!-- Options de r&ponse 2 / Cacher si Option 1 inactif -->
        <div class="flex flex-row">
            <div class="flex pr-8">
                <img src="../assets/seemore-icon.png" class="w-4 h-3 self-center transform rotate-180 cursor-pointer">
                <p class="text-orange font-semibold mx-2 self-center text-sm cursor-pointer">Masquer les réponses</p>
            </div>
        </div>

    </div>
</template>