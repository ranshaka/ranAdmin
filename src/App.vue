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
@@lastEditTime: Do not edit
* @filePath: Do not edit
-->
<template>
	<el-config-provider :locale="locale" :size="modulesSize">
		<router-view v-loading="loading"></router-view>
	</el-config-provider>
	<el-dialog v-model="dialogVisible" title="发现新版本是否更新" width="30%">

		<el-progress type="circle" :percentage="percent" />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="regenerate">跟新</el-button>
				<el-button type="primary" @click="dialogVisible = false" v-if="!isUpdata"> 取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
	import {
		defineComponent,
		inject,
		nextTick,
		computed,
		onMounted,
		ref
	} from "vue"
	// element-plus 国际化语言包
	import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
	import en from 'element-plus/dist/locale/en.mjs'
	// 主题
	import {
		changeTheme,
		colorChange
	} from "@/common/themes/index"
	import store from "@/store";



	const ipcRenderer = window.ipcRenderer

	export default defineComponent({
		name: "index",
		components: {},
		computed: {},
		setup() {
			const loading = computed(() => store.getters.allloading)
			// element-plus 国际化
			const locale = computed(() => store.getters.locales == "zh-cn" ? zhCn : en)
			const modulesSize = computed(() => store.getters.modulesSize)

			// 主题
			changeTheme(store.getters.themes)
			if (store.getters.themes == 'defaultTheme') {
				colorChange(store.getters.themesColor)
			}



			// 跟新进度
			const percent = ref(0)
			const isUpdata = ref(false)
			const dialogVisible = ref(false)



			const  regenerate=()=>{
				isUpdata.value=true
				ipcRenderer.send("checkForUpdate",  isUpdata.value);
			}
			// 检测自动更新
			const initUpdata = () => {
				if (ipcRenderer) {
					window.setInterval(() => {
						ipcRenderer.send("checkForUpdate", isUpdata.value);
					}, 10000);
				}
			}
			onMounted(() => {
				if (ipcRenderer) {
					window.setInterval(() => {
						console.log("开始检查更新....")
						ipcRenderer.send("checkForUpdate", isUpdata.value);
					}, 10000);

					ipcRenderer.on("message", (event, arg) => {
						// for (var i = 0; i < arg.length; i++) {
				
						console.log("***",arg);
						if ("update-available" == arg.cmd) {
							//显示升级对话框
							dialogVisible.value = true;
							if (!isUpdata.value) return;
							
						} else if ("download-progress" == arg.cmd) {
							//更新升级进度
							/**
							 * 
							 * message{bytesPerSecond: 47673
							  delta: 48960
							  percent: 0.11438799862426002
							  total: 42801693
							  transferred: 48960
							  }
							 */
							console.log(arg.message.percent);
							let percents = Math.round(parseFloat(arg.message.percent));
							percent.value = percents;
						} else if ("error" == arg.cmd) {
							dialogVisible = false;
							alert("更新失败");
						}
						// }
					});
				}

			})
			initUpdata()
			return {
				loading,
				locale,
				modulesSize,
				dialogVisible,
				percent,
				isUpdata,
				regenerate,
			}
		},
	})
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

	.el-main {
		padding: 0;
	}
</style>