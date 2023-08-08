<template>
  <div>
    <n-space>
      <div v-for="(stoveItem, i) in stoveConfigList" :key="i">
        <!-- 顶部炉温配置 -->
        <n-card
          :title="stoveItem.name"
          class="rounded-16px shadow-sm stove-panel"
          :start-color="['#ec4786', '#b955a4']"
        >
          <n-space vertical>
            <n-input-group>
              <n-button size="small">
                <icon-mingcute-fan-fill class="text-24px text-green" />
              </n-button>
              <n-input v-model:value="upperFanArray[i]" size="small" :input-props="{ onClick: () => clickOnTop(i) }">
                <template #suffix></template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button type="primary" size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input
                v-model:value="settingTemperatureArray[i]"
                size="small"
                :input-props="{ onClick: () => clickOn(i) }"
              >
                <template #suffix>℃</template>
              </n-input>
            </n-input-group>
            <!-- 温度对比 -->
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-switch
                  v-model:value="topSwitch[i]"
                  :round="false"
                  style="margin-top: 35px"
                  @update-value="changeTopSwitch(i)"
                />
              </n-gi>
              <n-gi span="3">
                <div style="transform: rotate(270deg); margin-left: 20px">
                  <n-progress
                    type="line"
                    status="info"
                    :percentage="getHeatProgress(settingTemperatureArray[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 35px"
                  />
                </div>
              </n-gi>
            </n-grid>
          </n-space>
        </n-card>
        <!-- 底部炉温配置 -->
        <n-card v-if="i <= 10" class="rounded-16px shadow-sm stove-panel">
          <n-space vertical>
            <!-- 温度对比 -->
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-switch
                  v-model:value="bottomSwitch[i]"
                  :round="false"
                  style="margin-top: 25px"
                  @update-value="changeBottomSwitch(i)"
                />
              </n-gi>
              <n-gi span="3">
                <div style="transform: rotate(270deg); margin-left: 20px">
                  <n-progress
                    type="line"
                    status="info"
                    :percentage="getHeatProgress(settingTemperatureArrayDown[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 25px"
                  />
                </div>
              </n-gi>
            </n-grid>
            <n-input-group style="margin-top: 35px">
              <n-button size="small">
                <icon-mingcute-fan-fill class="text-24px text-green" />
              </n-button>
              <n-input v-model:value="lowerFanArray[i]" size="small" :input-props="{ onClick: () => clickOnBottom(i) }">
                <template #suffix></template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button type="primary" size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input
                v-model:value="settingTemperatureArrayDown[i]"
                size="small"
                :input-props="{ onClick: () => clickOnDown(i) }"
              >
                <template #suffix>℃</template>
              </n-input>
            </n-input-group>
            <n-gradient-text type="info" size="20" style="width: 40px; margin-left: 32%">底部</n-gradient-text>
          </n-space>
        </n-card>
      </div>
      <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalStoveItemValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalStoveItemValue"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalStoveItemValue"
          :max-length="maxlength"
          @onChange="onChange"
          @onKeyPress="onKeyPress"
        />
      </n-modal>
      <n-modal v-model:show="coverShowModalDown" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalStoveItemValueDown" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalStoveItemValueDown"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalStoveItemValueDown"
          :max-length="maxlength"
          @onChange="onChangeDown"
          @onKeyPress="onKeyPressDown"
        />
      </n-modal>
      <n-modal v-model:show="topShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalTopFanValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalTopFanValue"
          :min-value="0"
          :max-value="5"
          :keyboard-class="keyboardClass"
          :input="finalTopFanValue"
          :max-length="maxlength"
          @onChange="onChangeTopFan"
          @onKeyPress="handleKeyPressTopFan"
        />
      </n-modal>
      <n-modal v-model:show="bottomShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalBottomFanValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalBottomFanValue"
          :min-value="0"
          :max-value="5"
          :keyboard-class="keyboardClass"
          :input="finalBottomFanValue"
          :max-length="maxlength"
          @onChange="onChangeBottomFan"
          @onKeyPress="handleKeyPressBottomFan"
        />
      </n-modal>
    </n-space>
    <div class="p-10px">
      <n-button type="primary" size="large" @click="chickTrack">轨道配置</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="chickOnN2">氮气配置</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="chickOnVacuum">真空配置</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="chickOnTem">MES配置</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="saveProfile">保存编辑</n-button>
    </div>
    <n-modal v-model:show="showModalTrack" class="rounded-10px" preset="card" style="width: 1400px">
      <track-config></track-config>
    </n-modal>
    <n-modal v-model:show="showModalN2" class="rounded-10px" preset="card" style="width: 1400px">
      <nitrogen-config></nitrogen-config>
    </n-modal>
    <n-modal v-model:show="showModalVacuum" class="rounded-10px" preset="card" style="width: 1400px">
      <vacuum-config></vacuum-config>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { router } from '@/router';
