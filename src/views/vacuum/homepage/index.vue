<template>
  <div>
    <div>
      <n-grid :x-gap="12" :y-gap="8" :cols="4">
        <n-grid-item>
          <n-card :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full h-165px">
              <div class="flex-col-center p-0px">
                <p class="py-28px text-16px">开/关</p>
              </div>
              <div class="flex-col-center p-5px">
                <n-switch v-model:value="mainSwitch" size="large" :round="false" @update-value="changeValveSwitch">
                  <template #checked><div style="width: 30px; height: 40px"></div></template>
                </n-switch>
                <icon-ic-outline-settings
                  v-if="showAdminButton"
                  style="font-size: 40px; color: #2f363d; margin-top: 16px"
                  @click="openSetting"
                />
              </div>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full h-165px">
              <div class="flex-col-center p-8px">
                <n-grid :x-gap="12" :y-gap="40" :cols="2">
                  <n-grid-item>
                    <div class="flex-col-center p-10px">
                      <p class="py-8px text-15px">流程时间</p>
                    </div>
                    <div style="text-align: center">
                      <n-button type="primary" style="width: 80px">{{ AutoTImeOK }}</n-button>
                      <span class="py-26px text-15px">s</span>
                    </div>
                  </n-grid-item>
                  <n-grid-item>
                    <div class="flex-col-center p-10px">
                      <p class="py-8px text-15px">板间距离</p>
                    </div>
                    <div style="text-align: center">
                      <n-button type="primary" style="width: 80px">{{ pCBbanIntervalValue }}</n-button>
                      <span class="py-26px text-15px">mm</span>
                    </div>
                  </n-grid-item>
                </n-grid>
              </div>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full h-165px">
              <div class="w-full h-85px">
                <div class="flex-col-center">
                  <n-button
                    v-if="axisMinSensor || axisMaxSensor"
                    type="error"
                    style="width: 120px"
                    @click="clickResetButtom"
                  >
                    真空负极限报警
                  </n-button>
                  <n-button
                    v-if="vacuumTrackOne || vacuumTrackTwo"
                    type="error"
                    style="margin-top: 10px; width: 120px"
                    @click="clickResetButtom"
                  >
                    真空轴错误
                  </n-button>
                </div>
              </div>
              <div class="p-3px py-3px">
                <n-grid x-gap="12" :cols="2">
                  <n-gi>
                    <div>
                      <div class="flex-col-center">
                        <p>真空归零按钮</p>
                        <n-button type="success" style="margin-top: 15%" @click="clickResetButtom">开始</n-button>
                      </div>
                    </div>
                  </n-gi>
                  <n-gi>
                    <div>
                      <div class="flex-col-center">
                        <p type="error">一般故障复位</p>
                        <n-button type="success" style="margin-top: 15%" @click="chickResetAlarm">重置</n-button>
                      </div>
                    </div>
                  </n-gi>
                </n-grid>
              </div>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full h-165px">
              <div class="flex-col-center p-8px">
                <n-grid :x-gap="12" :y-gap="8" :cols="3">
                  <n-grid-item>
                    <div class="flex-col-center p-3px">
                      <p class="py-8px text-10px">PCB间距</p>
                    </div>
                    <div style="text-align: center">
                      <n-button type="primary" style="width: 80px">{{ pcbDistance }}</n-button>
                      <span class="py-26px text-10px">cm</span>
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
                      <p class="py-8px text-10px">上升沿</p>
                    </div>
                    <div style="text-align: center">
                      <n-button type="primary" style="width: 80px">{{ risingEdgeDelay }}</n-button>
                      <span class="py-26px text-10px">sec</span>
                    </div>
                  </n-grid-item>
                  <n-grid-item>
                    <div class="flex-col-center p-3px">
                      <p class="py-8px text-10px">下降沿</p>
                    </div>
                    <div style="text-align: center">
                      <n-button type="primary" style="width: 80px">{{ fallingEdgeDelay }}</n-button>
                      <span class="py-26px text-10px">sec</span>
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
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
    <div>
      <n-card :bordered="false" size="small" class="shadow-sm rounded-16px" style="margin-top: 20px">
        <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
          <n-grid-item span="0:7 640:7 1024:7">
            <div class="w-full h-550px">
              <div class="flex-col-center">
                <div>
                  <icon-ic-outline-settings
                    v-if="showAdminButton"
                    style="font-size: 40px; color: #decece"
                    @click="chickSetting"
                  />
                </div>
                <div style="margin-top: 20px">
                  <n-grid x-gap="12" :cols="2">
                    <n-gi>
                      <div>
                        <div class="flex-col-center">
                          <div>
                            <n-button v-if="imitateShowIn" type="tertiary" size="tiny" @click="changeInStatus">
                              模拟 传感器通过
                            </n-button>
                            <n-button v-if="!imitateShowIn" type="success" size="tiny" @click="changeInStatus">
                              模拟 传感器通过
                            </n-button>
                          </div>
                        </div>
                      </div>
                    </n-gi>
                    <n-gi>
                      <div>
                        <div class="flex-col-center">
                          <div>
                            <n-button v-if="imitateShowOut" type="tertiary" size="tiny" @click="changeOutStatus">
                              模拟 传感器通过 B
                            </n-button>
                            <n-button v-if="!imitateShowOut" type="success" size="tiny" @click="changeOutStatus">
                              模拟 传感器通过 B
                            </n-button>
                          </div>
                        </div>
                      </div>
                    </n-gi>
                  </n-grid>
                </div>
                <div style="margin-top: 50px">
                  <h1 class="py-26px text-14px">闸门止动器</h1>
                </div>
                <div style="margin-top: 10px">
                  <n-grid x-gap="12" :cols="2">
                    <n-gi>
                      <div>
                        <div class="flex-col-center">
                          <span class="py-26px text-14px">进口闸门</span>
                          <span class="py-26px text-14px">出口闸门</span>
                        </div>
                      </div>
                    </n-gi>
                    <n-gi>
                      <div>
                        <div class="flex-col-center py-26px">
                          <n-switch
                            v-model:value="inletGateSwitch"
                            size="large"
                            :round="false"
                            @update-value="changeInletGate"
                          />
                          <n-switch
                            v-model:value="outletGateSwitch"
                            size="large"
                            :round="false"
                            style="margin-top: 52px"
                            @update-value="changeOutletGate"
                          />
                        </div>
                      </div>
                    </n-gi>
                  </n-grid>
                </div>
              </div>
            </div>
          </n-grid-item>
          <n-grid-item span="0:17 640:17 1024:17">
            <div class="w-full h-530px">
              <div style="height: 80px">
                <n-grid :x-gap="12" :y-gap="8" :cols="3">
                  <n-grid-item>
                    <n-card :bordered="false" class="rounded-16px shadow-sm">
                      <div class="w-full h-60px">
                        <n-grid :x-gap="12" :y-gap="8" :cols="2">
                          <n-grid-item></n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center">
                                <p type="error">PCB 计数器</p>
                                <div>
                                  <n-button type="tertiary" style="width: 80px">{{ pcbCounter }}</n-button>
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                        </n-grid>
                      </div>
                    </n-card>
                  </n-grid-item>
                  <n-grid-item>
                    <n-card :bordered="false" class="rounded-16px shadow-sm">
                      <div class="w-full h-60px">
                        <div class="flex-col-center p-3px">
                          <div class="display: flex justify-content: space-between">
                            <icon-cib-discover
                              v-if="trackLightStatus"
                              class="text-30px text-green"
                              style="margin-top: 5px"
                            />
                            <icon-cib-discover
                              v-if="!trackLightStatus"
                              class="text-30px text-gray-400"
                              style="margin-top: 5px"
                            />
                            <span class="py-8px text-16px" style="margin-left: 10px; margin-right: 10px">
                              轨道运行状态灯
                            </span>
                            <icon-cib-discover
                              v-if="trackLightStatus"
                              class="text-30px text-green"
                              style="margin-top: 5px"
                            />
                            <icon-cib-discover
                              v-if="!trackLightStatus"
                              class="text-30px text-gray-400"
                              style="margin-top: 5px"
                            />
                          </div>
                        </div>
                      </div>
                    </n-card>
                  </n-grid-item>
                  <n-grid-item>
                    <n-card :bordered="false" class="rounded-16px shadow-sm">
                      <div class="w-full h-60px"></div>
                    </n-card>
                  </n-grid-item>
                </n-grid>
              </div>
              <div style="margin-top: 25px">
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item>
                    <n-card :bordered="false" class="rounded-16px shadow-sm">
                      <div class="w-full">
                        <n-grid :x-gap="12" :y-gap="8" :cols="4">
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center">
                                <div>真空泵手动开关</div>
                                <div>
                                  <n-switch
                                    v-model:value="vacuumPumpManualSwitch"
                                    size="large"
                                    :round="false"
                                    @update-value="changeVacuumPumpManual"
                                  />
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center">
                                <div>真空阀</div>
                                <div>
                                  <n-switch
                                    v-model:value="vacuumValveSwitch"
                                    size="large"
                                    :round="false"
                                    @update-value="changeVacuumValve"
                                  />
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center">
                                <div>氮气泄压</div>
                                <div>
                                  <n-switch
                                    v-model:value="releaseButton"
                                    size="large"
                                    :round="false"
                                    @update-value="changeReleaseSwitch"
                                  />
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center">
                                <div>空气泄压</div>
                                <div>
                                  <n-switch
                                    v-model:value="releaseButtonAir"
                                    size="large"
                                    :round="false"
                                    @update-value="changeReleaseSwitchAir"
                                  />
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                        </n-grid>
                      </div>
                      <div class="w-full" style="margin-top: 75px">
                        <n-grid :x-gap="12" :y-gap="8" :cols="4">
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center" style="margin-top: 34px">
                                <div class="flex-col-center p-3px">
                                  <p class="py-8px text-10px">真空</p>
                                </div>
                                <div>
                                  <n-button type="primary" style="width: 80px">{{ middleVacuumValue }}</n-button>
                                  <span class="py-8px text-10px" style="padding-left: 3px">mbar</span>
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center" style="margin-top: 34px">
                                <div class="flex-col-center p-3px">
                                  <p class="py-8px text-10px">产品长度</p>
                                </div>
                                <div>
                                  <n-button type="primary" style="width: 80px" @click="clickOn">
                                    {{ settingProductLength }}
                                  </n-button>
                                  <span class="py-8px text-10px" style="padding-left: 3px">mm</span>
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center" style="margin-top: 34px">
                                <div class="flex-col-center p-3px">
                                  <p class="py-8px text-10px">产品长度</p>
                                </div>
                                <div>
                                  <n-button type="tertiary" style="width: 80px">{{ actualProductLength }}</n-button>
                                  <span class="py-8px text-10px" style="padding-left: 3px">mm</span>
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                          <n-grid-item>
                            <div>
                              <div class="flex-col-center" style="margin-top: 34px">
                                <div class="flex-col-center p-3px">
                                  <p class="py-8px text-10px">真空实际值</p>
                                </div>
                                <div>
                                  <n-button type="tertiary" style="width: 80px">{{ statePV }}</n-button>
                                  <span class="py-8px text-10px" style="padding-left: 3px">mbar</span>
                                </div>
                              </div>
                            </div>
                          </n-grid-item>
                        </n-grid>
                      </div>
                    </n-card>
                  </n-grid-item>
                  <n-grid-item>
                    <vacuum-animation
                      :display-value="vacuumSettingValue"
                      :holding-time="holdingTime"
                      :during-time="duringTime"
                      :reback-time="rebackTime"
                      :mode="vacuumMode"
                      :vacuum-in-sensor="InSensorvacuum"
                      :vacuum-out-sensor="OutSensorvacuum"
                      :in-length="inDoorLength"
                      :out-length="outDoorLength"
                    ></vacuum-animation>
                  </n-grid-item>
                </n-grid>
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalSettingProductLength" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalSettingProductLength"
        :keyboard-class="keyboardClass"
        :input="finalSettingProductLength"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverModalLength" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumLength" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumLength"
        :input="finalVacuumLength"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChange1"
        @onKeyPress="onKeyPressLength"
      />
    </n-modal>
    <n-modal
      v-model:show="coverModalVacuumSpeed"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalAbsVelocity" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalAbsVelocity"
        :input="finalAbsVelocity"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChangeAbsVelocity"
        @onKeyPress="onKeyPressAbsVelocity"
      />
    </n-modal>
    <n-modal
      v-model:show="coverModalVelocityAcctime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalVelocityAcctime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVelocityAcctime"
        :input="finalVelocityAcctime"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChangeVelocityAcctime"
        @onKeyPress="onKeyPressVelocityAcctime"
      />
    </n-modal>
    <n-modal
      v-model:show="coverModalVelocityDectime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalVelocityDectime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVelocityDectime"
        :input="finalVelocityDectime"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChangeVelocityDectime"
        @onKeyPress="onKeyPressVelocityDectime"
      />
    </n-modal>
    <n-modal
      v-model:show="coverModalVaccumBodyHigthSV"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalVaccumBodyHigthSV" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVaccumBodyHigthSV"
        :input="finalVaccumBodyHigthSV"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChangeVaccumBodyHigthSV"
        @onKeyPress="onKeyPressVaccumBodyHigthSV"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalEle" class="rounded-10px" preset="card" title="设置" style="width: 400px">
      <n-space vertical>
        <span>真空定位按钮</span>
        <n-switch v-model:value="eleVacuumSwitch" size="large" @update-value="changeVacuumSwitch" />
      </n-space>
      <n-space vertical>
        <span>真空定位位置</span>
        <n-input
          v-model:value="eleVaccumLength"
          style="width: 50%"
          :input-props="{ onClick: () => editLength() }"
        ></n-input>
      </n-space>
      <n-space vertical>
        <span>真空定位实时位置</span>
        <n-input v-model:value="vaccumBodyHigthPV" style="width: 50%" disabled></n-input>
      </n-space>
      <n-space vertical>
        <span>真空定位实时位置修改</span>
        <n-input
          v-model:value="vaccumBodyHigthSV"
          style="width: 50%"
          :input-props="{ onClick: () => editVaccumBodyHigthSV() }"
        ></n-input>
      </n-space>
      <n-space vertical>
        <span>真空回原按钮</span>
        <n-switch v-model:value="eleVaccumReset" size="large" @update-value="changeVacuumReset" />
      </n-space>
      <n-space vertical>
        <span>真空定位速度</span>
        <n-input
          v-model:value="absVelocity"
          style="width: 50%"
          :input-props="{ onClick: () => editVacuumSpeed() }"
        ></n-input>
      </n-space>
      <n-space vertical>
        <span>真空定位加速时间</span>
        <n-input
          v-model:value="velocityAcctime"
          style="width: 50%"
          :input-props="{ onClick: () => editVelocityAcctime() }"
        ></n-input>
      </n-space>
      <n-space vertical>
        <span>真空定位减速时间</span>
        <n-input
          v-model:value="velocityDectime"
          style="width: 50%"
          :input-props="{ onClick: () => editVelocityDectime() }"
        ></n-input>
      </n-space>
    </n-modal>
    <n-modal v-model:show="coverShowModalSetting" class="rounded-10px" preset="card" title="设置" style="width: 600px">
      <n-input-group>
        <n-button type="info" strong secondary class="input-group-head">真空自检设定值</n-button>
        <n-input
          v-model:value="vacuumCheckSetValue"
          style="width: 300px"
          :input-props="{ onClick: () => changeSetValue() }"
        />
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
      <n-input-group style="margin-top: 15px">
        <n-button type="info" strong secondary class="input-group-head">真空自检时间设定值</n-button>
        <n-input
          v-model:value="vacuumCheckSetTime"
          style="width: 300px"
          :input-props="{ onClick: () => changeSetTime() }"
        />
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
      <n-input-group style="margin-top: 15px">
        <n-button type="info" strong secondary class="input-group-head">真空自检保压时间</n-button>
        <n-input
          v-model:value="vacuumCheckKeepTime"
          style="width: 300px"
          :input-props="{ onClick: () => changeKeepTime() }"
        />
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
      <n-input-group style="margin-top: 15px">
        <n-button type="info" strong secondary class="input-group-head">真空自检OK值</n-button>
        <n-input
          v-model:value="vacuumCheckKeepValue"
          style="width: 300px"
          :input-props="{ onClick: () => changeKeepValue() }"
        />
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
      <n-input-group style="margin-top: 15px">
        <n-button type="info" strong secondary class="input-group-head">真空自检压力值偏移量</n-button>
        <n-input v-model:value="vacuumCheckOffset" style="width: 300px" />
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
      <n-input-group style="margin-top: 15px">
        <n-button type="info" strong secondary class="input-group-head">开机自检</n-button>
        <n-button v-if="vacuumSelfCheckOKNG === 1" type="success" strong secondary style="width: 300px">
          Success
        </n-button>
        <n-button v-if="vacuumSelfCheckOKNG === 0" type="tertiary" strong secondary style="width: 300px">
          未自检
        </n-button>
        <n-button v-if="vacuumSelfCheckOKNG === 2" type="error" strong secondary style="width: 300px">Error</n-button>
        <!--				<n-input-group-label>A</n-input-group-label>-->
      </n-input-group>
    </n-modal>
    <n-modal v-model:show="visibleSetValue" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumCheckSetValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumCheckSetValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumCheckSetValue"
        :max-length="maxlength"
        @onChange="onChangeSetvalue"
        @onKeyPress="onKeyPressSetValue"
      />
    </n-modal>
    <n-modal v-model:show="visibleSetTime" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumCheckSetTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumCheckSetTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumCheckSetTime"
        :max-length="maxlength"
        @onChange="onChangeSetTime"
        @onKeyPress="onKeyPressSetTime"
      />
    </n-modal>
    <n-modal v-model:show="visibleKeepTime" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumCheckKeepTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumCheckKeepTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumCheckKeepTime"
        :max-length="maxlength"
        @onChange="onChangeKeepTime"
        @onKeyPress="onKeyPressKeepTime"
      />
    </n-modal>
    <n-modal v-model:show="visibleKeepValue" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumCheckKeepValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumCheckKeepValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumCheckKeepValue"
        :max-length="maxlength"
        @onChange="onChangeKeepValue"
        @onKeyPress="onKeyPressKeepValue"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { localStg } from '@/utils';
