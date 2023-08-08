<template>
  <div>
    <n-card :bordered="false" class="rounded-16px shadow-sm">
      <div class="w-full h-180px">
        <n-grid :x-gap="12" :y-gap="8" :cols="4">
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <p class="py-8px text-20px">传感器</p>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <p class="py-8px text-20px">PCB间距</p>
            </div>
            <div style="text-align: center">
              <n-button type="primary" class="w-72px">{{ pcbDistance }}</n-button>
              <span class="py-26px text-14px">cm</span>
            </div>
            <div v-if="iNSensorStateShow" class="flex-col-center p-3px">
              <n-button strong secondary type="success" class="button-style">进口传感器</n-button>
            </div>
            <div v-if="inDoorStateShow" class="flex-col-center p-3px">
              <n-button strong secondary type="success" class="button-style">进板闸门</n-button>
            </div>
            <div v-if="!iNSensorStateShow" class="flex-col-center p-3px">
              <n-button type="tertiary" class="button-style">进口传感器</n-button>
            </div>
            <div v-if="!inDoorStateShow" class="flex-col-center p-3px">
              <n-button type="tertiary" class="button-style">进板闸门</n-button>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <p class="py-8px text-20px">上升沿</p>
            </div>
            <div style="text-align: center">
              <n-button type="primary" class="w-72px">{{ risingEdgeDelay }}</n-button>
              <span class="py-26px text-14px">sec</span>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <p class="py-8px text-20px">下降沿</p>
            </div>
            <div style="text-align: center">
              <n-button type="primary" class="w-72px">{{ fallingEdgeDelay }}</n-button>
              <span class="py-26px text-14px">sec</span>
            </div>
            <div v-if="!outSensorStateShow" class="flex-col-center p-3px">
              <n-button type="tertiary" class="button-style">出口传感器</n-button>
            </div>
            <div v-if="!outDoorStateShow" class="flex-col-center p-3px">
              <n-button type="tertiary" class="button-style">出板闸门</n-button>
            </div>
            <div v-if="outSensorStateShow" class="flex-col-center p-3px">
              <n-button strong secondary type="success" class="button-style">出口传感器</n-button>
            </div>
            <div v-if="outDoorStateShow" class="flex-col-center p-3px">
              <n-button strong secondary type="success" class="button-style">出板闸门</n-button>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </n-card>
    <n-card :bordered="false" class="rounded-16px shadow-sm" style="margin-top: 20px">
      <div class="w-full h-160px">
        <n-grid :item-responsive="true" :x-gap="16">
          <n-grid-item span="0:8 640:8 1024:8">
            <div class="p-5px">
              <span class="py-20px text-16px">SMEMA信号控制</span>
              <span class="py-20px text-16px" style="margin-left: 10px">手动要板</span>
              <n-switch v-model:value="active" :round="false" size="medium" class="p-15px" />
              <span class="py-20px text-16px">禁止进板</span>
              <n-switch v-model:value="active1" :round="false" size="medium" class="p-15px" />
            </div>
            <div class="p-5px">
              <n-button color="#F3EEEEFF" size="large">
                <template #icon>
                  <icon-clarity-success-standard-line class="text-24px text-green" />
                </template>
                进料(n)不忙
              </n-button>
            </div>
            <div class="p-5px">
              <span class="py-26px text-14px p-5px">出料口卡住持续时间</span>
              <n-button type="tertiary" class="p-15px w-72px" @click="clickOn">{{ delayValue }}</n-button>
              <span class="py-26px text-14px p-5px">sec</span>
            </div>
          </n-grid-item>
          <n-grid-item span="0:8 640:8 1024:8">
            <div class="flex-col-center p-3px" v-if="showAdminButton">
              <p class="py-8px text-20px">模式</p>
              <n-button v-if="model" type="primary" class="p-15px button-style" @click="changeModel">测温模式</n-button>
              <n-button v-if="!model" type="success" class="p-15px button-style" @click="changeModel"
                >生产模式</n-button
              >
            </div>
          </n-grid-item>
          <n-grid-item span="0:8 640:8 1024:8">
            <div class="flex-col-center p-3px">
              <n-button color="#F3EEEEFF" size="large" class="button-style">
                <template #icon>
                  <icon-akar-icons-sound-on class="text-24px text-green" />
                </template>
                声音
              </n-button>
            </div>
            <div class="flex-col-center p-5px">
              <n-button type="tertiary" class="p-15px button-style">后道出料可用</n-button>
            </div>
            <div class="flex-col-center p-5px">
              <n-button type="tertiary" class="p-15px button-style">OK</n-button>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </n-card>
    <n-card :bordered="false" class="rounded-16px shadow-sm" style="margin-top: 20px">
      <div class="w-full h-160px">
        <n-grid :x-gap="12" :y-gap="8" :cols="3">
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <p class="py-8px text-20px">传感器</p>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <span class="py-10px text-18px">进板传感器</span>
              <n-button type="success" class="py-10px text-18px">重置</n-button>
            </div>
            <div style="text-align: center" class="py-12px">
              <span class="text-18px">处理Inlet</span>
            </div>
          </n-grid-item>
          <n-grid-item>
            <div class="flex-col-center p-3px">
              <span class="py-10px text-18px">重置出板区</span>
              <n-button type="success" class="py-10px text-18px">重置</n-button>
            </div>
            <div style="text-align: center" class="py-12px">
              <span class="text-18px">处理Outlet</span>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </n-card>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalDelayValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalDelayValue"
        :keyboard-class="keyboardClass"
        :input="finalDelayValue"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { localStg } from '@/utils';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import { keepGetting, saveJson } from '@/service/api/home';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
