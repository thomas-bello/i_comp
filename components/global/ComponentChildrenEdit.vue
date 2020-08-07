<template>
  <div class="flex">
    <div class="mr-2">
      <el-select
        v-model="iChildrenType"
        class="w-20"
        size="small"
        @change="change"
      >
        <el-option label="字符" value="string"></el-option>
        <el-option label="组件" value="component"></el-option>
      </el-select>
    </div>
    <div class="flex-1">
      <div v-if="iChildrenType === 'component'" class="border p-2 rounded">
        <template v-for="(item, index) in childrenData">
          <div :key="index" class="flex border-b mb-2">
            <div class="flex-1">
              <component :is="'ComponentEdit'" :value.sync="item" />
            </div>
            <el-popconfirm title="确定删除吗？" @onConfirm="removeItem(index)">
              <div
                slot="reference"
                class="cursor-pointer text-gray-500 text-center w-16 text-sm"
              >
                删除
              </div>
            </el-popconfirm>
          </div>
        </template>
        <div class="cursor-pointer text-blue-500 text-sm" @click="addItem">
          + 新增
        </div>
      </div>
      <el-input
        v-else
        v-model="childrenData"
        size="small"
        class="value-area"
        placeholder="value"
      />
    </div>
  </div>
</template>

<script>
import { isArray, cloneDeep } from 'lodash'

const defaultData = {
  iProps: {},
  iChildren: [],
  iSolts: [],
}

const isChange = (a, b) => {
  return JSON.stringify(a) !== JSON.stringify(b)
}

export default {
  name: 'ComponentChildrenEdit',
  props: {
    value: [Array, String],
  },
  data() {
    return {
      iChildrenType: 'component',
      childrenData: [],
    }
  },
  watch: {
    value: {
      handler(newValue = []) {
        if (isChange(newValue, this.childrenData)) {
          this.childrenData = newValue
        }
      },
      immediate: true,
      deep: true,
    },
    childrenData: {
      handler(newValue = []) {
        console.log(
          'childrenData, newValue',
          newValue,
          JSON.stringify(newValue) !== JSON.stringify(this.value)
        )
        if (isChange(newValue, this.value)) {
          this.$emit('update:value', newValue)
        }
      },
      deep: true,
    },
  },
  methods: {
    removeItem(index) {
      if (isArray(this.childrenData)) {
        this.childrenData.splice(index, 1)
      } else {
        console.warn('childrenData not isArray', this.childrenData)
      }
    },
    addItem() {
      if (isArray(this.childrenData)) {
        this.childrenData.push(cloneDeep(defaultData))
      } else {
        console.warn('childrenData not isArray', this.childrenData)
      }
    },
    getKey(item, i) {
      return `${JSON.stringify(item)}-${i}`
    },
    change(value) {
      if (value === 'component') {
        this.childrenData = [cloneDeep(defaultData)]
      } else {
        this.childrenData = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.value-area {
  min-width: 8rem;
}
</style>
