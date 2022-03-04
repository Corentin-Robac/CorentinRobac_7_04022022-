<template>
    <div class="rounded p-4 flex flex-col">
        <textarea placeholder="Dites quelque chose ..." class="w-full p-4"></textarea>
        <div class="flex justify-end">
            <input type="file" name="file" id="file" class="hidden">
            <label for="file" class="cursor-pointer m-2">
                <img src="../assets/download.png" alt="Download" class="w-6">
            </label>
            <btnEnvoyer></btnEnvoyer>
        </div>
    </div>
</template>