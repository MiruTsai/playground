<template>
    <input type="file" class="file-input w-full max-w-xs" @change="handler" />
    <img :src="base64">
</template>

<script setup>
const base64 = ref('');
const imageType = ref('');
const handler = (event) => {
    console.log('kb', event.target.files[0].size);
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
    console.log('image', image);
    let canvas = document.createElement('canvas');
    // 畫布大小為圖片的 0.9 倍
    canvas.width = image.width * 0.8;
    canvas.height = image.height * 0.8;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 把圖片畫在畫布上(0,0)作標到(canvas.width,canvas.height)    
    let newImg = canvas.toDataURL(imageType.value, 0.3); // 0.8是圖片壓縮比
    return newImg;
}
</script>

<style lang="scss" scoped></style>