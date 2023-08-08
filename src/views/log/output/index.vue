<template>
	<div>
		<n-log :rows="38" :log="logValue" />
		<n-space>
			<n-button type="success">
				<icon-ic-sharp-not-started class="text-24px" />
			</n-button>
			<n-button type="info">
				<icon-material-symbols-stop-circle-rounded class="text-24px" />
			</n-button>
			<n-button type="error" @click="clearLog">
				<icon-material-symbols-cleaning-bucket class="text-24px" />
			</n-button>
		</n-space>
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {deleteAllLog, queryAllLog} from "@/service/api/user";
import {saveJson} from "@/service/api/home";
import {useMessage} from "naive-ui";
const logValue=ref("");
const message = useMessage();
onMounted(async () => {
      initData();
})
async function initData() {
	const {data} = await queryAllLog();
	let logDetail = "";
	if (data) {
		for (let i = 0; i < data.length; i++) {
			logDetail = logDetail + "`" + (i + 1) + "`  " + data[i].userAction + "     时间为:" + data[i].createTime + "\n"
		}
	}
	logValue.value = logDetail
}
async function clearLog() {
	const {data} = await deleteAllLog();
	if(data){
		message.success('删除成功');
	}
	initData();
}
</script>

<style scoped></style>
