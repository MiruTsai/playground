<template>
    <div>
        <span class="countdown font-mono text-6xl">
            <span :style="`--value:${time}`"></span>
        </span>
    </div>
</template>

<script setup>
let time = ref(3);
let timer = setInterval(() => {
    time.value--;
    if (time.value === 0) {
        clearInterval(timer);
    }
}, 1000);


onBeforeUnmount(() => {
    clearInterval(timer);
})
</script>

<style lang="scss" scoped></style>