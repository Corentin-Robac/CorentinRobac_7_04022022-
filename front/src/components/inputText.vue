<template>
    <div class="rounded p-4 flex flex-col">
        <textarea v-model="textEntered" placeholder="Dites quelque chose ..." class="w-full p-4"></textarea>
        <div class="flex justify-end">
            <input type="file" name="file" id="file" @change="onFileChange">
            <label for="file" class="cursor-pointer m-2">
                <img src="../assets/download.png" alt="Download" class="w-6">
            </label>
            <template>
                <button @click="sendPost()" class="text-orange font-bold px-2">Envoyer</button>
            </template>
        </div>

        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="form-group">
                <input type="file" @change="uploadFile" multiple>
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-block btn-lg">Upload</button>
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
                file: '',
            }
        },

        methods: {
            async sendPost() {
                try {
                    if(this.textEntered !== '' || this.file !== ''){
                        let response = await fetch("http://localhost:3000/api/sendPost",{
                            method: 'POST',
                            body:JSON.stringify({
                                message: this.textEntered,
                                attachment: '',
                                ResponseTo: this.postId,
                                currentUser: this.$store.state.currentUser,
                                userId: this.$store.state.currentUser
                            }),
                            headers:{"content-type": "application/json", "authorization": this.$store.state.jwt}
                        });

                        let objectResponse = await response.json();
                        if(objectResponse.message === 'Message publié'){
                            this.textEntered = '';
                            this.file = '';
                            this.$emit('send');
                        }else{
                            alert(objectResponse.message);
                        }
                    }

                } catch (error) {
                    console.log(error);
                }
            },

            onFileChange(event) {
                this.file = event.target.files;
            },



            uploadFile (event) {
                this.file = event.target.files;
            },

            async handleSubmit() {

                var formData = new FormData();
                formData.append('image', this.file[0]);
                console.log(this.file[0]);

                await fetch("http://localhost:3000/api/sendTest",{
                    method: 'POST',
                    body: formData,
                    headers:{"content-type": "multipart/form-data; boundary=image", "authorization": this.$store.state.jwt}
                });

            }


        }

    }
</script>
