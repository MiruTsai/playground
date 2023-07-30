<template>
    <div class="flex h-screen w-screen items-center justify-center">
        <div>
            <h2>答對：<span class="font-bold">{{ right }}</span>題</h2>
            <h2>答錯：<span class="font-bold">{{ wrong }}</span>題</h2>
            <button class="btn"><nuxt-link to="./face">再玩一次</nuxt-link></button>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCountStore } from '../stores/countStore';
const countStore = useCountStore();
const { right, wrong } = storeToRefs(countStore);
</script>