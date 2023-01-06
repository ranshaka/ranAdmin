<template>
    <div>
        <div>
            <a-button type="danger" @click.prevent="clearPanel">清空签名</a-button>
            <a-button type="success" @click="confirm">确认签名</a-button>
        </div>
        <a-divider />
        <a-row>
            <a-col :span="12">
                <canvas ref="canvas" tabindex="0" @mousedown="onMouseDown" width="500" height="500"
                    style="border:1px solid aqua"></canvas>
            </a-col>
            <a-col :span="12">
                <div style="border:1px solid red;width: 500px;height: 500px;">
                    <img class="imgCanvas" :src="imgUrl">
                </div>
            </a-col>
        </a-row>


    </div>
</template>

<script>
    import {
        defineComponent,
        ref,
        nextTick
    } from 'vue'
    import numberView from "@/publicView/number"
    export default defineComponent({

        name: 'environAmbitus',
        components: {
            numberView
        },
        setup() {
            const canvas = ref(null)
            const imgUrl = ref()

            // 开始签名
            function onMouseDown(e) {
                // canvas.width = "100%"; // 设置宽度
                // canvas.height = "100%"; // 设置高度

                console.log(canvas.value.width)
                console.log(canvas.value.height)
                const el = e.target || e.srcElement
                const ctx = el.getContext('2d')
                ctx.width = canvas.value.width
                ctx.height = canvas.value.height
                ctx.beginPath()
                ctx.moveTo(e.offsetX, e.offsetY)
                ctx.lineTo(e.offsetX, e.offsetY)
                ctx.stroke()
                el.onmousemove = function (e) {
                    if (e.which === 0) {
                        el.onmousemove = null
                        el.onmouseup = null
                        return
                    }
                    ctx.lineTo(e.offsetX, e.offsetY)
                    ctx.stroke()
                }
                el.onmouseup = function () {
                    el.onmousemove = null
                    el.onmouseup = null
                }
                el.focus()
            }

            // 清空签名
            function clearPanel(e) {
                nextTick(() => {
                    //   const el = canvas;
                    const ctx = canvas.value.getContext("2d");
                    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
                });
            }

            // 确认签名
            function confirm() {
                nextTick(() => {
                    try {
                        // const canvas = this.$refs["canvas"];
                        const blank = document.createElement("canvas"); // 创建一个空canvas对象
                        blank.width = canvas.value.width;
                        blank.height = canvas.value.height;
                        imgUrl.value = canvas.value.toDataURL();
                    } catch (e) {
                        console.warn(e);
                    }
                });
            }
            return {
                onMouseDown,
                confirm,
                clearPanel,
                canvas,
                imgUrl
            }
        }
    })
</script>