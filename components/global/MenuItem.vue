<template>
  <el-menu-item :index="subItem.index">
    <a v-if="href" :href="href" :target="target">{{ label }}</a>
    <span v-else>{{ label }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    index: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },

    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
  },
}
</script>
