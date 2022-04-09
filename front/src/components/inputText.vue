<template>
    <div class="rounded p-4 flex flex-col">
        <form @submit.prevent="sendPost" enctype="multipart/form-data">
            <textarea v-model="textEntered" placeholder="Dites quelque chose ..." class="w-full p-4"></textarea>
            <div class="flex justify-end items-center">
                <input type="file" name="file" @change="uploadFile" multiple>
                <p class="cursor-pointer" @click="file=null">Supprimer</p>
                <label for="file" class="cursor-pointer m-2">
                    <img src="../assets/download.png" alt="Download" class="w-6">
                </label>
                <template>
                    <button class="text-orange font-bold px-2">Envoyer</button>
                </template>
            </div>
        </form>
    </div>
</template>

<script>
    export default {

        props: {
            postId: {
                type: Number,
                required: false,
                default: 0
            }
        },

        data: function () {
            return {
                textEntered: '',
                file: null,
            }
        },

        methods: {
            async sendPost() {
                try {
                    if(this.textEntered !== '' || this.file !== null){

                        const formData = new FormData();
                        if(this.file !== null){
                            formData.append('image', this.file[0]);
                        }
                        formData.append('message', this.textEntered);
                        formData.append('ResponseTo', this.postId);
                        formData.append('currentUser', this.$store.state.currentUser);
                        formData.append('userId', this.$store.state.currentUser);

                        const response = await fetch("http://localhost:3000/api/sendPost",{
                            method: 'POST',
                            body: formData,
                            headers:{"authorization": this.$store.state.jwt}
                        });

                        let objectResponse = await response.json();
                        if(objectResponse.message === 'Message publié'){
                            this.textEntered = '';
                            this.file = null;
                            this.$emit('send');
                        }else{
                            alert(objectResponse.message);
                        }
                    }

                } catch (error) {
                    console.log(error);
                }
            },

            uploadFile (event) {
                this.file = event.target.files;
            },

        }

    }
</script>
