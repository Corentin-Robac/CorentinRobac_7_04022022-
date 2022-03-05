<template>
    <div class="rounded p-4 flex flex-col">
        <textarea v-model="textEntered" placeholder="Dites quelque chose ..." class="w-full p-4"></textarea>
        <div class="flex justify-end">
            <input type="file" name="file" id="file" class="hidden">
            <label for="file" class="cursor-pointer m-2">
                <img src="../assets/download.png" alt="Download" class="w-6">
            </label>
            <template>
                <button @click="sendPost()" class="text-orange font-bold px-2">Envoyer</button>
            </template>
        </div>
    </div>
</template>

<script>
    export default {

        data: function () {
            return {
                textEntered: ''
            }
        },

        methods: {
            async sendPost() {
                try {
                // let response = await fetch("http://localhost:3000/api/sendPost"); // userId
                // envoyer textEntered
                } catch (error) {
                    console.log(error);
                }
            },
        }

    }
</script>
