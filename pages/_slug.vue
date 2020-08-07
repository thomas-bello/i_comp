<template>
  <component :is="data.type" v-bind="data" />
</template>

<script>
import { cloneDeep } from 'lodash'
import CarouselPage from '@/components/pageModal/CarouselPage'
import Wrapper from '@/components/global/Wrapper'

const defaultData = {
  type: 'Wrapper',
  props: {
    value: 'hi',
  },
  head: {},
}

export default {
  name: 'PageSlug',
  components: {
    CarouselPage,
    Wrapper,
  },
  middleware({ params, redirect }) {
    if (params.slug === 'index') {
      redirect('/')
    }
  },
  async asyncData({ $axios, store, app, params, error }) {
    const slug = params.slug || 'index'

    let data = cloneDeep(defaultData)
    try {
      data = await $axios.$get(`page/${slug}`)
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return {
      data,
    }
  },
  data() {
    return {
      data: cloneDeep(defaultData),
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
