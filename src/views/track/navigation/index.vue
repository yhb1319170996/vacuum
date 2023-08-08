<template>
  <div>
    <n-card title="轨道配置" class="shadow-sm rounded-16px parent-box">
      <n-card class="shadow-sm rounded-16px single-card">
        <div style="position: absolute; left: 260px; top: 50px" class="w-200px h-30px">
          <icon-ic-outline-settings
            v-if="showAdminButton"
            style="font-size: 35px; color: #decece"
            @click="changeSetting"
          />
        </div>
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
                      <template #icon></template>
                      {{ settingSpeed }}
                    </n-button>
                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
                  </div>
                </div>
                <div>
                  <div style="display: flex; justify-content: center; align-items: center">
                    <n-button strong secondary type="tertiary" style="width: 60%; margin-top: 10px">
                      {{ actualSpeed }}
                    </n-button>
                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
                  </div>
                </div>
                <!--                <div class="flex-col-center">-->
                <!--                  <span class="text-16px">真空区链速</span>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <div style="display: flex; justify-content: center; align-items: center">-->
                <!--                    <n-button strong secondary type="primary" style="width: 60%; margin-top: 5px">-->
                <!--                      {{ settingVacuumSpeed }}-->
                <!--                    </n-button>-->
                <!--                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <div style="display: flex; justify-content: center; align-items: center">-->
                <!--                    <n-button strong secondary type="tertiary" style="width: 60%; margin-top: 5px">-->
                <!--                      {{ actualVacuumSpeed }}-->
                <!--                    </n-button>-->
                <!--                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <div class="flex-col-center">-->
                <!--                  <span class="text-16px">冷却区链速</span>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <div style="display: flex; justify-content: center; align-items: center">-->
                <!--                    <n-button :style="{ width: '60%' }" strong secondary type="primary" @click="clickCold">-->
                <!--                      <template #icon></template>-->
                <!--                      {{ settingColdSpeed }}-->
                <!--                    </n-button>-->
                <!--                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                  <div style="display: flex; justify-content: center; align-items: center">-->
                <!--                    <n-button strong secondary type="tertiary" style="width: 60%; margin-top: 10px">-->
                <!--                      {{ actualColdSpeed }}-->
                <!--                    </n-button>-->
                <!--                    <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track1.png" alt="track1" style="margin: auto" />
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-upward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningOne"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-downward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningOne"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>

              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">中间支撑高度</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2" class="flex-col-center">
              <icon-ic-outline-settings style="font-size: 40px; color: #decece" @click="showDrawer" />
            </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track2.png" alt="track2" style="margin: auto" />
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-upward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningTwo"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-downward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningTwo"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>

              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">中间支撑宽度</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2" class="flex-col-center">
              <icon-ic-outline-settings style="font-size: 40px; color: #decece" />
            </n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div>
                <img src="../img/track3.png" alt="track3" style="margin: auto" />
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-upward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningThree"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>
              <div>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                  <n-button style="width: 60%; height: 30px" class="single-button">
                    <icon-material-symbols-arrow-downward class="text-30px" />
                  </n-button>
                  <icon-cib-discover
                    v-if="showWarningThree"
                    class="text-20px single-button"
                    style="color: red; margin-left: 2%"
                  />
                </div>
              </div>

              <div class="flex-col-center">
                <span class="py-10px text-16px single-button">轨道宽度</span>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <div style="margin-top: 0px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:5 640:5 1024:5"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnOne"
                >
                  {{ settingSupportHeight }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnTwo"
                >
                  {{ settingSupportWidth }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button
                  type="primary"
                  size="small"
                  style="margin-left: 10%; width: 50%"
                  strong
                  secondary
                  @click="clickOnThree"
                >
                  {{ settingTrackWidth }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <div style="margin-top: 10px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:5 640:5 1024:5"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button type="tertiary" size="small" style="margin-left: 10%; width: 50%" strong secondary>
                  {{ actualSupportHeight }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button type="tertiary" size="small" style="margin-left: 10%; width: 50%">
                  {{ actualSupportWidth }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
            <n-grid-item span="0:2 640:2 1024:2"></n-grid-item>
            <n-grid-item span="0:5 640:5 1024:5">
              <div style="display: flex; justify-content: center; align-items: center">
                <n-button type="tertiary" size="small" style="margin-left: 10%; width: 50%">
                  {{ actualTrackWidth }}
                </n-button>
                <span class="py-1px text-1px" style="margin-left: 3%">mm</span>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
        <div style="margin-top: 30px">
          <n-grid :item-responsive="true" :x-gap="16">
            <n-grid-item span="0:8 640:8 1024:8"></n-grid-item>
            <n-grid-item span="0:8 640:8 1024:8">
              <n-button v-show="showVisible" strong secondary type="error" style="width: 100%; height: 65px">
                超时
              </n-button>
            </n-grid-item>
            <n-grid-item span="0:8 640:8 1024:8">
              <n-button v-show="showVisible" strong secondary type="error" style="width: 100%; height: 65px">
                超时
              </n-button>
            </n-grid-item>
          </n-grid>
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
    <n-modal v-model:show="coverShowModalSetting" class="rounded-10px" preset="card" title="设置" style="width: 1000px">
      <n-grid :x-gap="12" :y-gap="40" :cols="2">
        <n-grid-item>
          <n-input-group>
            <n-button type="info" strong secondary class="input-group-head">预热实际值</n-button>
            <n-input v-model:value="eleArray[0]" :style="{ width: '33%' }" />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">真空上下实际值</n-button>
            <n-input v-model:value="eleArray[1]" :style="{ width: '33%' }" />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">真空链条实际值</n-button>
            <n-input v-model:value="eleArray[2]" :style="{ width: '33%' }" />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">冷却链条实际值</n-button>
            <n-input v-model:value="eleArray[3]" :style="{ width: '33%' }" />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
        </n-grid-item>
        <n-grid-item>
          <n-input-group>
            <n-button type="info" strong secondary class="input-group-head">预热设定值</n-button>
            <n-input
              v-model:value="eleSetArray[0]"
              :style="{ width: '33%' }"
              :input-props="{ onClick: () => clickSetPre() }"
            />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">真空上下设定值</n-button>
            <n-input
              v-model:value="eleSetArray[1]"
              :style="{ width: '33%' }"
              :input-props="{ onClick: () => clickSetHigh() }"
            />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">真空链条设定值</n-button>
            <n-input
              v-model:value="eleSetArray[2]"
              :style="{ width: '33%' }"
              :input-props="{ onClick: () => clickSetVacuum() }"
            />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
          <n-input-group style="margin-top: 15px">
            <n-button type="info" strong secondary class="input-group-head">冷却链条设定值</n-button>
            <n-input
              v-model:value="eleSetArray[3]"
              :style="{ width: '33%' }"
              :input-props="{ onClick: () => clickSetCold() }"
            />
            <n-input-group-label>A</n-input-group-label>
          </n-input-group>
        </n-grid-item>
      </n-grid>
    </n-modal>
    <n-modal v-model:show="coverModalPre" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalPre" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalPre"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalPre"
        :max-length="maxlength"
        @onChange="onChangePre"
        @onKeyPress="onKeyPressPre"
      />
    </n-modal>
    <n-modal v-model:show="coverModalHigh" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalHigh" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalHigh"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalHigh"
        :max-length="maxlength"
        @onChange="onChangeHigh"
        @onKeyPress="onKeyPressHigh"
      />
    </n-modal>
    <n-modal v-model:show="coverModalVacuum" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuum" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuum"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuum"
        :max-length="maxlength"
        @onChange="onChangeVacuum"
        @onKeyPress="onKeyPressVacuum"
      />
    </n-modal>
    <n-modal v-model:show="coverModalCold" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalCold" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalCold"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalCold"
        :max-length="maxlength"
        @onChange="onChangeColdEle"
        @onKeyPress="onKeyPressColdEle"
      />
    </n-modal>
    <n-drawer v-model:show="showOuter" :width="650">
      <n-drawer-content title="其他配置">
        <div class="flex-col-center">
          <span class="text-16px">真空区链速</span>
        </div>
        <div>
          <div style="display: flex; justify-content: center; align-items: center">
            <n-button strong secondary type="primary" style="width: 60%; margin-top: 5px">
              {{ settingVacuumSpeed }}
            </n-button>
            <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: center; align-items: center">
            <n-button strong secondary type="tertiary" style="width: 60%; margin-top: 5px">
              {{ actualVacuumSpeed }}
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
              <template #icon></template>
              {{ settingColdSpeed }}
            </n-button>
            <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: center; align-items: center">
            <n-button strong secondary type="tertiary" style="width: 60%; margin-top: 10px">
              {{ actualColdSpeed }}
            </n-button>
            <span class="py-1px text-16px" style="margin-left: 5px">m/min</span>
          </div>
        </div>
        <n-card title="" :bordered="false" class="rounded-16px shadow-sm" style="margin: 20px">
          <div class="w-full">
            <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
              <div>
                <div class="flex-col-center" style="margin-top: 34px">
                  <div class="flex-col-center p-3px">
                    <p class="py-8px text-30px">降低冷却区速度</p>
                  </div>
                </div>
              </div>
              <div>
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item>
                    <span class="py-1px text-16px">模式选择</span>
                  </n-grid-item>
                  <n-grid-item>
                    <n-select v-model:value="modelName" :options="options" />
                  </n-grid-item>
                </n-grid>
              </div>
              <div style="margin-top: 20px">
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item>
                    <span class="py-1px text-16px">降低冷却区速度</span>
                  </n-grid-item>
                  <n-grid-item>
                    <n-button type="primary" style="margin-left: 5px" class="button-style">0.5</n-button>
                    <span class="py-1px text-16px">m/min</span>
                  </n-grid-item>
                </n-grid>
              </div>
              <div style="margin-top: 30px">
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item>
                    <span class="py-1px text-16px">开关</span>
                  </n-grid-item>
                  <n-grid-item>
                    <n-switch v-model:value="intellectActive" size="large" />
                  </n-grid-item>
                </n-grid>
              </div>
              <div style="margin-top: 30px">
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item>
                    <span class="py-1px text-16px">最大速度离开真空室</span>
                  </n-grid-item>
                  <n-grid-item>
                    <n-switch v-model:value="intellectActiveSwitch" size="large" />
                  </n-grid-item>
                </n-grid>
              </div>
            </div>
          </div>
        </n-card>
        <template #footer>
          <n-button @click="showOuter = false">关闭！</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { localStg } from '@/utils';
import { keepGetting, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
const settingSpeed = ref('2.0');
const settingColdSpeed = ref('2.0');
const actualSpeed = ref('3.0');
const actualColdSpeed = ref('3.0');
const finalSpeed = ref('');
const finalColdSpeed = ref('');
const settingSupportHeight = ref('-7.0');
const actualSupportHeight = ref('0.0');
const actualVacuumSpeed = ref('0.0');
const settingVacuumSpeed = ref('0.0');
const finalSupportHeight = ref('');
const settingSupportWidth = ref('51.0');
const actualSupportWidth = ref('0.0');
const finalSupportWidth = ref('');
const settingTrackWidth = ref('102.6');
const actualTrackWidth = ref('102.5');
const finalTrackWidth = ref('');
const finalPre = ref('');
const finalHigh = ref('');
const finalVacuum = ref('');
const finalCold = ref('');
const coverShowModal = ref(false);
const coverColdShowModal = ref(false);
const showWarningOne = ref(false);
const showWarningTwo = ref(false);
const showWarningThree = ref(false);
const coverShowModalOne = ref(false);
const coverShowModalTwo = ref(false);
const coverShowModalThree = ref(false);
const coverShowModalSetting = ref(false);
const coverModalPre = ref(false);
const coverModalHigh = ref(false);
const coverModalVacuum = ref(false);
const coverModalCold = ref(false);
const eleArray = ref([0, 0, 0, 0]);
const eleSetArray = ref([0, 0, 0, 0]);
const showVisible = ref(false);
const maxlength = ref(999);
const tagName = 'trackNavigation';
const uuid = ref('');
const minValue = ref(0);
const maxValue = ref(0);
const showAdminButton = ref(false);
const showOuter = ref(false);
const intellectActive = ref(false);
const intellectActiveSwitch = ref(false);
const modelName = ref(1);
const options = [
  {
    label: '请选择模式',
    value: 0,
    disabled: true
  },
  {
    label: '关',
    value: 1
  },
  {
    label: '修复设置值',
    value: 2
  },
  {
    label: '配置文件值',
    value: 3
  }
];
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
    'Application.HMI_TrackConfig.h_rMiddleSupportHightSV[0]': 'float',
    'Application.HMI_TrackConfig.h_rMiddleSupportHightPV[0]': 'float',
    'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV[0]': 'float',
    'Application.HMI_TrackConfig.h_rMiddleSupportWidthPV[0]': 'float',
    'Application.HMI_TrackConfig.h_rTrackWidthSV[0]': 'float',
    'Application.HMI_TrackConfig.h_rTrackWidthPV[0]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedPV[10]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedSV[0]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedPV[12]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedPV[13]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedSV[3]': 'float',
    'Application.HMI_CountConfig.h_rAxisGetCurrentvalue': 'doubles',
    'Application.HMI_CountConfig.h_rAxisSetCurrentvalue': 'doubles'
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
      'Application.HMI_TrackConfig.h_rMiddleSupportHightSV[0]': settingSupHeightValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportHightPV[0]': actualSupHeightValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV[0]': settingSupWidthValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportWidthPV[0]': actualSupWidthValue,
      'Application.HMI_TrackConfig.h_rTrackWidthSV[0]': settingTrackValue,
      'Application.HMI_TrackConfig.h_rTrackWidthPV[0]': actualTrackValue,
      'Application.HMI_HomePage.h_rChainSpeedPV[10]': SpeedPVValue,
      'Application.HMI_HomePage.h_rChainSpeedSV[0]': SpeedSVValue,
      'Application.HMI_HomePage.h_rChainSpeedPV[13]': SpeedColdPVValue,
      'Application.HMI_HomePage.h_rChainSpeedSV[3]': SpeedColdSVValue,
      'Application.HMI_HomePage.h_rChainSpeedPV[12]': SpeedVacuumValue,
      'Application.HMI_CountConfig.h_rAxisGetCurrentvalue': currentArray,
      'Application.HMI_CountConfig.h_rAxisSetCurrentvalue': settingArray
    } = data.result;
    settingSupportHeight.value = settingSupHeightValue;
    actualSupportHeight.value = actualSupHeightValue;
    settingSupportWidth.value = settingSupWidthValue;
    actualSupportWidth.value = actualSupWidthValue;
    settingTrackWidth.value = settingTrackValue;
    actualTrackWidth.value = actualTrackValue;
    if (SpeedSVValue && SpeedPVValue && SpeedVacuumValue) {
      settingSpeed.value = convertMmPerSecToMPerMin(SpeedSVValue);
      actualVacuumSpeed.value = convertMmPerSecToMPerMin(SpeedVacuumValue);
      actualSpeed.value = convertMmPerSecToMPerMin(SpeedPVValue);
    }
    if (SpeedColdPVValue && SpeedColdSVValue) {
      settingColdSpeed.value = convertMmPerSecToMPerMin(SpeedColdSVValue);
      actualColdSpeed.value = convertMmPerSecToMPerMin(SpeedColdPVValue);
    }
    if (currentArray) {
      currentArray[0] = Math.abs(Number(currentArray[0]));
      currentArray[1] = Math.abs(Number(currentArray[1]));
      currentArray[2] = Math.abs(Number(currentArray[2]));
      currentArray[3] = Math.abs(Number(currentArray[3]));
      eleArray.value = currentArray;
    }
    if (settingArray) {
      eleSetArray.value = settingArray;
    }
  }
}

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
    const Param = {
      result: MmPerSecToMPerMin(finalSpeed.value),
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rChainSpeedSV[0]'
    };
    const Param1 = {
      result: true,
      dataType: 'boolean',
      name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
    };
    const arr = [];
    arr.push(Param);
    arr.push(Param1);
    const success = await saveJson(arr);
    setTimeout(() => {
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }, 500);
    console.log(success);
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
    const Param = {
      result: MmPerSecToMPerMin(finalColdSpeed.value),
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rChainSpeedSV[3]'
    };
    const Param1 = {
      result: true,
      dataType: 'boolean',
      name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
    };
    const arr = [];
    arr.push(Param);
    arr.push(Param1);
    const success = await saveJson(arr);
    setTimeout(() => {
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }, 500);
    console.log(success);
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
    const Param = {
      result: finalSupportHeight.value,
      dataType: 'float',
      name: 'Application.HMI_TrackConfig.h_rMiddleSupportHightSV[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
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
    const Param = {
      result: finalSupportWidth.value,
      dataType: 'float',
      name: 'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
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
    const Param = {
      result: finalTrackWidth.value,
      dataType: 'float',
      name: 'Application.HMI_TrackConfig.h_rTrackWidthSV[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
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
function changeSetting() {
  coverShowModalSetting.value = !coverShowModalSetting.value;
}
function clickSetPre() {
  if (coverModalPre.value === true) {
    coverModalPre.value = false;
  } else {
    coverModalPre.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 4;
  finalPre.value = '';
}
function clickSetHigh() {
  if (coverModalHigh.value === true) {
    coverModalHigh.value = false;
  } else {
    coverModalHigh.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 4;
  finalHigh.value = '';
}
function clickSetVacuum() {
  if (coverModalVacuum.value === true) {
    coverModalVacuum.value = false;
  } else {
    coverModalVacuum.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 4;
  finalVacuum.value = '';
}
function clickSetCold() {
  if (coverModalCold.value === true) {
    coverModalCold.value = false;
  } else {
    coverModalCold.value = true;
  }
  minValue.value = 0.1;
  maxValue.value = 4;
  finalCold.value = '';
}

function onChangePre(e) {
  finalPre.value = e;
}
function onChangeHigh(e) {
  finalHigh.value = e;
}
function onChangeVacuum(e) {
  finalVacuum.value = e;
}
function onChangeColdEle(e) {
  finalCold.value = e;
}
async function onKeyPressPre() {
  if (Number(finalPre.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalPre.value) > Number(maxValue.value)) {
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
      result: finalPre.value,
      dataType: 'double',
      name: 'Application.HMI_CountConfig.h_rAxisSetCurrentvalue[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressHigh() {
  if (Number(finalHigh.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalHigh.value) > Number(maxValue.value)) {
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
      result: finalHigh.value,
      dataType: 'double',
      name: 'Application.HMI_CountConfig.h_rAxisSetCurrentvalue[1]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressVacuum() {
  if (Number(finalVacuum.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuum.value) > Number(maxValue.value)) {
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
      result: finalVacuum.value,
      dataType: 'double',
      name: 'Application.HMI_CountConfig.h_rAxisSetCurrentvalue[2]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressColdEle() {
  if (Number(finalCold.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCold.value) > Number(maxValue.value)) {
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
      result: finalCold.value,
      dataType: 'double',
      name: 'Application.HMI_CountConfig.h_rAxisSetCurrentvalue[3]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
function showDrawer() {
  showOuter.value = true;
}
</script>

<style scoped>
.parent-box {
  width: 80%;
  height: 600px;
  margin: 0% auto;
}
.single-card {
  height: 500px;
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
