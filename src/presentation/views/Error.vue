<template>
    <div class="h-screen flex flex-col justify-center items-center space-y-5">
        <h1 class="text-6xl text-[var(--primary-color)] font-bold">404</h1>
        <h3 class="text-3xl">Page not found</h3>
        <p>The URL of the page was not found. Please try again</p>
        <div class="flex space-x-2">
            <router-link to="/home" class="p-2 bg-[var(--primary-color)] text-white rounded-md">Go Home</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>