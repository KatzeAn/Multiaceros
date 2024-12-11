<template>
    <div class="flex  w-full h-screen">
        <div class="w-full flex items-center justify-center lg:w-1/2">
            <slot />
        </div>
        <div class="hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            <img src="../assets/logoRedHat-Vertical.png" alt="Logo RedHat">
        </div>
    </div>
</template>