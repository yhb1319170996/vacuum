<template>
  <n-card :bordered="false" style="width: 100%">
    <div class="w-full h-300px">
      <div>
        <n-grid :item-responsive="true" :x-gap="16">
          <n-grid-item span="0:4 640:5 1024:4">
            <div v-if="!vacuumInSensor">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-green" />
              </div>
            </div>
            <div v-if="vacuumInSensor">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-gray-300" />
              </div>
            </div>
            <div>
              <div class="flex-col-center">
                <span>进板长度</span>
                <button>{{ inDoorLength }}</button>
              </div>
            </div>
          </n-grid-item>
          <n-grid-item span="0:16 640:16 1024:16">
            <div style="height: 100%">
              <div
                v-if="animationNum === 1"
                id="style-switcher"
                style="width: 100%; height: 60px; background-color: yellow; border-radius: 8px 8px 1px 1px"
              ></div>
              <div
                v-if="animationNum === 0"
                style="width: 100%; height: 60px; background-color: #afa6a6ff; border-radius: 8px 8px 1px 1px"
              ></div>
              <div
                v-if="animationNum === 2"
                :style="{
                  backgroundColor: `#afa6a6ff`,
                  width: `100%`,
                  height: `210px`,
                  border: `2px white solid`,
                  borderRadius: `8px 8px 8px 8px`
                }"
              >
                <div class="progress-bar1" :style="{ height: progress + '%', borderRadius: '8px 8px 8px 8px' }"></div>
              </div>
              <div v-if="animationNum === 3" class="box-with-lid">
                <div class="box-body">
                  <div
                    class="progress-bar1"
                    :style="{ height: decreaseProgress + '%', borderRadius: '8px 8px 8px 8px' }"
                  ></div>
                </div>
                <div class="box-lid">
                  <div
                    class="progress-bar1"
                    :style="{ height: decreaseProgressTop + '%', borderRadius: '8px 8px 0px 0px' }"
                  ></div>
                </div>
              </div>
              <transition name="box">
                <dov v-if="isOpened" style="width: 100%; height: 36px" class="box">
                  <div style="height: 32px">
                    <br />
                  </div>
                  <div style="height: 20px">
                    <n-progress
                      height="20px"
                      type="line"
                      :percentage="percent"
                      :indicator-placement="'inside'"
                      color="green"
                      processing
                      :border-radius="0"
                      :fill-border-radius="0"
                    />
                  </div>
                </dov>
              </transition>
              <div
                v-if="animationNum === 0"
                style="width: 100%; height: 150px; background-color: #afa6a6ff; border-radius: 1px 1px 8px 8px"
              ></div>
              <div
                v-if="animationNum === 1"
                style="width: 100%; height: 150px; background-color: #afa6a6ff; border-radius: 1px 1px 8px 8px"
              ></div>
            </div>
          </n-grid-item>
          <n-grid-item span="0:4 640:4 1024:4">
            <div v-if="!vacuumOutSensor">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-green" />
              </div>
            </div>
            <div v-if="vacuumOutSensor">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-gray-300" />
              </div>
            </div>
            <div>
              <div class="flex-col-center">
                <span>出板长度</span>
                <button>{{ outDoorLength }}</button>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
    <div style="margin-top: 10px">
      <n-grid :item-responsive="true" :x-gap="16">
        <n-grid-item span="0:12 640:12 1024:12">
          <div style="height: 100%">
            <span class="py-8px text-16px" style="padding-left: 30px">真空</span>
            <n-button type="primary" size="small" style="margin-left: 20px; width: 50px" @click="clickOn">
              {{ statePV }}
            </n-button>
            <span class="py-8px text-16px" style="padding-left: 5px">mbar</span>
          </div>
        </n-grid-item>
        <n-grid-item span="0:12 640:12 1024:12">
          <div style="height: 100%">
            <span class="py-8px text-16px" style="padding-left: 15px">真空</span>
            <n-button type="primary" size="small" style="margin-left: 20px; width: 50px" @click="clickOnDuring">
              {{ duringTime }}
            </n-button>
            <span class="py-8px text-16px" style="padding-left: 5px">秒</span>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <div style="margin-top: 10px">
      <n-grid :item-responsive="true" :x-gap="16">
        <n-grid-item span="0:12 640:12 1024:12">
          <div style="height: 100%">
            <span class="py-8px text-16px" style="padding-left: 30px">保持</span>
            <n-button type="primary" size="small" style="margin-left: 20px; width: 50px" @click="clickOnHolding">
              {{ holdingTime }}
            </n-button>
            <span class="py-8px text-16px" style="padding-left: 5px">秒</span>
          </div>
        </n-grid-item>
        <n-grid-item span="0:12 640:12 1024:12">
          <div style="height: 100%">
            <span class="py-8px text-16px" style="padding-left: 15px">回压</span>
            <n-button type="primary" size="small" style="margin-left: 20px; width: 50px" @click="clickOnReback">
              {{ rebackTime }}
            </n-button>
            <span class="py-8px text-16px" style="padding-left: 5px">秒</span>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumValue"
        :max-length="maxlength"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalDuring" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalDuringTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalDuringTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalDuringTime"
        :max-length="maxlength"
        @onChange="onChangeDuring"
        @onKeyPress="onKeyPressDuring"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalHolding"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalHoldingTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalHoldingTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalHoldingTime"
        :max-length="maxlength"
        @onChange="onChangeHolding"
        @onKeyPress="onKeyPressHolding"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalReback" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalReback" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalReback"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalReback"
        :max-length="maxlength"
        @onChange="onChangeReback"
        @onKeyPress="onKeyPressReback"
      />
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
import { saveJson } from '@/service/api/home';
const trackStatus = ref(false);
const vacuumInSensor = ref(true);
const vacuumOutSensor = ref(true);
const statePV = ref(0);
const holdingTime = ref(0);
const duringTime = ref(0);
const rebackTime = ref(0);
const inDoorLength = ref(0);
const outDoorLength = ref(0);
const props = defineProps({
  displayValue: {
    default: 0
  },
  duringTime: { default: 0 },
  holdingTime: { default: 0 },
  rebackTime: { default: 0 },
  trackStatus: { default: false },
  vacuumInSensor: { default: true },
  vacuumOutSensor: { default: true },
  vacuumValue: { default: 0 },
  inLength: { default: 0 },
  outLength: { default: 0 },
  mode: { default: 0 }
});
let intervalIndoor = null;
let intervalDelay = null;
defineOptions({ name: 'VacuumAnimation' });
const isOpened = ref(true);
const model = ref(0);
const percent = ref(0);
const progress = ref(0);
const decreaseProgress = ref(100);
const decreaseProgressTop = ref(100);
const animationNum = ref(0);
const vacuumValue = ref(0);
const coverShowModal = ref(false);
const coverShowModalDuring = ref(false);
const coverShowModalHolding = ref(false);
const coverShowModalReback = ref(false);
const minValue = ref(0);
const maxValue = ref(0);
const maxlength = ref(999);
const finalVacuumValue = ref('');
const finalDuringTime = ref('');
const finalHoldingTime = ref('');
const finalReback = ref('');
onMounted(async () => {});
watch(props, newValue => {
  statePV.value = newValue.displayValue;
  duringTime.value = newValue.duringTime;
  holdingTime.value = newValue.holdingTime;
  rebackTime.value = newValue.rebackTime;
  trackStatus.value = newValue.trackStatus;
  model.value = newValue.mode;
  vacuumInSensor.value = newValue.vacuumInSensor;
  vacuumOutSensor.value = newValue.vacuumOutSensor;
  inDoorLength.value = newValue.inLength.toFixed(2);
  outDoorLength.value = newValue.outLength.toFixed(2);
  vacuumValue.value = Number(props.vacuumValue).toFixed(1);
});
watch(decreaseProgress, newValue => {
  if (newValue <= 0) {
    let timer2;
    timer2 = setInterval(() => {
      if (decreaseProgressTop.value > 0) {
        decreaseProgressTop.value -= 20;
      } else {
        clearInterval(timer2);
      }
    }, 500);
  }
});
watch(vacuumInSensor, newValue => {
  if (newValue == false) {
    intervalIndoor = setInterval(() => {
      console.log(inDoorLength.value, '长度');
      percent.value = (Number(inDoorLength.value) / 400) * 100;
      percent.value = percent.value.toFixed(2);
    }, 1000);
  }
  if (newValue == true) {
    console.log('动画开始');
    // eslint-disable-next-line no-plusplus
    clearInterval(intervalIndoor);
    intervalDelay = setTimeout(() => {
      isOpened.value = false;
      animationNum.value = 1;
      setTimeout(() => {
        let timer1;
        let timer2;
        const updateProgress = () => {
          if (progress.value < 100) {
            progress.value += 5;
          }
          animationNum.value = 2;
          if (progress.value >= 100) {
            animationNum.value = 3;
            clearInterval(timer1);
            timer2 = setInterval(() => {
              if (decreaseProgress.value > 0) {
                decreaseProgress.value -= 5;
              } else {
                clearInterval(timer2);
              }
            }, 500);
          }
        };

        timer1 = setInterval(updateProgress, 400);
      }, 6000);
    }, 4000);
  }
});
watch(vacuumOutSensor, newValue => {
  if (vacuumOutSensor.value == false) {
    console.log('动画结束');
    animationNum.value = 0;
    isOpened.value = true;
    percent.value = 0;
    console.log(animationNum.value, '状态');
  }
});
function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  minValue.value = 2;
  maxValue.value = 1000;
  finalVacuumValue.value = '';
}
function clickOnDuring() {
  if (coverShowModalDuring.value === true) {
    coverShowModalDuring.value = false;
  } else {
    coverShowModalDuring.value = true;
  }
  minValue.value = 5;
  maxValue.value = 99;
  finalDuringTime.value = '';
}
function clickOnHolding() {
  if (coverShowModalHolding.value === true) {
    coverShowModalHolding.value = false;
  } else {
    coverShowModalHolding.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalHoldingTime.value = '';
}
function clickOnReback() {
  if (coverShowModalReback.value === true) {
    coverShowModalReback.value = false;
  } else {
    coverShowModalReback.value = true;
  }
  minValue.value = 5;
  maxValue.value = 99;
  finalReback.value = '';
}
function onChange(e) {
  finalVacuumValue.value = e;
}
function onChangeDuring(e) {
  finalDuringTime.value = e;
}
function onChangeHolding(e) {
  finalHoldingTime.value = e;
}
function onChangeReback(e) {
  finalReback.value = e;
}
async function onKeyPress() {
  if (Number(finalVacuumValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumValue.value) > Number(maxValue.value)) {
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
    if (model.value === 1) {
      const Param = {
        result: finalVacuumValue.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 2) {
      const Param = {
        result: finalVacuumValue.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 3) {
      const Param = {
        result: finalVacuumValue.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressDuring() {
  if (Number(finalDuringTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalDuringTime.value) > Number(maxValue.value)) {
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
    if (model.value === 1) {
      const Param = {
        result: Number(finalDuringTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 2) {
      const Param = {
        result: Number(finalDuringTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 3) {
      const Param = {
        result: Number(finalDuringTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressHolding() {
  if (Number(finalHoldingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalHoldingTime.value) > Number(maxValue.value)) {
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
    if (model.value === 1) {
      const Param = {
        result: Number(finalHoldingTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 2) {
      const Param = {
        result: Number(finalHoldingTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 3) {
      const Param = {
        result: Number(finalHoldingTime.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressReback() {
  if (Number(finalReback.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalReback.value) > Number(maxValue.value)) {
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
    if (model.value === 1) {
      const Param = {
        result: Number(finalReback.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 2) {
      const Param = {
        result: Number(finalReback.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (model.value === 3) {
      const Param = {
        result: Number(finalReback.value) * 1000,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
</script>

<style scoped>
.light-style {
  margin-top: 105px;
}
.container {
  width: 200px;
  margin: 0 auto;
  text-align: center;
}

.box {
  width: 100%;
  height: 5%;
  background-color: red;
  transform: scale(1, 1) translateY(0);
  transition: all 0.5s ease-in-out;
}

.progress-bar1 {
  width: 100%;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #b5f0ca;
  transition: width 0.5s ease-in-out;
}
.box-with-lid {
  background-color: #afa6a6ff;
  width: 100%;
  height: 210px;
  border: 2px white solid;
  border-radius: 8px;
  position: relative;
}

.box-body {
  height: 206px;
  border-radius: 8px 8px 8px 8px;
}

.progress-bar {
  background-color: mediumseagreen;
  width: 100%;
}

.box-lid {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #afa6a6ff;
  border: 2px white solid;
  border-radius: 8px 8px 0 0;
}
</style>