const active = ref(true);
const active1 = ref(true);
const pcbDistance = ref(0);
const risingEdgeDelay = ref(0);
const fallingEdgeDelay = ref(0);
const tagName = 'productNavigation';
const uuid = ref('');
const iNSensorStateShow = ref(false);
const outSensorStateShow = ref(false);
const inDoorStateShow = ref(false);
const outDoorStateShow = ref(false);
const model = ref(false);
const maxlength = ref(999);
const minValue = ref(0);
const maxValue = ref(0);
const delayState = ref(false);
const delayValue = ref(0);
const finalDelayValue = ref('');
const coverShowModal = ref(false);
const showAdminButton = ref(false);
onMounted(async () => {
  const refreshToken = localStg.get('userInfo') || '';
  if (refreshToken) {
    if (refreshToken.userRole === '超级管理员') {
      showAdminButton.value = true;
    }
  }
  uuid.value = guid(tagName);
  createSocket(uuid.value);
  window.addEventListener('onmessageWS', handleWsMsg);
  const param = {
    'Application.HMI_VacuumConfig.h_xVacuumMainSwitch': 'boolean',
    'Application.HMI_VacuumConfig.h_rProductLengthMeasured': 'float',
    'Application.HMI_VacuumConfig.h_rProductLengthSetting': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumPV': 'float',
    'Application.HMI_VacuumConfig.h_rProductEntryToVacuumZoneTime': 'float',
    'Application.HMI_VacuumConfig.h_xVacuumResetButton': 'boolean',
    'Application.HMI_VacuumConfig.h_xNormalALarmResetButton': 'boolean',
    'Application.HMI_TrackConfig.h_rPCB_SeparationDistance': 'float',
    'Application.HMI_TrackConfig.h_rInSensorRisingEdgeDelay': 'float',
    'Application.HMI_TrackConfig.h_rInSensorFallingEdgeDelay': 'float',
    'Application.HMI_VacuumConfig.h_xCylinderSwitch[0]': 'boolean',
    'Application.HMI_VacuumConfig.h_xCylinderSwitch[1]': 'boolean',
    'Application.HMI_CountConfig.h_diPCB_Counter': 'int',
    'Application.HMI_VacuumConfig.h_xVacuumPumpManulSwitch': 'boolean',
    'Application.HMI_VacuumConfig.h_xVacuumValueSwitch': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumStatePV': 'float',
    'Application.HMI_TrackConfig.h_xINSensorState': 'boolean',
    'Application.HMI_TrackConfig.h_xOutSensorState': 'boolean',
    'Application.HMI_TrackConfig.h_xInDoorState': 'boolean',
    'Application.HMI_TrackConfig.h_xOutDoorState': 'boolean',
    'Application.HMI_CountConfig.h_xoffLineMode': 'boolean',
    'Application.HMI_AlarmConfig.h_xKartunAlarm': 'boolean',
    'Application.HMI_AlarmConfig.h_rKartuntime': 'float'
  };
  keepGetting(tagName, param);
});
onBeforeUnmount(() => {
  closeSocket();
});

// 处理服务端websocket发送过来的消息
function handleWsMsg(e: any) {
  const data = JSON.parse(e.detail.data.data);
  if (data) {
    const {
      'Application.HMI_TrackConfig.h_rPCB_SeparationDistance': pcbDistanceValue,
      'Application.HMI_TrackConfig.h_rInSensorRisingEdgeDelay': risingEdgeDelayValue,
      'Application.HMI_TrackConfig.h_rInSensorFallingEdgeDelay': fallingEdgeDelaValue,
      'Application.HMI_TrackConfig.h_xINSensorState': iNSensorStateValue,
      'Application.HMI_TrackConfig.h_xOutSensorState': outSensorStateValue,
      'Application.HMI_TrackConfig.h_xInDoorState': inDoorStateValue,
      'Application.HMI_TrackConfig.h_xOutDoorState': outDoorStateValue,
      'Application.HMI_CountConfig.h_xoffLineMode': modelValue,
      'Application.HMI_AlarmConfig.h_xKartunAlarm': KartunAlarm,
      'Application.HMI_AlarmConfig.h_rKartuntime': Kartuntime
    } = data.result;
    delayState.value = KartunAlarm;
    delayValue.value = Number(Kartuntime) / 1000;
    model.value = modelValue;
    pcbDistance.value = pcbDistanceValue;
    risingEdgeDelay.value = risingEdgeDelayValue;
    if (fallingEdgeDelaValue) {
      fallingEdgeDelay.value = Number(fallingEdgeDelaValue).toFixed(2);
    }
    iNSensorStateShow.value = iNSensorStateValue;
    outSensorStateShow.value = outSensorStateValue;
    inDoorStateShow.value = inDoorStateValue;
    outDoorStateShow.value = outDoorStateValue;
  }
}

async function changeModel() {
  const Param = {
    result: !model.value,
    dataType: 'boolean',
    name: 'Application.HMI_CountConfig.h_xoffLineMode'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  finalDelayValue.value = '';
  minValue.value = 0;
  maxValue.value = 99;
}
function onChange(e) {
  finalDelayValue.value = e;
}
async function onKeyPress() {
  if (Number(finalDelayValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalDelayValue.value) > Number(maxValue.value)) {
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
    const Param = {
      result: Number(finalDelayValue.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_AlarmConfig.h_rKartuntime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
</script>

<style scoped>
.button-style {
  width: 105px;
}
</style>