import VacuumAnimation from '@/views/vacuum/homepage/components/VacuumAnimation.vue';
import { keepGetting, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
const dialog = useDialog();
const message = useMessage();
const mainSwitch = ref(true);
const settingProductLength = ref(0);
const finalSettingProductLength = ref('');
const finalVacuumLength = ref('');
const finalAbsVelocity = ref('');
const finalVelocityAcctime = ref('');
const finalVelocityDectime = ref('');
const finalVaccumBodyHigthSV = ref('');
const actualProductLength = ref(0);
const coverShowModal = ref(false);
const coverShowModalEle = ref(false);
const coverShowModalSetting = ref(false);
const coverModalLength = ref(false);
const coverModalVacuumSpeed = ref(false);
const coverModalVelocityAcctime = ref(false);
const coverModalVelocityDectime = ref(false);
const coverModalVaccumBodyHigthSV = ref(false);
const maxlength = ref(999);
const tagName = 'vacuumHomepage';
const uuid = ref('');
const statePV = ref(0);
const duringTime = ref(0);
const holdingTime = ref(0);
const rebackTime = ref(0);
const elapsedTime = ref(1.1);
const vResetButton = ref(false);
const vALarmResetButton = ref(false);
const pcbDistance = ref(8);
const risingEdgeDelay = ref(9);
const fallingEdgeDelay = ref(10);
const inletGateSwitch = ref(false);
const outletGateSwitch = ref(false);
const pcbCounter = ref(3);
const vacuumPumpManualSwitch = ref(false);
const vacuumValveSwitch = ref(false);
const middleVacuumValue = ref(41);
const iNSensorStateShow = ref(false);
const outSensorStateShow = ref(false);
const inDoorStateShow = ref(false);
const outDoorStateShow = ref(false);
const vacuumMode1SV = ref(0);
const vacuumMode2SV = ref(0);
const vacuumMode3SV = ref(0);
const vacuumMode = ref(0);
const vacuumSettingValue = ref(0);
const minValue = ref(0);
const maxValue = ref(0);
const trackLightStatus = ref(false);
const InSensorvacuum = ref(true);
const OutSensorvacuum = ref(true);
const inDoorLength = ref(0);
const outDoorLength = ref(0);
const eleVacuumSwitch = ref(false);
const eleVaccumLength = ref('0');
const eleVaccumReset = ref(false);
const imitateShowIn = ref(true);
const imitateShowOut = ref(true);
const vaccumBodyHigthPV = ref('0');
const vaccumBodyHigthSV = ref('0');
const vacuumCheckSetValue = ref(0);
const vacuumCheckSetTime = ref(0);
const vacuumCheckKeepTime = ref(0);
const vacuumCheckKeepValue = ref(0);
const vacuumCheckOffset = ref(0);
const vacuumSelfCheckOKNG = ref(0);
const finalVacuumCheckSetValue = ref('');
const finalVacuumCheckSetTime = ref('');
const finalVacuumCheckKeepTime = ref('');
const finalVacuumCheckKeepValue = ref('');
const visibleSetValue = ref(false);
const visibleSetTime = ref(false);
const visibleKeepTime = ref(false);
const visibleKeepValue = ref(false);
const axisMinSensor = ref(false);
const axisMaxSensor = ref(false);
const vacuumTrackOne = ref(false);
const vacuumTrackTwo = ref(false);
const releaseButton = ref(false);
const releaseButtonAir = ref(false);
const showAdminButton = ref(false);
const pCBbanIntervalValue = ref('0');
const absVelocity = ref('0');
const velocityAcctime = ref('0');
const velocityDectime = ref('0');
const AutoTImeOK = ref('0');
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
    'Application.HMI_VacuumConfig.h_rInheartLength': 'float',
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
    'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_iVacuumMode': 'short',
    'Application.HMI_VacuumConfig.h_xstaxis2_ContinuousMotion': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': 'float',
    'Application.HMI_CountConfig.h_xInSensorvacuum': 'boolean',
    'Application.HMI_CountConfig.h_xOutSensorvacuum': 'boolean',
    'Application.HMI_VacuumConfig.h_rInProductLength': 'float',
    'Application.HMI_VacuumConfig.h_rOutProductLength': 'float',
    'Application.HMI_VacuumConfig.h_xVacuumPostion2': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumPosition2': 'float',
    'Application.HMI_VacuumConfig.h_xstAxisHomeExecute[1]': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumCheckSetValue': 'float',
    'Application.HMI_VacuumConfig.h_tVacuumCheckSetTime': 'float',
    'Application.HMI_VacuumConfig.h_tVacuumCheckKeepTime': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumCheckKeepValue': 'float',
    'Application.HMI_VacuumConfig.h_xVacuumSelfCheckOKNG': 'short',
    'Application.HMI_VacuumConfig.h_rstAxisMinSensor': 'boolean',
    'Application.HMI_VacuumConfig.h_rstAxisMaxSensor': 'boolean',
    'Application.HMI_CountConfig.h_xAxisErroStop': 'booleans',
    'Application.HMI_VacuumConfig.h_xReleaseAirValueButtonA': 'boolean',
    'Application.HMI_VacuumConfig.h_xReleaseN2ValueButtonA': 'boolean',
    'Application.GVL03_VacuumStation.h_PCBbanInterval': 'float',
    'Application.GVL03_VacuumStation.h_AutoTImeOK11': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumBodyAbsVelocity2': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityAcctime': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityDectime': 'float',
    'Application.HMI_VacuumConfig.h_rVaccumBodyHigthPV': 'float',
    'Application.HMI_VacuumConfig.h_rVaccumBodyHigthSV': 'float'
  };
  keepGetting(tagName, param);
});
onBeforeUnmount(() => {
  closeSocket();
});

