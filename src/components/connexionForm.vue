<template>
    <div class="rounded bg-white py-4 px-6 flex flex-col mb-4 2xl:mx-48">
        <p class="font-bold text-2xl text-center mb-6">Formulaire de Connexion</p>
        <div class="w-full">
            <form class="bg-white rounded px-8 pt-6 pb-8">
                <div class="mb-4">
                    <label class="block text-gray-700 text-md font-bold mb-2" for="mailAdress">
                        Adresse mail
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mailAdress" type="text" placeholder="adresse@mail.com">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-md font-bold mb-2" for="password">
                        Mot de passe
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-orange hover:bg-orangeClair text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Connexion
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>