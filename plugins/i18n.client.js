export default function ({ app, store }) {
  app.i18n.onLanguageSwitched = () => store.dispatch('fetchI18n')
}
