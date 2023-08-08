<template>
  <div>
    <n-card title="轨道配置" class="shadow-sm rounded-16px parent-box">
      <n-card class="shadow-sm rounded-16px single-card">
        <div style="margin-top: 10px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:5 640:5 1024:5">
              <div class="flex-col-center">
                <img src="../img/speed.png" alt="speed" style="margin: auto" />
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div class="flex-col-center">
                  <span class="text-16px">预热区链速</span>
                </div>
                <div>
                  <div style="display: flex; justify-content: center; align-items: center">
                    <n-button :style="{ width: '60%' }" strong secondary type="primary" @click="clickOn">
                      <template #icon> </template>
                      {{ settingSpeed }}
                    </n-button>
                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
                  </div>
                </div>
                <div class="flex-col-center">
                  <span class="text-16px">冷却区链速</span>
                </div>
                <div>
                  <div style="display: flex; justify-content: center; align-items: center">
                    <n-button :style="{ width: '60%' }" strong secondary type="primary" @click="clickCold">
                      <template #icon> </template>
                      {{ settingColdSpeed }}
                    </n-button>
                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
                  </div>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track1.png" alt="track1" style="margin: auto" />
              </div>
              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">中间支撑高度</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2" class="flex-col-center"> </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track2.png" alt="track2" style="margin: auto" />
              </div>
              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">中间支撑宽度</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2" class="flex-col-center"> </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track3.png" alt="track3" style="margin: auto" />
              </div>
              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">轨道宽度</span>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <div style="margin-top: -80px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:5 640:5 1024:5"> </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnOne"
                  >{{ settingSupportHeight }}</n-button
                >
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"> </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnTwo"
                  >{{ settingSupportWidth }}</n-button
                >
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"> </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnThree"
                  >{{ settingTrackWidth }}</n-button
                >
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <div style="margin-top: 30px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:8 640:8 1024:8"> </n-grid-item>
            <n-grid-item span="0:8 640:8 1024:8">
              <n-button v-show="showVisible" strong secondary type="error" style="width: 100%; height: 65px"
                >超时</n-button
              >
            </n-grid-item>
            <n-grid-item span="0:8 640:8 1024:8">
              <n-button v-show="showVisible" strong secondary type="error" style="width: 100%; height: 65px"
                >超时</n-button
              ></n-grid-item
            >
          </n-grid>
        </div>
        <div>
          <n-button type="primary" @click="saveFile"> 保存</n-button>
        </div>
      </n-card>
    </n-card>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalSpeed" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalSpeed"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalSpeed"
        :max-length="maxlength"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalOne" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalSupportHeight" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalSupportHeight"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalSupportHeight"
        :max-length="maxlength"
        @onChange="onChangeOne"
        @onKeyPress="onKeyPressOne"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalTwo" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalSupportWidth" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalSupportWidth"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalSupportWidth"
        :max-length="maxlength"
        @onChange="onChangeTwo"
        @onKeyPress="onKeyPressTwo"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalThree" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalTrackWidth" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalTrackWidth"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalTrackWidth"
        :max-length="maxlength"
        @onChange="onChangeThree"
        @onKeyPress="onKeyPressThree"
      />
    </n-modal>
    <n-modal v-model:show="coverColdShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalColdSpeed" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalColdSpeed"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalColdSpeed"
        :max-length="maxlength"
        @onChange="onChangeColdSpeed"
        @onKeyPress="onKeyPressColdSpeed"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { saveJson } from '@/service/api/home';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
import { queryTrackValue, savaAsFile, savaAsTrackFile } from '@/service/api/parm';
const settingSpeed = ref('2.0');
const settingColdSpeed = ref('2.0');
const finalSpeed = ref('');
const finalColdSpeed = ref('');
const settingSupportHeight = ref('-7.0');
const finalSupportHeight = ref('');
const settingSupportWidth = ref('51.0');
const finalSupportWidth = ref('');
const settingTrackWidth = ref('102.6');
const finalTrackWidth = ref('');
const coverShowModal = ref(false);
const coverColdShowModal = ref(false);
const showWarningOne = ref(false);
const showWarningTwo = ref(false);
const showWarningThree = ref(false);
const coverShowModalOne = ref(false);
const coverShowModalTwo = ref(false);
const coverShowModalThree = ref(false);
const showVisible = ref(false);
const maxlength = ref(999);
const minValue = ref(0);
const maxValue = ref(0);
onMounted(async () => {
  const { data } = await queryTrackValue();
  if (data) {
    const {
      'Application.HMI_TrackConfig.h_rMiddleSupportHightSV[0]': settingSupHeightValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV[0]': settingSupWidthValue,
      'Application.HMI_TrackConfig.h_rTrackWidthSV[0]': settingTrackValue,
      'Application.HMI_HomePage.h_rChainSpeedSV[0]': SpeedSVValue,
      'Application.HMI_HomePage.h_rChainSpeedSV[3]': SpeedColdSVValue
    } = data;
    settingSupportHeight.value = settingSupHeightValue;
    settingSupportWidth.value = settingSupWidthValue;
    settingTrackWidth.value = settingTrackValue;
    if (SpeedSVValue) {
      settingSpeed.value = convertMmPerSecToMPerMin(SpeedSVValue);
    }
    if (SpeedColdSVValue) {
      settingColdSpeed.value = convertMmPerSecToMPerMin(SpeedColdSVValue);
    }
  }
});
onBeforeUnmount(() => {});

