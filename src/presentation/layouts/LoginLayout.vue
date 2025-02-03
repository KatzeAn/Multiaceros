<template>
    <div class="flex w-full h-screen">
        <div class="w-full flex items-center justify-center lg:w-1/2">
            <slot />
        </div>
        <div class="hidden lg:flex h-full w-1/2 items-center justify-center">
            <img src="../assets/vertical.png" alt="Logo RedHat" class="scale-125">
        </div>
    </div>
</template>

