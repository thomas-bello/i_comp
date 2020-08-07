<template>
  <el-menu v-bind="menuProps">
    <template v-for="item in data">
      <el-submenu v-if="item.subMenu" :key="item.index" index="2">
        <template slot="title">{{ item.label }}</template>
        <template v-for="subItem in item.subMenu">
          <MenuItem :key="subItem.index" v-bind="subItem" />
        </template>
      </el-submenu>
      <MenuItem v-else :key="item.index" v-bind="subItem" />
    </template>
  </el-menu>
</template>

<script>
const defaultMenu = {
  mode: 'horizontal',
}

export default {
  name: 'NavBar',
  props: {
    props: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    menuProps() {
      return {
        ...defaultMenu,
        ...this.props,
      }
    },
  },
}
</script>
