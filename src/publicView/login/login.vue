<template>
    <div class="loginBox">
        <div class="login " :class="classFun1()">
            <div class="login_title">
                <div class="loginTitle">
                    <span class="project-name">
                        <span class="dynamicText" v-for="(item,index) in appname" :key="index">{{item}}</span>
                    </span>
                </div>
            </div>
            <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="账号" name="account"
                    :rules="[{ required: true, message: '账号' }]">
                    <a-input v-model:value="formState.account" size="large"  />
                </a-form-item>

                <a-form-item label="密码" name="password"
                    :rules="[{ required: true, message: '密码' }]">
                    <a-input-password v-model:value="formState.password" size="large"  />
                </a-form-item>

                <a-form-item label="验证码" name="verifyCode"
                    :rules="[{ required: true, message: '验证码' }]">
                    <div>
                        <div class="flex">
                            <a-input v-model:value="formState.verifyCode" size="large"  :maxlength="4" style="width:50%;" />
                            <identifyCodeView ref="identifyCodeViewRef"></identifyCodeView>
                        </div>

                    </div>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                    <a-button type="primary" html-type="submit" class="width100" size="large" @click="startAnimation">Submit
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class='loginloading ' :class="classFun2()">
            <div class="loginloadingImg">
                <img src="./images/loading.gif" alt="" style="width:100%;">
            </div>

            <p>飞速登录中...</p>
        </div>
    </div>

</template>
<script>
    import {
        computed,
        watch,
        ref,
    } from 'vue';
    import store from "@/store";
    import identifyCodeView from "@/publicView/login/identifyCode"
    import {
        message
    } from 'ant-design-vue';
    export default {
        components: {
            identifyCodeView
        },
        setup() {
            const appname = store.getters.appName
            const ruleFormRef = ref()
            const formRef = ref()
            const identifyCodeViewRef = ref(null)
            const formState = ref({
                account: "admin",
                password: "admin",
                verifyCode: "",
            })


            const start1 = ref([])
            const start2 = ref([])
            const classFun1 = () => {
                return start1.value.join(" ")
            }
            const classFun2 = () => {
                return start2.value.join(" ")
            }

            // 开始动画
            const startAnimation = () => {
                formRef.value.validate().then(res => {
                    const code = identifyCodeViewRef.value.getCode()
                    if (code != formState.value.verifyCode) return message.error("验证码不对")
                    start1.value.push("loginStart")
                    setTimeout(function () {
                        start1.value.push("loginEnd")
                        start2.value.push("loginloadingStart")
                    }, 300);
                    setTimeout(function () {
                        start2.value.push("loginloadingEnd")
                    }, 310);
                    setTimeout(function () {
                        store.dispatch("userinfo/appLogin")
                    }, 1500);
                }).catch(err => {
                    if (err && err.errorFields && err.errorFields.length) {
                        message.error('请填写' + err.errorFields[0].errors[0])
                    }
                })

            }

            // 结束动画
            const endAnimation = () => {
                start2.value = start2.value.filter(x => x !== 'loginloadingEnd')
                setTimeout(function () {
                    start1.value = start1.value.filter(x => x !== 'loginEnd')
                    start2.value = start2.value.filter(x => x !== 'loginloadingStart')
                }, 180);
                setTimeout(function () {
                    start1.value = start1.value.filter(x => x !== 'loginStart')
                }, 200);
            }
            return {
                appname,
                formState,
                ruleFormRef,
                formRef,
                identifyCodeViewRef,

                classFun1,
                classFun2,
                startAnimation,
                endAnimation,

            }
        },
    }
</script>
<style lang="less" scoped>
    /deep/.ant-form-item-label>label {
        color: #fff !important;
    }
