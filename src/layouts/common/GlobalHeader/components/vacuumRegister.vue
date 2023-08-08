<template>
  <div>
    <n-button type="primary" style="width: 80px">{{ number }}</n-button>
  </div>
  <div>
    <n-button v-if="vacuumTime == 0" type="success" style="width: 80px; margin-top: 10px">{{ vacuumTime }}</n-button>
    <n-button v-if="vacuumTime > 0" type="error" style="width: 80px; margin-top: 10px">{{ vacuumTime }}</n-button>
  </div>
  <div style="width: 80px; font-style: italic; color: red">{{ warnInfo }}</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getSum } from '@/service/api/parm';

defineOptions({ name: 'vacuumRegister' });

let timerId: number;
const number = ref(0);
const vacuumTime = ref(0);
const warnInfo = ref('');
onMounted(() => {
  timerId = setInterval(updateRegister, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});

async function updateRegister() {
  const { data } = await getSum();
  // 更新页面元素
  if (data) {
    number.value = data.count;
    vacuumTime.value = data.vacuum;
    warnInfo.value = data.info;
  }
}
</script>

<style scoped></style>
