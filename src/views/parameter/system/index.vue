<template>
  <div>
    <div>
      <n-grid :x-gap="12" :y-gap="8" :cols="2">
        <n-grid-item>
          <n-card title="" :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full">
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">Mindiff</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">200</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">报警延迟</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">200</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">整机长度</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">
                        {{ machineLength }}
                      </n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">传感器距离(输入传感器-停止传感器)</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">0</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">距离传感器通量-输出B</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">420</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
            </div>
          </n-card>
          <n-card title="冷却区" :bordered="false" class="rounded-16px shadow-sm">
            <div class="w-full">
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">Mindiff</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">200</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">报警延迟</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">200</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">距离(流量传感器-机器端)</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">2715</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">开始机器到传感器输入</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">15</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">长度输入交付产品(开始机器)到Zonel</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">930</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">长度从最后一个区域到结束(机器结束）</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">735</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
              <div style="padding-left: 20px; padding-top: 5px; padding-bottom: 3px">
                <div>
                  <n-grid :x-gap="12" :y-gap="8" :cols="2">
                    <n-grid-item>
                      <span class="py-1px text-16px">传感器输出到机器结束</span>
                    </n-grid-item>
                    <n-grid-item>
                      <n-button type="primary" style="margin-left: 5px" class="button-style">15</n-button>
                      <span class="py-1px text-16px">mm</span>
                    </n-grid-item>
                  </n-grid>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="" :bordered="false" class="rounded-16px shadow-sm"></n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const machineLength = ref(6050);
</script>

<style scoped>
.button-style {
  width: 80px;
}
</style>
