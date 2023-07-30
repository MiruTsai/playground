<template>
    <div class="w-3/4 mx-auto space-y-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <label for="file-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <p>Upload a file</p>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handler">
                            </label>
                        </div>
                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 50KB</p>
                    </div>
                </div>
            </div>
        </div>

        <img :src="base64">
        <div class="flex justify-center flex-wrap">
            <div class="basis-1/2">
                <label for="opt0">選項一</label>
                <input v-model="opts[0]" id="opts0" class="basis-1/2 border m-4 p-2">
            </div>
            <div class="basis-1/2">
                <label for="opt1">選項二</label>
                <input v-model="opts[1]" id="opts1" class="basis-1/2 border m-4 p-2">
            </div>
            <div class="basis-1/2">
                <label for="opt2">選項三</label>
                <input v-model="opts[2]" id="opts2" class="basis-1/2 border m-4 p-2">
            </div>
            <div class="basis-1/2">
                <label for="opt3">選項四</label>
                <input v-model="opts[3]" id="opts3" class="basis-1/2 border m-4 p-2">
            </div>
        </div>
        <label for="answer">答案</label>
        <input v-model="answer" id="answer" class="border mt-10 mx-4 p-2" type="text">
        <button class="btn" @click="uploadFileToFirebase">Submit</button>
    </div>
</template>

<script setup>
import { getStorage, ref as storageRef, getDownloadURL, uploadString } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

import { useFirebase } from '../composables/useFirebase';
import { ref } from "vue";
import { useFirebaseMethods } from "../composables/useFirebaseMethods";
const { firestore } = useFirebase();
const { setQuizData } = useFirebaseMethods();
const storage = getStorage();
const base64 = ref('');
const imageType = ref('');
let opts = reactive(['', '', '', '']);
const answer = ref('');

const handler = (event) => {
    console.log('kb', event.target.files[0]);
    if (!event.target.files[0].type.startsWith('image/')) {
        console.log("不是圖片格式");
        return;
    } else {
        imageType.value = event.target.files[0].type;
    }
    let reader = new FileReader();
    let newImage = '';
    // 圖片小於 50kb，不做壓縮。
    if (event.target.files[0].size < 51200) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
            base64.value = event.target.result;
        }
    } else {
        // 圖片大於 50kb，另作壓縮
        reader.readAsArrayBuffer(event.target.files[0]);
        reader.onload = function (event) {
            let blob = new Blob([event.target.result]);
            window.URL = window.URL || window.webkitURL;
            let blobURL = window.URL.createObjectURL(blob);
            const image = new Image();
            image.src = blobURL;
            image.onload = function () {
                newImage = resizeImg(image);
                base64.value = newImage
            }
        }
    }
}

const resizeImg = (image) => {
    const canvas = document.createElement('canvas');
    // 畫布大小為圖片的 0.9 倍
    canvas.width = image.width * 0.8;
    canvas.height = image.height * 0.8;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 把圖片畫在畫布上(0,0)作標到(canvas.width,canvas.height)    
    const newImg = canvas.toDataURL(imageType.value, 0.3); // 0.8是圖片壓縮比
    return newImg;
}
const uploadFileToFirebase = () => {
    const uploadFile = storageRef(storage, `koreaFace/${GenNonDuplicateID()}`);
    uploadString(uploadFile, base64.value, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef(storage, snapshot.metadata.fullPath)).then(url => {
            setQuizData("koreaFaceQuizs", {
                answer: answer.value,
                opts: opts,
                url: url,
                createdTime: new Date()
            })
        }).then(() => {
            alert('上傳成功');
            answer.value = '';
            base64.value = '';
            opts = opts.fill('', 0, 4)
        })
    });
}
const GenNonDuplicateID = () => {
    let idStr = Date.now().toString(36)
    idStr += Math.random().toString(36).substr(3)
    return idStr
}


</script>