import { saveJson } from '@/service/api/home';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
import { savaAsFile, saveEditFile, selectHeat } from '@/service/api/parm';
import TrackConfig from '@/views/profile/file/components/trackConfig.vue';
import NitrogenConfig from '@/views/profile/file/components/nitrogenConfig.vue';
import VacuumConfig from '@/views/profile/file/components/vacuumConfig.vue';
const maxlength = ref(999);
const coverShowModal = ref(false);
const coverShowModalDown = ref(false);
const topShowModal = ref(false);
const bottomShowModal = ref(false);
const stoveItemValue = ref('');
const finalStoveItemValue = ref('');
const stoveItemValueDown = ref('');
const finalStoveItemValueDown = ref('');
const topFanValue = ref('');
const finalTopFanValue = ref('');
const bottomFanValue = ref('');
const finalBottomFanValue = ref('');
const settingTemperatureArray = ref([80, 80, 80, 250, 250, 250, 120, 60]);
const settingTemperatureArrayDown = ref([80, 80, 80, 200, 200, 200, 120, 30]);
const upperFanArray = ref([4, 4, 4, 4, 4, 4, 5, 5]);
const lowerFanArray = ref([3, 3, 3, 3, 3, 3, 4, 4]);
const currentIndex = ref(0);
const topCurrentIndex = ref(0);
const bottomCurrentIndex = ref(0);
const topSwitch = ref([true, true, false, true, false, true, true, false]);
const bottomSwitch = ref([false, false, false, true, false, true, true, false]);
const minValue = ref(0);
const maxValue = ref(0);
const minTemperature = ref(20);
const maxTemperature = ref(0);
const showModalTrack = ref(false);
const showModalN2 = ref(false);
const showModalVacuum = ref(false);
interface StoveHeatConfig {
  name: string;
  topLevel: string;
  topTargetTemp: number;
  topActualTemp: number;
  topState: boolean;
  bottomLevel: string;
  bottomTargetTemp: number;
  bottomActualTemp: number;
  bottomState: boolean;
}
const stoveConfigList: StoveHeatConfig[] = reactive([
  {
    name: '预热1',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热2',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热3',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热4',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热5',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热6',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热7',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '高温1',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '高温2',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '高温3',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '真空',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '冷却区',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  }
]);
onMounted(async () => {
  const { data } = await selectHeat();
  if (data) {
    const {
      'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP': settingPreheatArrayValue,
      'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_UP': settingHighTemperatureArrayValue,
      'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP': settingVacuumArrayValue,
      'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_UP': settingBurialArrayValue,
      'Application.HMI_HomePage.h_iFanSpeedLevel_UP': upFanArrayValue,
      'Application.HMI_HomePage.h_iFanSpeedLevel_Down': downFanArrayValue,
      'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_DOWN': settingPreheatArrayValueDown,
      'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_DOWN': settingHighTemperatureArrayValueDown,
      'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_DOWN': settingBurialArrayValueDown,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': preHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': highHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': vacuumHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': coldHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': preHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': highHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': vacuumHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_Down': coldHeatSwitchDownValue
    } = data;
    if (
      settingPreheatArrayValue &&
      settingHighTemperatureArrayValue &&
      settingVacuumArrayValue &&
      settingBurialArrayValue
    ) {
      const settingArray = settingPreheatArrayValue
        .slice(0, 7)
        .concat(
          settingHighTemperatureArrayValue
            .slice(0, 3)
            .concat(settingVacuumArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 3)))
        );
      settingTemperatureArray.value = settingArray;
    }
    if (
      settingPreheatArrayValueDown &&
      settingHighTemperatureArrayValueDown &&
      settingVacuumArrayValue &&
      settingBurialArrayValueDown
    ) {
      const settingArrayDown = settingPreheatArrayValueDown
        .slice(0, 7)
        .concat(
          settingHighTemperatureArrayValueDown
            .slice(0, 3)
            .concat(settingVacuumArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 3)))
        );
      settingTemperatureArrayDown.value = settingArrayDown;
    }
    if (preHeatSwitchUpValue && highHeatSwitchUpValue && vacuumHeatSwitchUpValue && coldHeatSwitchUpValue) {
      const upSwitchObj = preHeatSwitchUpValue
        .slice(0, 7)
        .concat(
          highHeatSwitchUpValue
            .slice(0, 3)
            .concat(vacuumHeatSwitchUpValue.slice(0, 1).concat(coldHeatSwitchUpValue.slice(0, 3)))
        );
      topSwitch.value = upSwitchObj;
    }
    if (preHeatSwitchDownValue && highHeatSwitchDownValue && vacuumHeatSwitchDownValue && coldHeatSwitchDownValue) {
      const downSwitchObj = preHeatSwitchDownValue
        .slice(0, 7)
        .concat(
          highHeatSwitchDownValue
            .slice(0, 3)
            .concat(vacuumHeatSwitchUpValue.slice(0, 1).concat(coldHeatSwitchDownValue.slice(0, 3)))
        );
      bottomSwitch.value = downSwitchObj;
    }
    if (upFanArrayValue) {
      const topArrOne = upFanArrayValue[0];
      const topArrTwo = upFanArrayValue[1];
      const topArrThree = upFanArrayValue[2];
      const topObj = [];
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrTwo);
      topObj.push(topArrTwo);
      topObj.push(topArrTwo);
      topObj.push(topArrTwo);
      topObj.push(topArrThree);
      topObj.push(topArrThree);
      topObj.push(topArrThree);
      upperFanArray.value = topObj;
    }
    if (downFanArrayValue) {
      const bottomArrOne = downFanArrayValue[0];
      const bottomArrTwo = downFanArrayValue[1];
      const bottomObj = [];
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      lowerFanArray.value = bottomObj;
    }
  }
});