function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 3;
  finalSpeed.value = '';
}
function clickCold() {
  if (coverColdShowModal.value === true) {
    coverColdShowModal.value = false;
  } else {
    coverColdShowModal.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 3;
  finalColdSpeed.value = '';
}

function clickOnOne() {
  if (coverShowModalOne.value === true) {
    coverShowModalOne.value = false;
  } else {
    coverShowModalOne.value = true;
  }
  minValue.value = 0;
  maxValue.value = 99;
  finalSupportHeight.value = '';
}

function clickOnTwo() {
  if (coverShowModalTwo.value === true) {
    coverShowModalTwo.value = false;
  } else {
    coverShowModalTwo.value = true;
  }
  minValue.value = 0;
  maxValue.value = 99;
  finalSupportWidth.value = '';
}

function clickOnThree() {
  if (coverShowModalThree.value === true) {
    coverShowModalThree.value = false;
  } else {
    coverShowModalThree.value = true;
  }
  minValue.value = 0;
  maxValue.value = 99;
  finalTrackWidth.value = '';
}

async function onKeyPress() {
  if (Number(finalSpeed.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalSpeed.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    settingSpeed.value = finalSpeed.value;
  }
}
async function onKeyPressColdSpeed() {
  if (Number(finalColdSpeed.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalColdSpeed.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    settingColdSpeed.value = finalColdSpeed.value;
  }
}
function onChange(e) {
  finalSpeed.value = e;
  if (Number(settingSpeed.value) > 50) {
    showVisible.value = true;
  } else {
    showVisible.value = false;
  }
}

async function onKeyPressOne() {
  if (Number(finalSupportHeight.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalSupportHeight.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    settingSupportHeight.value = finalSupportHeight.value;
  }
}
function onChangeOne(e) {
  finalSupportHeight.value = e;
  if (Number(settingSupportHeight.value) > 50) {
    showWarningOne.value = true;
  } else {
    showWarningOne.value = false;
  }
}
function onChangeColdSpeed(e) {
  finalColdSpeed.value = e;
}

async function onKeyPressTwo() {
  if (Number(finalSupportWidth.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalSupportWidth.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    settingSupportWidth.value = finalSupportWidth.value;
  }
}
function onChangeTwo(e) {
  finalSupportWidth.value = e;
  if (Number(settingSupportWidth.value) > 50) {
    showWarningTwo.value = true;
  } else {
    showWarningTwo.value = false;
  }
}

async function onKeyPressThree() {
  if (Number(finalTrackWidth.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalTrackWidth.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    settingTrackWidth.value = finalTrackWidth.value;
  }
}
function onChangeThree(e) {
  finalTrackWidth.value = e;
  if (Number(settingTrackWidth.value) > 50) {
    showWarningThree.value = true;
  } else {
    showWarningThree.value = false;
  }
}
function convertMmPerSecToMPerMin(mmPerSec) {
  const mPerSec = Math.abs(Number(mmPerSec)) / 1000;
  const mPerMin = mPerSec * 60;
  return mPerMin.toFixed(2);
}
function MmPerSecToMPerMin(mmPerSec) {
  const mPerSec = Number(mmPerSec) * 1000;
  const mPerMin = mPerSec / 60;
  return mPerMin.toFixed(2);
}
async function saveFile() {
  const param = {
    'Application.HMI_TrackConfig.h_rMiddleSupportHightSV[0]': settingSupportHeight.value,
    'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV[0]': settingSupportWidth.value,
    'Application.HMI_TrackConfig.h_rTrackWidthSV[0]': settingTrackWidth.value,
    'Application.HMI_HomePage.h_rChainSpeedSV[0]': MmPerSecToMPerMin(settingSpeed.value),
    'Application.HMI_HomePage.h_rChainSpeedSV[3]': MmPerSecToMPerMin(settingColdSpeed.value)
  };
  const success = await savaAsTrackFile(param);
}
</script>

<style scoped>
.parent-box {
  width: 80%;
  height: 550px;
  margin: 0% auto;
}
.single-card {
  height: 480px;
}
.input-head {
  width: 90px;
}
.single-button {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}
.input-group-head {
  width: 120px;
}
</style>
