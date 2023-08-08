<template>
  <div>
    <n-grid x-gap="12" y-gap="12" :cols="1">
      <n-gi>
        <n-card class="rounded-16px shadow-sm">
          <n-tag round :bordered="false" type="error">
            当前报警
            <template #icon>
              <icon-mdi-emoticon-angry class="text-24px" />
            </template>
          </n-tag>
          <n-grid x-gap="12" :cols="12">
            <n-gi span="11">
              <n-card style="background-color: #f3588b">
                <n-log :rows="10" :log="warnValue" />
              </n-card>
            </n-gi>
            <n-gi>
              <n-card>
                <n-space vertical>
                  <br />
                  <n-button type="error" strong secondary @click="reset">
                    <icon-material-symbols-cleaning-bucket-outline-rounded class="text-24px" />
                  </n-button>
                  <n-button type="info" strong secondary>
                    <icon-mdi-arrow-top-right-bold-box class="text-24px" />
                  </n-button>
                  <n-button type="error" strong secondary>
                    <icon-material-symbols-cleaning-bucket class="text-24px" />
                  </n-button>
                  <br />
                </n-space>
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card class="rounded-16px shadow-sm">
          <n-tag round :bordered="false" type="warning">
            历史报警
            <template #icon>
              <icon-icon-park-solid-expressionless-face class="text-24px" />
            </template>
          </n-tag>
          <n-grid x-gap="12" :cols="12">
            <n-gi span="11">
              <n-card>
                <n-log :rows="10" :log="warnValue" />
              </n-card>
            </n-gi>
            <n-gi>
              <n-card>
                <n-space vertical>
                  <br />
                  <n-button type="error" strong secondary>
                    <icon-material-symbols-cleaning-bucket-outline-rounded class="text-24px" />
                  </n-button>
                  <n-button type="info" strong secondary>
                    <icon-mdi-arrow-top-right-bold-box class="text-24px" />
                  </n-button>
                  <n-button type="error" strong secondary>
                    <icon-material-symbols-cleaning-bucket class="text-24px" />
                  </n-button>
                  <br />
                </n-space>
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { deleteAllWarn, queryAllWarn } from '@/service/api/warn';
const message = useMessage();
const warnValue = ref('');
const logValue: string = ref(
  '`1` 日志输出\n`2`\n`3`\n`4` 回流焊系统开发中···\n`5`\n`6`\n`7`\n`8`\n`9`\n`10`\n`11`\n`12`\n`13`\n`14`\n`15`\n`16`\n`17`'
);
onMounted(async () => {
  initDataWarn();
});
async function initDataWarn() {
  const { data } = await queryAllWarn();
  let logDetail = '';
  if (data) {
    for (let i = 0; i < data.length; i++) {
      logDetail = `${logDetail}\`${i + 1}\`  时间:${data[i].createTime} ${data[i].remark} \n`;
    }
  }
  warnValue.value = logDetail;
}
async function reset() {
  const { data } = await deleteAllWarn();
  message.success('删除成功');
  initDataWarn();
}
</script>

<style scoped></style>