onBeforeUnmount(() => {});

function getHeatProgress(heatValue: number) {
  return (heatValue / 350) * 100;
}

function clickOn(value) {
  currentIndex.value = value;
  stoveItemValue.value = settingTemperatureArray.value[currentIndex.value];
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  if (value >= 0 && value <= 6) {
    maxTemperature.value = 300;
  } else if (value >= 7 && value <= 9) {
    maxTemperature.value = 350;
  } else if (value == 10) {
    maxTemperature.value = 350;
  } else {
    maxTemperature.value = 120;
    minTemperature.value = 40;
  }
  finalStoveItemValue.value = '';
}

function clickOnDown(value) {
  currentIndex.value = value;
  stoveItemValueDown.value = settingTemperatureArrayDown.value[currentIndex.value];
  if (coverShowModalDown.value === true) {
    coverShowModalDown.value = false;
  } else {
    coverShowModalDown.value = true;
  }
  if (value >= 0 && value <= 6) {
    maxTemperature.value = 300;
  } else if (value >= 7 && value <= 9) {
    maxTemperature.value = 350;
  } else if (value == 10) {
    maxTemperature.value = 350;
  } else {
    maxTemperature.value = 120;
    minTemperature.value = 40;
  }
  finalStoveItemValueDown.value = '';
}

function clickOnTop(value) {
  topCurrentIndex.value = value;
  finalTopFanValue.value = '';
  topFanValue.value = upperFanArray.value[topCurrentIndex.value];
  if (topShowModal.value === true) {
    topShowModal.value = false;
  } else {
    topShowModal.value = true;
  }
}

function clickOnBottom(value) {
  bottomCurrentIndex.value = value;
  bottomFanValue.value = lowerFanArray.value[bottomCurrentIndex.value];
  if (bottomShowModal.value === true) {
    bottomShowModal.value = false;
  } else {
    bottomShowModal.value = true;
  }
  finalBottomFanValue.value = '';
}
const onChange = (e: string) => {
  finalStoveItemValue.value = e;
};

const onChangeDown = (e: string) => {
  finalStoveItemValueDown.value = e;
};

const onChangeTopFan = (e: string) => {
  finalTopFanValue.value = e;
};

const onChangeBottomFan = (e: string) => {
  finalBottomFanValue.value = e;
};

