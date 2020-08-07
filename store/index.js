import Vue from 'vue'
export const state = () => ({
  sysI18n: {},
})

export const mutations = {
  setSysI18n(state, { key, value }) {
    // Vue Reactivity rules since we add a nested object
    Vue.set(state.sysI18n, key, value)
  },
}

export const actions = {
  async fetchI18n({ commit, state }) {
    // Avoid re-fetching in production
    const { locale } = this.$i18n
    console.log('fetchI18n locale', locale)
    if (process.dev === false && state.sysI18n[locale]) {
      return
    }
    const res = await this.$axios.$get(`i18n/${locale}`)
    console.log('fetchI18n res', res)
    commit('setSysI18n', { key: locale, value: res })
  },
}
