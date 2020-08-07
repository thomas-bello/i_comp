<template>
  <div>
    <div
      v-for="(item, index) in valueArr"
      :key="index"
      class="full-width flex items-center mb-2"
    >
      <div class="w-40">
        <el-input v-model="item.key" size="small" placeholder="key">
          <el-select
            slot="append"
            v-model="item.type"
            size="small"
            class="w-20"
            @change="val => change(val, item)"
          >
            <el-option label="字符" value="string"></el-option>
            <el-option label="对象" value="objet"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="w-5 text-center">:</div>
      <div class="flex-1 ml-2r">
        <div v-if="item.type === 'objet'" class="border p-2 rounded">
          <KeyValueEdit :value.sync="item.value" />
        </div>
        <el-input
          v-else
          v-model="item.value"
          size="small"
          class="value-area"
          placeholder="value"
        />
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
    <div class="cursor-pointer text-blue-500 text-sm" @click="addItem">
      + 新增
    </div>
  </div>
</template>

<script>
import { isObject } from 'lodash'

const isTure = str => str === 'true'
const isFalse = str => str === 'false'
const isNum = str => /^\d{1,}$/.test(str)
const isFloat = str =>
  /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(
    str
  )
const transformValue = val => {
  if (isTure(val) || isFalse(val)) {
    return isTure(val)
  } else if (isNum(val) || isFloat(val)) {
    return Number(val)
  }

  return val
}

export default {
  name: 'KeyValueEdit',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valueArr: [],
    }
  },
  watch: {
    value: {
      handler(newValue) {
        const keys = Object.keys(newValue)
        this.valueArr = keys.map(key => {
          const value = newValue[key]
          return {
            key,
            value,
            type: isObject(value) ? 'objet' : 'string',
          }
        })
      },
      immediate: true,
    },
    valueArr: {
      handler(newValue = []) {
        const newObj = {}
        newValue.forEach(({ key, value }) => {
          if (key && value !== undefined) {
            newObj[key] = transformValue(value)
          }
        })
        if (JSON.stringify(newObj) !== JSON.stringify(this.value)) {
          this.$emit('update:value', newObj)
        }
      },
      deep: true,
    },
  },
  methods: {
    removeItem(index) {
      this.valueArr.splice(index, 1)
    },
    addItem() {
      this.valueArr.push({ key: '', value: '', type: 'string' })
    },
    change(val, item) {
      if (val === 'objet') {
        item.value = {}
      } else {
        item.value = ''
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
