<template>
  <div>
    <div class="mb-2">
      <label class="block text-sm font-bold mb-1">组件类型</label>
      <el-autocomplete
        v-model="componentData.iType"
        class="inline-input"
        size="small"
        :fetch-suggestions="querySearch"
        placeholder="请选择标签类型"
      ></el-autocomplete>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-bold mb-1">属性</label>
      <KeyValueEdit :value.sync="componentData.iProps" />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-bold mb-1">子元素</label>
      <ComponentChildrenEdit :value.sync="componentData.iChildren" />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-bold mb-1">Solts</label>
      <ComponentSoltsEdit :value.sync="componentData.iSolts" />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { iTypes } from '@/utils/constant'

const defaultData = {
  iProps: {},
  iChildren: [],
  iSolts: [],
}

const isChange = (a, b) => {
  return JSON.stringify(a) !== JSON.stringify(b)
}

export default {
  name: 'ComponentEdit',
  props: {
    value: {
      type: Object,
      default: () => cloneDeep(defaultData),
    },
  },
  data() {
    return {
      iTypeKeys: [],
      componentData: {},
    }
  },

  watch: {
    value: {
      handler(newValue, oldValue) {
        if (isChange(newValue, this.componentData) || (!oldValue && newValue)) {
          this.componentData = newValue
        }
      },
      immediate: true,
      deep: true,
    },
    componentData: {
      handler(newValue = {}, oldValue) {
        if (isChange(newValue, this.value)) {
          this.$emit('update:value', newValue)
        }
      },
      deep: true,
    },
  },

  created() {
    this.iTypeKeys = Object.keys(iTypes)
  },
  methods: {
    createFilter(queryString) {
      return iTypeKey => {
        return iTypeKey.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    querySearch(queryString, cb) {
      const { iTypeKeys = [] } = this
      const results = queryString
        ? iTypeKeys.filter(this.createFilter(queryString))
        : iTypeKeys
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
  },
}
</script>
