<template>
    <button @click="$store.state.currentUser = ''; $store.state.currentPage = 'connexionForm'; $store.state.isConnected = false" class="bg-orange px-4 py-2 rounded-3xl text-white font-semibold mx-4 my-2">Déconnexion</button>
</template>