</style>
<style scoped>
    .loginBox {
        width: 100%;
        opacity: 1;
        height: 100vh;
        background: url("./images/2.png") no-repeat center / 100% 100%;
    }

    .login {

        box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
        opacity: 1;
        top: 20px;
        -webkit-transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
        -webkit-transition-property: -webkit-transform, opacity, box-shadow, top, left;
        transition-property: transform, opacity, box-shadow, top, left;
        -webkit-transition-duration: .5s;
        transition-duration: .5s;
        -webkit-transform-origin: 161px 100%;
        -ms-transform-origin: 161px 100%;
        transform-origin: 161px 100%;
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        position: relative;
        width: 380px;
        height: 360px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 0;
        bottom: 0;
        padding: 40px 20px 40px 20px;
        background: #35394a;
        /* Old browsers */
        /* FF3.6+ */
        background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #35394a), color-stop(100%, rgb(0, 0, 0)));
        /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
        /* Chrome10+,Safari5.1+ */
        /* Opera 11.10+ */
        /* IE10+ */
        background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
        /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)', GradientType=1);
        /* IE6-9 fallback on horizontal gradient */
        color: #FFF;
        z-index: 10;
    }

    .login_title {
        text-align: center;
        margin: 15px 0;
        margin-right: -50px;
        font-size: 22px;
    }

    .login.loginStart {
        box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
        pointer-events: none;
        top: -100px !important;
        -webkit-transform: rotateX(65deg) scale(0.8) !important;
        transform: rotateX(65deg) scale(0.8) !important;
        opacity: .6 !important;
        -webkit-filter: blur(1px);
        filter: blur(1px);
    }

    .loginEnd {
        left: -320px;
    }

    .loginloading {
        box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
        /* display: none; */
        background: #35394a;
        -webkit-transition-property: -webkit-transform, opacity, box-shadow, top, left;
        transition-property: transform, opacity, box-shadow, top, left;
        -webkit-transition-duration: .5s;
        transition-duration: .5s;
        /* Old browsers */
        /* FF3.6+ */

        /* Chrome10+,Safari5.1+ */
        /* Opera 11.10+ */
        /* IE10+ */
        background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
        /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)', GradientType=1);
        /* IE6-9 fallback on horizontal gradient */
        position: absolute;
        left: -320px;
        right: 90px;
        margin: auto;
        color: white;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
        padding: 20px 70px;
        top: 100px;
        bottom: 0;
        height: 200px;
        width: 300px;
        opacity: 0;
    }

    .loginloadingImg {
        width: 150px;
        margin: 0 auto;
    }

    .horse_run {
        background-image: linear-gradient(90deg, rgba(196, 233, 64, 0) 0%, rgb(62, 224, 84) 100%), linear-gradient(0deg, rgb(62, 224, 84) 0%, rgba(196, 233, 64, 0) 100%), linear-gradient(-90deg, rgba(196, 233, 64, 0) 0%, rgb(62, 224, 84) 100%), linear-gradient(0deg, rgba(196, 233, 64, 0) 0%, rgb(62, 224, 84) 100%);
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-size: 100px 4px, 4px 100px, 100px 4px, 4px 100px;
        background-position: -100px 1px, calc(100% - 1px) -100px, calc(100% + 100px) calc(100% - 1px), 1px 0px;
        animation: moveLine 3s infinite linear;
        height: calc(70px - 2px);
        padding: 1px;
        background-clip: content-box;
    }

    @keyframes moveLine {
        0% {
            background-position: -100px 1px, calc(100% - 1px) -100px, calc(100% + 100px) calc(100% - 1px), 1px 0px;
        }

        5% {
            background-position: 0px 1px, calc(100% - 1px) -100px, calc(100% + 100px) calc(100% - 1px), 1px -100px;
        }

        30% {
            background-position: 100% 1px, calc(100% - 1px) -100px, calc(100% + 100px) calc(100% - 1px), 1px -100px;
        }

        35% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) 0px, calc(100% + 100px) calc(100% - 1px), 1px -100px;
        }

        50% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) 100%, calc(100% + 100px) calc(100% - 1px), -100px -100px;
        }

        55% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) calc(100% + 100px), 100% calc(100% - 1px), -100px calc(100% + 100px);
        }

        80% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) calc(100% + 100px), 0px calc(100% - 1px), 1px calc(100% + 100px);
        }

        85% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) calc(100% + 100px), -100px calc(100% - 1px), 1px 100%;
        }

        100% {
            background-position: calc(100% + 100px) 1px, calc(100% - 1px) calc(100% + 100px), -100px calc(100% - 1px), 1px 0px;
        }
    }


    html body .loginloading.loginloadingStart {
        display: block !important;
        left: -320px;
        /* left:520px; */
    }

    html body .loginloading.loginloadingEnd {
        left: 520px;
        opacity: 1;
    }
</style>