async function onKeyPress() {
  if (Number(finalStoveItemValue.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalStoveItemValue.value) > Number(maxTemperature.value)) {
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
    const index = currentIndex.value;
    settingTemperatureArray.value[index] = finalStoveItemValue.value;
  }
}
async function onKeyPressDown() {
  if (Number(finalStoveItemValueDown.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalStoveItemValueDown.value) > Number(maxTemperature.value)) {
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
    const index = currentIndex.value;
    settingTemperatureArrayDown.value[currentIndex.value] = finalStoveItemValueDown.value;
  }
}
function changeBottomSwitch(value) {}
function changeTopSwitch(value) {}
async function handleKeyPressTopFan() {
  if (Number(finalTopFanValue.value) < 0) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalTopFanValue.value) > 5) {
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
    upperFanArray.value[topCurrentIndex.value] = finalTopFanValue.value;
    const index = topCurrentIndex.value;
    if (index >= 0 && index <= 6) {
      upperFanArray.value[0] = finalTopFanValue.value;
      upperFanArray.value[1] = finalTopFanValue.value;
      upperFanArray.value[2] = finalTopFanValue.value;
      upperFanArray.value[3] = finalTopFanValue.value;
      upperFanArray.value[4] = finalTopFanValue.value;
      upperFanArray.value[5] = finalTopFanValue.value;
      upperFanArray.value[6] = finalTopFanValue.value;
    } else if (index >= 7 && index <= 10) {
      upperFanArray.value[7] = finalTopFanValue.value;
      upperFanArray.value[8] = finalTopFanValue.value;
      upperFanArray.value[9] = finalTopFanValue.value;
      upperFanArray.value[10] = finalTopFanValue.value;
    } else {
      upperFanArray.value[11] = finalTopFanValue.value;
      upperFanArray.value[12] = finalTopFanValue.value;
      upperFanArray.value[13] = finalTopFanValue.value;
    }
  }
}
async function handleKeyPressBottomFan() {
  if (Number(finalBottomFanValue.value) < 0) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalBottomFanValue.value) > 5) {
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
    lowerFanArray.value[bottomCurrentIndex.value] = finalBottomFanValue.value;
    const index = bottomCurrentIndex.value;
    if (index >= 0 && index <= 5) {
      const Param = {
        result: finalBottomFanValue.value,
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_Down[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
      lowerFanArray.value[0] = finalBottomFanValue.value;
      lowerFanArray.value[1] = finalBottomFanValue.value;
      lowerFanArray.value[2] = finalBottomFanValue.value;
      lowerFanArray.value[3] = finalBottomFanValue.value;
      lowerFanArray.value[4] = finalBottomFanValue.value;
      lowerFanArray.value[5] = finalBottomFanValue.value;
      lowerFanArray.value[6] = finalBottomFanValue.value;
    } else {
      lowerFanArray.value[7] = finalBottomFanValue.value;
      lowerFanArray.value[8] = finalBottomFanValue.value;
      lowerFanArray.value[9] = finalBottomFanValue.value;
      lowerFanArray.value[10] = finalBottomFanValue.value;
      lowerFanArray.value[11] = finalBottomFanValue.value;
      lowerFanArray.value[12] = finalBottomFanValue.value;
      lowerFanArray.value[13] = finalBottomFanValue.value;
    }
  }
}
async function saveProfile() {
  const param = {
    'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP': settingTemperatureArray.value.slice(0, 7),
    'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_UP': settingTemperatureArray.value.slice(7, 10),
    'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP': settingTemperatureArray.value.slice(10, 11),
    'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_UP': settingTemperatureArray.value.slice(11, 14),
    'Application.HMI_HomePage.h_iFanSpeedLevel_UP': upperFanArray.value
      .slice(0, 1)
      .concat(upperFanArray.value.slice(7, 8).concat(upperFanArray.value.slice(12, 13))),
    'Application.HMI_HomePage.h_iFanSpeedLevel_Down': lowerFanArray.value
      .slice(0, 1)
      .concat(lowerFanArray.value.slice(12, 13)),
    'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_DOWN': settingTemperatureArrayDown.value.slice(0, 7),
    'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_DOWN': settingTemperatureArrayDown.value.slice(7, 10),
    'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_DOWN': settingTemperatureArrayDown.value.slice(10, 11),
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': topSwitch.value.slice(0, 7),
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': topSwitch.value.slice(7, 10),
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': topSwitch.value.slice(10, 11),
    'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': topSwitch.value.slice(11, 14),
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': bottomSwitch.value.slice(0, 7),
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': bottomSwitch.value.slice(7, 10),
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': bottomSwitch.value.slice(10, 11),
    'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_Down': bottomSwitch.value.slice(11, 14)
  };
  const success = await savaAsFile(param);
  console.log(success, 66);
  if (success.data) {
    saveEdit();
  }
}
function chickTrack() {
  router.push('/file/track');
}
function chickOnN2() {
  router.push('/file/n2');
}
function chickOnVacuum() {
  router.push('/file/vacuum');
}
function chickOnTem() {
  router.push('/file/mes');
}
async function saveEdit() {
  const { data } = await saveEditFile();
  console.log(data);
  if (data) {
    window.$notification?.success({
      title: '文件编辑成功',
      content: `文件编辑成功!`,
      duration: 3000
    });
  }
}
</script>

<style scoped>
.stove-panel {
  width: 200px;
  height: 340px;
}
</style>
