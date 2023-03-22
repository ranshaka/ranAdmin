<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
	<!--  :prefixCls="themes?'custom-dark':'ant'"  -->
	<a-config-provider :component-size="modulesSize" :prefixCls="themes?'custom-dark':'ant'" :locale="locale">
		<a-spin :spinning="loading" :delay="500" tip="飞速加载中...">
			<router-view :class="themes ?'custom-dark':''"></router-view>
		</a-spin>
		<a-modal v-model:visible="visible" :maskClosable="false" :keyboard="false" :closable="false" title="系统升级"
			@ok="startUpdata">
			<p>获取到新版本 <span style="color:#f60">{{newVersion }}</span> 是否更新</p>
		</a-modal>
		<a-modal v-model:visible="visibleProgress" :footer="[]" :maskClosable="false" :keyboard="false"
			:closable="false" title="更新进度">
			<div class="flex space-center">
				<a-progress type="circle" :percent="progress" />
			</div>
			<div class="flex space-center" v-if="progress>=100">
				<div>更新完成....</div>
			</div>
			<div class="flex space-between" v-if="progress>=100">
				<div></div>
				<div>
					<a-button danger class="margin-right-1x" @click="visibleProgress=false,visible=false">稍后重启
					</a-button>
					<a-button danger @click="relaunch">立即重启</a-button>

				</div>

			</div>
		</a-modal>
		<a id="aHref" href="" style="display:none"></a>
		<desktop></desktop>
	</a-config-provider>
</template>
<script setup>
	import {
		defineComponent,
		inject,
		nextTick,
		computed,
		ref
	} from "vue"
	//  国际化语言包
	import enUS from 'ant-design-vue/es/locale/en_US';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import dayjs from 'dayjs';
	import {
		ConfigProvider,
	} from 'ant-design-vue';
	import store from "@/store";
	import desktop from "@/layout/desktop"
	import {
		message
	} from 'ant-design-vue';
	const ipcRenderer = window.ipcRenderer
	const visible = ref(false)
	const visibleProgress = ref(false)
	const progress = ref(0)
	const newVersion = ref(null)
	const loading = computed(() => store.getters.allloading)
	// element-plus 国际化
	const locale = computed(() => {
		let a = store.getters.locales == "zh-cn" ? zhCN : enUS
		dayjs.locale(a)
		return a;
	})
	const modulesSize = computed(() => store.getters.modulesSize)
	const themes = computed(() => store.getters.themes)
	const themesColor = computed(() => store.getters.themesColor)
	ConfigProvider.config({
		theme: themesColor.value,
	});








	if (ipcRenderer) {
		//  electron-hot-updata  插件也是我写的  有什么问题/或者简易 可以直接D我
		window.setInterval(() => {
			console.log("循环开始检查更新....")
			console.log(ipcRenderer)
			ipcRenderer.send("startLoop");
		}, 500000);

		ipcRenderer.on("hotMessage", (event, arg) => {
			console.log(arg);
			if (arg.cmd == 'new-version-available') {
				newVersion.value = arg.message.replace("获取到可更新版本  ====  ", "")
				visible.value = true
			} else if (arg.cmd == 'downloaded-failed') {
				message.error('更新失败')
			} else if (arg.cmd == 'downloaded-progressNumber') {
				console.log('获取跟新进度' + arg.message)
				progress.value = arg.message
			} else if (arg.cmd == 'complete-downloaded') {
				message.success("更新完成")

			}
		});


		setTimeout(() => {
			messageTafy()
		}, 5000)

		// 监听托盘发送消息
		ipcRenderer.on("accept-tray-messages", (event, arg) => {
			console.log("推送过来一条信息")
			message.success(arg)
			console.log(arg)
		})
	}

	// 开始更新
	const startUpdata = () => {
		ipcRenderer.send("start-updata");
		visibleProgress.value = true
	}
	// 更新完成 立即 重启程序
	const relaunch = () => {
		ipcRenderer.send("relaunch");
	}

	// 给托盘发送消息
	const messageTafy = () => {
		console.log("给托盘推送信息，开始闪烁")
		ipcRenderer.send("tary-message", "hollw word");
	}
</script>

<!-- 修改页面加载进度条颜色 -->
<style>
	#nprogress .bar {
		background: orangered !important;
	}
</style>
<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		/* margin-top: 60px; */
	}

	* {
		margin: 0;
		padding: 0;
	}

	.a-main {
		padding: 0;
	}
</style>