<template>
  <div v-if="quizs.length" class="xs:w-screen lg:w-1/3 mx-auto space-y-12">
    <img class="w-full max-h-96 object-contain" :src="quizs[0].url">
    <div class="w-full flex flex-wrap justify-center">
      <quiz-btn v-for="item in quizs[0].opts" class="basis-1/3" :text="item" @answer="submit" />
    </div>
  </div>
  <div v-else class="flex h-screen w-screen items-center justify-center">
    <p>題目準備中</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../stores/quizStore';
import { useCountStore } from '../stores/countStore';
const quizStore = useQuizStore();
const countStore = useCountStore();
const { quizs } = storeToRefs(quizStore);
const { getQuizs, popQuiz } = quizStore;
const { add } = countStore;
const answer = ref('');
const submit = (data: string) => {
  answer.value = data;
  if (answer.value === quizs.value[0].answer) {
    add('right');
  } else {
    add('wrong');
  }
  popQuiz();
}
onBeforeMount(()=> {
  getQuizs();
})
</script>

<style lang="scss" scoped></style>