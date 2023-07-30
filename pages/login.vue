<template>
  <div class="tabs">
    <button class="tab" :class="page === 'signIn' ? 'tab-active' : ''" @click="page = 'signIn'">Sign In</button>
    <button class="tab" :class="page === 'signUp' ? 'tab-active' : ''" @click="page = 'signUp'">Sign Up</button>
  </div>
  <div v-show="page === 'signIn'">
    <form class="w-2/3 mx-auto mt-10">
      <div class="space-y-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Sign In</h2>
        <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">          
          <div class="sm:col-span-6">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                <input v-model="signInEmail" type="email" name="email" id="email" autocomplete="email"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="xxx@xxx">
              </div>
            </div>
          </div>
          <div class="sm:col-span-6">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                <input v-model="signInPw" type="password" name="password" id="password" autocomplete="password"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="password">
              </div>
            </div>
          </div>
        </div>

      </div>
      <button class="btn mt-10" @click="signIn">Sign In</button>
      <button class="btn mt-10" @click="signInByGoogle">Sign In By Google</button>
    </form>
  </div>
  <div v-show="page === 'signUp'">
    <form class="w-2/3 mx-auto mt-10">
      <div class="space-y-12">

        <h2 class="text-base font-semibold leading-7 text-gray-900">Sign Up</h2>

        <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input v-model="signUpName" type="text" name="username" id="username" autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith">
              </div>
            </div>
          </div>
          <div class="sm:col-span-6">
            <label for="signUpEmail" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                <input v-model="signUpEmail" type="email" name="signUpEmail" id="signUpEmail" autocomplete="email"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="xxx@xxx">
              </div>
            </div>
          </div>
          <div class="sm:col-span-6">
            <label for="signUpPw" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                <input v-model="signUpPw" type="password" name="signUpPw" id="signUpPw" autocomplete="password"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="password">
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn mt-10" @click="signUp">apply</button>
    </form>
  </div>
</template>
<script setup>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import useAuthStore from '../stores/authStore';
const page = ref('signIn')
const { firestore } = useFirebase();
const provider = new GoogleAuthProvider();
const authStore = useAuthStore();
const { updateUserInfo } = authStore;
const auth = getAuth();
const signInEmail = ref('');
const signInPw = ref('');
const signUpEmail = ref('');
const signUpPw = ref('');
const signUpName = ref('');
const signInByGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    updateUserInfo(result.user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


const signUp = () => {
  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPw.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('ccccc', user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log('err', error)
    });
}
const signIn = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

}
</script>