<template>
  <component :is="iType" v-bind="cleanProps(iProps)">
    <template v-if="iSolts">
      <template v-for="soltsItem in (iSolts)">
        <template :slot="soltsItem.slot">
          <template v-if="isArray(soltsItem.iChildren)">
            <template v-for="(sItem, sIndex) in initArray(soltsItem.iChildren)">
              <Comp :key="`${sItem.iType}${sIndex}`" v-bind="sItem" />
            </template>
          </template>
          <template v-else>{{ soltsItem.iChildren }}</template>
        </template>
      </template>
    </template>

    <template v-if="iChildrenIsArray">
      <template v-for="(item, index) in initArray(iChildren)">
        <Comp :key="`${item.iType}${index}`" v-bind="item" />
      </template>
    </template>
    <template v-else>{{ iChildren }}</template>
  </component>
</template>

<script>
import { isArray, isString } from 'lodash'
export default {
  name: 'Comp',
  props: {
    // 组件的名字
    iType: {
      type: String,
      default: '',
    },
    // 包含的组件
    iChildren: [String, Array],
    iSolts: [Array],
    // 组件内的参数定义
    iProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    iChildrenIsArray() {
      const { iChildren = [] } = this
      // console.log('iChildren', iChildren, isArray(iChildren))
      return isArray(iChildren)
    },
  },
  methods: {
    isString,
    cleanProps(props) {
      const delKeys = ['iType', 'iChildren']
      const componentProps = { ...props }
      delKeys.forEach(key => {
        delete componentProps[key]
      })
      return componentProps
    },
    isArray(obj = []) {
      return isArray(obj)
    },
    initArray(arr = []) {
      // console.log('arr', arr)
      return (arr || []).filter(i => i)
    },
  },
}
</script>
