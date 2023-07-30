<template>
    <button class="btn m-2" @click="handler"> {{ text }}</button>
</template>
<script setup>
const props = defineProps(['text'])
const emit = defineEmits(['updateValue'])
const handler = () =>{
    emit('answer', props.text);
}
</script>