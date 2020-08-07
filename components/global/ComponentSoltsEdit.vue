<template>
  <div>
    <template v-for="(item, index) in soltData">
      <div :key="index" class="flex border-b mb-2">
        <div class="flex-1">
          <div class="mb-2">
            <label class="block text-sm font-bold mb-1">Slot</label>
            <el-input
              v-model="item.slot"
              size="small"
              class="value-area"
              placeholder="slot"
            />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-bold mb-1">子元素</label>
            <ComponentChildrenEdit :value.sync="item.iChildren" />
          </div>
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
</template>

<script>
import { cloneDeep } from 'lodash'

const defaultData = {
  slot: '',
  iChildren: [],
}

export default {
  name: 'ComponentSoltsEdit',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      iTypeKeys: [],
      soltData: [],
    }
  },

  watch: {
    value: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.soltData)) {
          this.soltData = newValue
        }
      },
      immediate: true,
      deep: true,
    },
    soltData: {
      handler(newValue = {}) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          this.$emit('update:value', newValue)
        }
      },
      deep: true,
    },
  },
  methods: {
    removeItem(index) {
      this.soltData.splice(index, 1)
    },
    addItem() {
      this.soltData.push(cloneDeep(defaultData))
    },
  },
}
</script>
