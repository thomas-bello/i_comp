<template>
  <div>
    <Comp v-bind="data" />

    <hr />
    <ViewEdit />
  </div>
</template>

<script>
export default {
  name: 'PageSlug',

  asyncData() {
    return {
      data: {
        iType: 'el-menu',
        iProps: {
          mode: 'horizontal',
          'background-color': '#545c64',
          'text-color': '#fff',
          'active-text-color': '#ffd04b',
        },
        iChildren: [
          {
            iType: 'el-menu-item',
            iProps: {
              index: '1',
            },
            iChildren: '消息中心',
          },
          {
            iType: 'el-menu-item',
            iProps: {
              index: '2',
              disabled: true,
            },
            iChildren: [
              {
                iType: 'a',
                iProps: {
                  href: 'https://www.ele.me',
                  target: '_blank',
                },
                iChildren: '订单管理',
              },
            ],
          },
          {
            iType: 'el-submenu',
            iProps: {
              index: '3',
            },
            iSolts: [
              {
                slot: 'title',
                iChildren: '我的工作台',
              },
            ],
            iChildren: [
              {
                iType: 'el-menu-item',
                iProps: {
                  index: '2-1',
                },
                iChildren: '选项1',
              },
              {
                iType: 'el-menu-item',
                iProps: {
                  index: '2-2',
                },
                iChildren: '选项2',
              },
            ],
          },
        ],
      },
    }
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    head() {
      return this.data.head || {}
    },
  },
  head() {
    return {
      ...this.head,
      // title: this.doc.title,
      // meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: this.doc.description,
      //   },
      //   // Open Graph
      //   { hid: 'og:title', property: 'og:title', content: this.doc.title },
      //   {
      //     hid: 'og:description',
      //     property: 'og:description',
      //     content: this.doc.description,
      //   },
      //   // Twitter Card
      //   {
      //     hid: 'twitter:title',
      //     name: 'twitter:title',
      //     content: this.doc.title,
      //   },
      //   {
      //     hid: 'twitter:description',
      //     name: 'twitter:description',
      //     content: this.doc.description,
      //   },
      // ],
    }
  },
}
</script>