// 处理服务端websocket发送过来的消息
// eslint-disable-next-line complexity
function handleWsMsg(e: any) {
  const data = JSON.parse(e.detail.data.data);
  if (data) {
    const {
      'Application.HMI_VacuumConfig.h_xVacuumMainSwitch': mainSwitchValue,
      'Application.HMI_VacuumConfig.h_rInheartLength': productLengthMeasuredValue,
      'Application.HMI_VacuumConfig.h_rProductLengthSetting': rProductLengthSettingValue,
      'Application.HMI_VacuumConfig.h_rVacuumPV': statePVValue,
      'Application.HMI_VacuumConfig.h_rProductEntryToVacuumZoneTime': productEntryToVacuumZoneTimeValue,
      'Application.HMI_VacuumConfig.h_xVacuumResetButton': resetButtonValue,
      'Application.HMI_VacuumConfig.h_xNormalALarmResetButton': aLarmResetButtonValue,
      'Application.HMI_TrackConfig.h_rPCB_SeparationDistance': pcbDistanceValue,
      'Application.HMI_TrackConfig.h_rInSensorRisingEdgeDelay': risingEdgeDelayValue,
      'Application.HMI_TrackConfig.h_rInSensorFallingEdgeDelay': fallingEdgeDelaValue,
      'Application.HMI_VacuumConfig.h_xCylinderSwitch[0]': enterPortValue,
      'Application.HMI_VacuumConfig.h_xCylinderSwitch[1]': speakValue,
      'Application.HMI_CountConfig.h_diPCB_Counter': pCBCounterValue,
      'Application.HMI_VacuumConfig.h_xVacuumPumpManulSwitch': pumpManulSwitchValue,
      'Application.HMI_VacuumConfig.h_xVacuumValueSwitch': vacuumValueSwitchValue,
      'Application.HMI_VacuumConfig.h_rVacuumStatePV': vacuumStatePVValue,
      'Application.HMI_TrackConfig.h_xINSensorState': iNSensorStateValue,
      'Application.HMI_TrackConfig.h_xOutSensorState': outSensorStateValue,
      'Application.HMI_TrackConfig.h_xInDoorState': inDoorStateValue,
      'Application.HMI_TrackConfig.h_xOutDoorState': outDoorStateValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': VacuumMode1SVValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]': rVacuumMode2SVValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]': rVacuumMode3SVValue,
      'Application.HMI_VacuumConfig.h_iVacuumMode': vacuumModeValue,
      'Application.HMI_VacuumConfig.h_xstaxis2_ContinuousMotion': continuousMotionValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': model1HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': model1DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': model1RebackTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime[0]': model2HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime[0]': model2DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]': model2RebackTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': model3HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': model3DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': model3RebackTimeValue,
      'Application.HMI_CountConfig.h_xInSensorvacuum': inSensorvacuumValue,
      'Application.HMI_CountConfig.h_xOutSensorvacuum': outSensorvacuumValue,
      'Application.HMI_VacuumConfig.h_rInProductLength': inProductLength,
      'Application.HMI_VacuumConfig.h_rOutProductLength': outProductLength,
      'Application.HMI_VacuumConfig.h_xVacuumPostion2': vacuumPositionSwitch,
      'Application.HMI_VacuumConfig.h_rVacuumPosition2': vacuumPositionValue,
      'Application.HMI_VacuumConfig.h_xstAxisHomeExecute[1]': vacuumResetValue,
      'Application.HMI_VacuumConfig.h_rVacuumCheckSetValue': checkSetValue,
      'Application.HMI_VacuumConfig.h_tVacuumCheckSetTime': checkSetTime,
      'Application.HMI_VacuumConfig.h_tVacuumCheckKeepTime': checkKeepTime,
      'Application.HMI_VacuumConfig.h_rVacuumCheckKeepValue': checkKeepValue,
      'Application.HMI_VacuumConfig.h_xVacuumSelfCheckOKNG': selfCheckOKNG,
      'Application.HMI_VacuumConfig.h_rstAxisMinSensor': minSensorValue,
      'Application.HMI_VacuumConfig.h_rstAxisMaxSensor': maxSensorValue,
      'Application.HMI_CountConfig.h_xAxisErroStop': erroStopValue,
      'Application.HMI_VacuumConfig.h_xReleaseAirValueButtonA': ReleaseAirValueButtonA,
      'Application.HMI_VacuumConfig.h_xReleaseN2ValueButtonA': ReleaseN2ValueButtonA,
      'Application.GVL03_VacuumStation.h_PCBbanInterval': PCBbanInterval,
      'Application.GVL03_VacuumStation.h_AutoTImeOK11': AutoTImeOK11,
      'Application.HMI_VacuumConfig.h_rVacuumBodyAbsVelocity2': vacuumBodyAbsVelocity,
      'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityAcctime': vacuumBodyVelocityAcctime,
      'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityDectime': vacuumBodyVelocityDectime,
      'Application.HMI_VacuumConfig.h_rVaccumBodyHigthPV': BodyHigthPV,
      'Application.HMI_VacuumConfig.h_rVaccumBodyHigthSV': BodyHigthSV
    } = data.result;
    releaseButton.value = ReleaseN2ValueButtonA;
    releaseButtonAir.value = ReleaseAirValueButtonA;
    axisMinSensor.value = minSensorValue;
    axisMaxSensor.value = maxSensorValue;
    if (erroStopValue) {
      vacuumTrackOne.value = erroStopValue[1];
      vacuumTrackTwo.value = erroStopValue[2];
    }
    pCBbanIntervalValue.value = PCBbanInterval;
    AutoTImeOK.value = AutoTImeOK11;
    eleVacuumSwitch.value = vacuumPositionSwitch;
    eleVaccumLength.value = vacuumPositionValue;
    eleVaccumReset.value = vacuumResetValue;
    mainSwitch.value = mainSwitchValue;
    InSensorvacuum.value = inSensorvacuumValue;
    OutSensorvacuum.value = outSensorvacuumValue;
    if (inProductLength && outProductLength) {
      inDoorLength.value = Number(inProductLength) / 1000;
      outDoorLength.value = Number(outProductLength) / 1000;
    }
    settingProductLength.value = rProductLengthSettingValue;
    if (productLengthMeasuredValue) {
      actualProductLength.value = Number(productLengthMeasuredValue) / 1000;
      actualProductLength.value = actualProductLength.value.toFixed(2);
    }
    statePV.value = statePVValue;
    elapsedTime.value = productEntryToVacuumZoneTimeValue;
    vResetButton.value = resetButtonValue;
    vALarmResetButton.value = aLarmResetButtonValue;
    pcbDistance.value = pcbDistanceValue;
    risingEdgeDelay.value = risingEdgeDelayValue;
    if (fallingEdgeDelaValue) {
      fallingEdgeDelay.value = Number(fallingEdgeDelaValue).toFixed(2);
    }
    inletGateSwitch.value = enterPortValue;
    outletGateSwitch.value = speakValue;
    pcbCounter.value = pCBCounterValue;
    vacuumPumpManualSwitch.value = pumpManulSwitchValue;
    vacuumValveSwitch.value = vacuumValueSwitchValue;
    if (vacuumStatePVValue) {
      middleVacuumValue.value = Number(vacuumStatePVValue).toFixed(2);
    }
    iNSensorStateShow.value = iNSensorStateValue;
    outSensorStateShow.value = outSensorStateValue;
    inDoorStateShow.value = inDoorStateValue;
    outDoorStateShow.value = outDoorStateValue;
    vacuumMode1SV.value = VacuumMode1SVValue;
    vacuumMode2SV.value = rVacuumMode2SVValue;
    vacuumMode3SV.value = rVacuumMode3SVValue;
    trackLightStatus.value = continuousMotionValue;
    vacuumMode.value = vacuumModeValue;
    if (vacuumModeValue == 1) {
      vacuumSettingValue.value = vacuumMode1SV.value;
      if (model1DuringTimeValue && model1HoldingTimeValue && model1RebackTimeValue) {
        duringTime.value = Number(model1DuringTimeValue) / 1000;
        holdingTime.value = Number(model1HoldingTimeValue) / 1000;
        rebackTime.value = Number(model1RebackTimeValue) / 1000;
      }
    } else if (vacuumModeValue == 2) {
      vacuumSettingValue.value = vacuumMode2SV.value;
      if (model2DuringTimeValue && model2HoldingTimeValue && model2RebackTimeValue) {
        duringTime.value = Number(model2DuringTimeValue) / 1000;
        holdingTime.value = Number(model2HoldingTimeValue) / 1000;
        rebackTime.value = Number(model2RebackTimeValue) / 1000;
      }
    } else if (vacuumModeValue == 3) {
      vacuumSettingValue.value = vacuumMode3SV.value;
      if (model3DuringTimeValue && model3HoldingTimeValue && model3RebackTimeValue) {
        duringTime.value = Number(model3DuringTimeValue) / 1000;
        holdingTime.value = Number(model3HoldingTimeValue) / 1000;
        rebackTime.value = Number(model3RebackTimeValue) / 1000;
      }
    }
    vacuumCheckSetValue.value = checkSetValue;
    vacuumCheckSetTime.value = Number(checkSetTime) / 1000;
    vacuumCheckKeepTime.value = Number(checkKeepTime) / 1000;
    vacuumCheckKeepValue.value = checkKeepValue;
    if (selfCheckOKNG) {
      vacuumSelfCheckOKNG.value = selfCheckOKNG;
    }
    absVelocity.value = vacuumBodyAbsVelocity;
    velocityAcctime.value = vacuumBodyVelocityAcctime;
    velocityDectime.value = vacuumBodyVelocityDectime;
    vaccumBodyHigthPV.value = BodyHigthPV.toFixed(2);
    vaccumBodyHigthSV.value = BodyHigthSV;
  }
}
async function changeValveSwitch() {
  const Param = {
    result: mainSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xVacuumMainSwitch'
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
  finalSettingProductLength.value = '';
  minValue.value = 100;
  maxValue.value = 320;
}
function onChange(e) {
  finalSettingProductLength.value = e;
}
function onChange1(e) {
  finalVacuumLength.value = e;
}
function onChangeAbsVelocity(e) {
  finalAbsVelocity.value = e;
}
function onChangeVelocityAcctime(e) {
  finalVelocityAcctime.value = e;
}
function onChangeVelocityDectime(e) {
  finalVelocityDectime.value = e;
}
function onChangeVaccumBodyHigthSV(e) {
  finalVaccumBodyHigthSV.value = e;
}
function clickResetButtom() {
  dialog.warning({
    title: '警告',
    content: '你确定真空归零吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('已重置');
      const Param = {
        result: true,
        dataType: 'boolean',
        name: 'Application.HMI_VacuumConfig.h_xVacuumResetButton'
      };
      const arr = [];
      arr.push(Param);
      saveJson(arr);
    },
    onNegativeClick: () => {
      message.error('已取消');
    }
  });
}
function chickResetAlarm() {
  dialog.warning({
    title: '警告',
    content: '你确定一般故障复位吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('已重置');
      const Param = {
        result: true,
        dataType: 'boolean',
        name: 'Application.HMI_VacuumConfig.h_xNormalALarmResetButton'
      };
      const arr = [];
      arr.push(Param);
      saveJson(arr);
    },
    onNegativeClick: () => {
      message.error('已取消');
    }
  });
}
async function changeInletGate() {
  const Param = {
    result: inletGateSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xCylinderSwitch[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeOutletGate() {
  const Param = {
    result: outletGateSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xCylinderSwitch[1]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeVacuumPumpManual() {
  const Param = {
    result: vacuumPumpManualSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xVacuumPumpManulSwitch'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeVacuumValve() {
  const Param = {
    result: vacuumValveSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xVacuumValueSwitch'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeReleaseSwitch() {
  const Param = {
    result: releaseButton.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xReleaseN2ValueButtonA'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeReleaseSwitchAir() {
  const Param = {
    result: releaseButtonAir.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xReleaseAirValueButtonA'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function onKeyPress() {
  if (Number(finalSettingProductLength.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalSettingProductLength.value) > Number(maxValue.value)) {
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
      result: finalSettingProductLength.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rProductLengthSetting'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function chickSetting() {
  coverShowModalEle.value = !coverShowModalEle.value;
}
function openSetting() {
  coverShowModalSetting.value = !coverShowModalSetting.value;
}
async function changeVacuumSwitch() {
  let value = false;
  if (eleVacuumSwitch.value) {
    value = true;
  } else {
    value = false;
  }
  const Param = {
    result: value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xVacuumPostion2'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeVacuumReset() {
  let value = false;
  if (eleVaccumReset.value) {
    value = true;
  } else {
    value = false;
  }
  const Param = {
    result: value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xstAxisHomeExecute[1]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
function editLength() {
  if (coverModalLength.value === true) {
    coverModalLength.value = false;
  } else {
    coverModalLength.value = true;
  }
  finalVacuumLength.value = '';
  minValue.value = -100;
  maxValue.value = -20;
}
function editVacuumSpeed() {
  if (coverModalVacuumSpeed.value === true) {
    coverModalVacuumSpeed.value = false;
  } else {
    coverModalVacuumSpeed.value = true;
  }
  finalAbsVelocity.value = '';
  minValue.value = 0;
  maxValue.value = 50;
}
function editVelocityAcctime() {
  if (coverModalVelocityAcctime.value === true) {
    coverModalVelocityAcctime.value = false;
  } else {
    coverModalVelocityAcctime.value = true;
  }
  finalAbsVelocity.value = '';
  minValue.value = 0;
  maxValue.value = 50;
}
function editVelocityDectime() {
  if (coverModalVelocityDectime.value === true) {
    coverModalVelocityDectime.value = false;
  } else {
    coverModalVelocityDectime.value = true;
  }
  finalVelocityDectime.value = '';
  minValue.value = 0;
  maxValue.value = 50;
}
function editVaccumBodyHigthSV() {
  if (coverModalVaccumBodyHigthSV.value === true) {
    coverModalVaccumBodyHigthSV.value = false;
  } else {
    coverModalVaccumBodyHigthSV.value = true;
  }
  finalVaccumBodyHigthSV.value = '';
  minValue.value = -100;
  maxValue.value = -10;
}
async function onKeyPressLength() {
  if (Number(finalVacuumLength.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumLength.value) > Number(maxValue.value)) {
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
      result: finalVacuumLength.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumPosition2'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPressAbsVelocity() {
  if (Number(finalAbsVelocity.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalAbsVelocity.value) > Number(maxValue.value)) {
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
      result: finalAbsVelocity.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumBodyAbsVelocity2'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPressVelocityAcctime() {
  if (Number(finalVelocityAcctime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVelocityAcctime.value) > Number(maxValue.value)) {
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
      result: finalVelocityAcctime.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityAcctime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}

async function onKeyPressVelocityDectime() {
  if (Number(finalVelocityDectime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVelocityDectime.value) > Number(maxValue.value)) {
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
      result: finalVelocityDectime.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumBodyVelocityDectime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPressVaccumBodyHigthSV() {
  if (Number(finalVaccumBodyHigthSV.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVaccumBodyHigthSV.value) > Number(maxValue.value)) {
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
      result: finalVaccumBodyHigthSV.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVaccumBodyHigthSV'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function changeInStatus() {
  imitateShowIn.value = !imitateShowIn.value;
  InSensorvacuum.value = imitateShowIn.value;
}
function changeOutStatus() {
  imitateShowOut.value = !imitateShowOut.value;
  OutSensorvacuum.value = imitateShowOut.value;
}
function changeSetValue() {
  if (visibleSetValue.value === true) {
    visibleSetValue.value = false;
  } else {
    visibleSetValue.value = true;
  }
  minValue.value = 0;
  maxValue.value = 999;
  finalVacuumCheckSetValue.value = '';
}
function changeSetTime() {
  if (visibleSetTime.value === true) {
    visibleSetTime.value = false;
  } else {
    visibleSetTime.value = true;
  }
  minValue.value = 0;
  maxValue.value = 999;
  finalVacuumCheckSetTime.value = '';
}
function changeKeepTime() {
  if (visibleKeepTime.value === true) {
    visibleKeepTime.value = false;
  } else {
    visibleKeepTime.value = true;
  }
  minValue.value = 0;
  maxValue.value = 999;
  finalVacuumCheckKeepTime.value = '';
}
function changeKeepValue() {
  if (visibleKeepValue.value === true) {
    visibleKeepValue.value = false;
  } else {
    visibleKeepValue.value = true;
  }
  minValue.value = 0;
  maxValue.value = 999;
  finalVacuumCheckKeepValue.value = '';
}
function onChangeSetvalue(e) {
  finalVacuumCheckSetValue.value = e;
}
function onChangeSetTime(e) {
  finalVacuumCheckSetTime.value = e;
}
function onChangeKeepTime(e) {
  finalVacuumCheckKeepTime.value = e;
}
function onChangeKeepValue(e) {
  finalVacuumCheckKeepValue.value = e;
}
async function onKeyPressSetValue() {
  if (Number(finalVacuumCheckSetValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumCheckSetValue.value) > Number(maxValue.value)) {
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
      result: finalVacuumCheckSetValue.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumCheckSetValue'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressSetTime() {
  if (Number(finalVacuumCheckSetTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumCheckSetTime.value) > Number(maxValue.value)) {
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
      result: Number(finalVacuumCheckSetTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_tVacuumCheckSetTime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressKeepTime() {
  if (Number(finalVacuumCheckKeepTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumCheckKeepTime.value) > Number(maxValue.value)) {
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
      result: Number(finalVacuumCheckKeepTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_tVacuumCheckKeepTime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressKeepValue() {
  if (Number(finalVacuumCheckKeepValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumCheckKeepValue.value) > Number(maxValue.value)) {
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
      result: finalVacuumCheckKeepValue.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumCheckKeepValue'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
</script>

<style scoped>
.button-style {
  width: 105px;
}
.tiny-button {
  width: 60px;
}
.input-group-head {
  width: 260px;
}
</style>
