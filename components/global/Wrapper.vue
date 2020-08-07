<template>
  <div v-if="isWrapper" v-bind="wrapperProps">
    <template v-for="(item, index) in (props || [])">
      <template v-if="isString(item)"
        ><div :key="index">{{ item }}</div></template
      >
      <component
        :is="item.type || 'Wrapper'"
        v-else
        :key="item.key || index"
        v-bind="item"
      >
        {{ item.slotValue || '' }}
      </component>
    </template>
  </div>
  <div v-else v-bind="wrapperProps">{{ value }}</div>
</template>

<script>
import { isArray, isString } from 'lodash'

export default {
  name: 'Wrapper',
  props: {
    props: [Array, Object, String],
    wrapperProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    isWrapper() {
      return isArray(this.props)
    },
    value() {
      if (isString(this.props)) {
        return this.props
      }
      return this.props.value || ''
    },
  },
  methods: {
    isString,
  },
}
</script>
