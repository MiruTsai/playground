import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFirebase } from '../composables/useFirebase';
import { collection, query, getDocs } from "firebase/firestore";
import { useRouter } from '#imports';
export const useQuizStore = defineStore('quiz', () => {
  const quizs = reactive([{
    url: '',
    answer: '',
    opts: ['', '', '', '']
  }]);
  const { firestore } = useFirebase();
  const router = useRouter();
  const getQuizs = async () => {    
    const q = query(collection(firestore, "koreaFaceQuizs"));
    const querySnapshot = await getDocs(q);
    quizs.pop();
    querySnapshot.forEach((doc) => {       
      const data = doc.data();
      quizs.push(data);
    });
    quizs = shuffleArray(quizs);
  }
  
  const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
  const popQuiz = () => {
    quizs.shift();
    if (!quizs.length) {
      router.push({path: '/result'})
    }
  };
  
  return {
    quizs,
    getQuizs,
    popQuiz
  }
})